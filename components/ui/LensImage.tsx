'use client'

/**
 * LensImage — hiệu ứng "thấu kính khúc xạ" (shader lens) chạy theo con trỏ trên một ảnh.
 * Chuyển từ ví dụ motion + three.js khách gửi (13/11/2026) sang **WebGL thuần, không thêm thư viện**:
 * giữ nguyên shader (khúc xạ IOR 1.14, méo cạnh, tách màu 0.65, fresnel + điểm sáng) và lò xo (stiffness 120, damping 20).
 *
 * - Ảnh `next/image` vẫn render (SSR, không JS, không WebGL, màn cảm ứng, giảm chuyển động); canvas phủ đúng khung ảnh,
 *   vẽ lại ảnh theo cùng cách đặt (object-contain + neo đáy + phóng `scale` từ đáy) rồi ẩn ảnh gốc khi canvas sẵn sàng.
 * - Ảnh có kênh alpha (đã tách nền): vùng trong suốt vẫn trong suốt → tấm nền phía sau lộ ra như cũ.
 * - Thấu kính chỉ hiện (mờ dần vào) khi con trỏ ở trên ảnh, rời đi thì mờ dần ra → lúc đứng yên ảnh thật không bị méo.
 * - Chỉ bật trên thiết bị có chuột `(hover: hover) and (pointer: fine)` để không chặn cuộn cảm ứng; chỉ vẽ lại khi lò xo còn chạy.
 */
import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'

const VERT = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D photo;
uniform vec2 lens;
uniform float aspect;      // rộng / cao của canvas
uniform float imageAspect; // rộng / cao của ảnh
uniform float imageScale;  // phóng từ đáy (khớp class scale-[x] origin-bottom)
uniform float lensRadius;  // bán kính thấu kính theo chiều cao canvas
uniform float strength;    // 0 = ẩn thấu kính (đứng yên), 1 = hiện đủ (đang rê chuột)

// Ảnh object-contain, neo đáy, phóng imageScale quanh tâm-đáy; trả về màu premultiplied (alpha = 0 ngoài ảnh)
vec4 sampleScene(vec2 canvasUv) {
  vec2 size = imageAspect > aspect ? vec2(1.0, aspect / imageAspect) : vec2(imageAspect / aspect, 1.0);
  size *= imageScale;
  vec2 minUv = vec2(0.5 - size.x * 0.5, 0.0);
  vec2 uv = (canvasUv - minUv) / size;
  float onPhoto = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
  return texture2D(photo, clamp(uv, vec2(0.0), vec2(1.0))) * onPhoto;
}

vec2 refractedUv(vec2 canvasUv, vec2 local, float ior) {
  float r2 = dot(local, local);
  float angle = atan(local.y, local.x);
  float distortion = sin(angle * 6.0 + r2 * 8.0) * 0.65;
  vec2 distorted = local * (1.0 + distortion * r2 * 0.16);
  vec3 normal = normalize(vec3(distorted, sqrt(max(0.0, 1.0 - r2))));
  vec3 ray = refract(vec3(0.0, 0.0, -1.0), normal, 1.0 / ior);
  float edgeMagnification = mix(0.75, 2.4, smoothstep(0.2, 1.0, r2));
  return canvasUv + ray.xy * 0.075 * edgeMagnification / vec2(aspect, 1.0);
}

void main() {
  vec2 local = (vUv - lens) * vec2(aspect, 1.0) / lensRadius;
  float r2 = dot(local, local);
  float radius = sqrt(r2);
  float mask = (1.0 - smoothstep(0.985, 1.0, radius)) * strength;
  vec4 base = sampleScene(vUv);

  float spread = 0.65 * 0.08;
  vec4 red = sampleScene(refractedUv(vUv, local, 1.14 - spread));
  vec4 green = sampleScene(refractedUv(vUv, local, 1.14));
  vec4 blue = sampleScene(refractedUv(vUv, local, 1.14 + spread));
  vec4 glass = vec4(red.r, green.g, blue.b, green.a);

  float normalZ = sqrt(max(0.0, 1.0 - r2));
  float fresnel = pow(1.0 - normalZ, 3.0);
  float highlight = pow(max(dot(normalize(vec3(local, normalZ)), normalize(vec3(-0.45, -0.65, 1.0))), 0.0), 24.0);
  // viền kính mảnh để thấy thấu kính cả khi đi qua vùng trong suốt (tấm nền phía sau)
  float rim = smoothstep(0.86, 0.985, radius) * 0.12;
  float light = fresnel * 0.1 + highlight * 0.12 + rim;
  glass.rgb += vec3(light);
  glass.a = min(1.0, glass.a + light);

  gl_FragColor = mix(base, glass, mask);
}`

type Props = {
  src: StaticImageData
  alt: string
  sizes: string
  /** Hệ số phóng từ đáy, phải khớp với cách đặt ảnh tĩnh (scale-[x] origin-bottom) */
  scale?: number
  /** Bán kính thấu kính theo tỉ lệ chiều cao khung (mẫu: 0.14) */
  lensRadius?: number
  imgClassName?: string
}

export function LensImage({ src, alt, sizes, scale = 1, lensRadius = 0.14, imgClassName = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    // Lưu ý: canvas chỉ có MỘT context WebGL suốt đời phần tử → không gọi loseContext() khi dọn dẹp
    // (React StrictMode ở dev chạy effect 2 lần; context đã mất sẽ làm shader biên dịch thất bại với log rỗng).
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: true })
    if (!gl || gl.isContextLost()) return

    const shaders: WebGLShader[] = []
    const compile = (type: number, code: string, label: string) => {
      const sh = gl.createShader(type)!
      shaders.push(sh)
      gl.shaderSource(sh, code)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(`LensImage: lỗi biên dịch ${label} shader — ${gl.getShaderInfoLog(sh) || 'không có log'}`)
      return sh
    }
    const program = gl.createProgram()!
    try {
      gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT, 'vertex'))
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG, 'fragment'))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(`LensImage: lỗi link — ${gl.getProgramInfoLog(program) || 'không có log'}`)
    } catch (e) {
      // Không chặn trang: giữ ảnh tĩnh làm bản dự phòng
      if (!gl.isContextLost()) console.warn(e)
      shaders.forEach((sh) => gl.deleteShader(sh))
      gl.deleteProgram(program)
      return
    }
    gl.useProgram(program)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const u = (n: string) => gl.getUniformLocation(program, n)
    const uLens = u('lens'), uAspect = u('aspect'), uImgAspect = u('imageAspect'), uScale = u('imageScale'), uRadius = u('lensRadius'), uStrength = u('strength')
    gl.uniform1f(uScale, scale)
    gl.uniform1f(uRadius, lensRadius)
    gl.clearColor(0, 0, 0, 0)

    // Lò xo 2 trục (stiffness 120, damping 20, mass 1) — như { type: "spring", stiffness: 120, damping: 20 }
    const REST = { x: 0.5, y: 0.5 }
    const pos = { ...REST }, vel = { x: 0, y: 0 }, target = { ...REST }
    // Thấu kính chỉ hiện khi rê chuột vào ảnh (ảnh thật không bị méo lúc đứng yên); hiện/ẩn dần ~250ms
    let strength = 0, strengthTarget = 0
    let raf = 0, last = 0, texReady = false, alive = true
    let tex: WebGLTexture | null = null

    const draw = () => {
      gl.uniform2f(uLens, pos.x, pos.y)
      gl.uniform1f(uStrength, strength)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    const tick = (now: number) => {
      raf = 0
      const dt = Math.min(0.032, last ? (now - last) / 1000 : 0.016)
      last = now
      for (const k of ['x', 'y'] as const) {
        const a = 120 * (target[k] - pos[k]) - 20 * vel[k]
        vel[k] += a * dt
        pos[k] += vel[k] * dt
      }
      strength += (strengthTarget - strength) * (1 - Math.exp(-dt / 0.08))
      if (Math.abs(strengthTarget - strength) < 0.003) strength = strengthTarget
      draw()
      const moving =
        Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) + Math.abs(vel.x) + Math.abs(vel.y) > 1e-4 || strength !== strengthTarget
      if (moving) raf = requestAnimationFrame(tick)
      else last = 0
    }
    const kick = () => {
      if (!raf && texReady) raf = requestAnimationFrame(tick)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, canvas.clientWidth), h = Math.max(1, canvas.clientHeight)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(uAspect, w / h)
      if (texReady) draw()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      target.x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
      target.y = Math.min(1, Math.max(0, 1 - (e.clientY - r.top) / r.height))
      // vào ảnh lần đầu: đặt thấu kính ngay tại con trỏ rồi mới hiện dần (không trượt từ giữa ra)
      if (strengthTarget === 0 && strength === 0) {
        pos.x = target.x
        pos.y = target.y
        vel.x = vel.y = 0
      }
      strengthTarget = 1
      kick()
    }
    const onLeave = () => {
      strengthTarget = 0
      kick()
    }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    const img = new window.Image()
    img.decoding = 'async'
    img.src = src.src
    img
      .decode()
      .then(() => {
        if (!alive) return
        tex = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.uniform1f(uImgAspect, img.naturalWidth / img.naturalHeight)
        texReady = true
        resize()
        setReady(true)
      })
      .catch((e) => console.warn('LensImage: không tải được ảnh', e))

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      // Giải phóng tài nguyên nhưng giữ context (xem lưu ý ở trên)
      if (tex) gl.deleteTexture(tex)
      gl.deleteBuffer(buf)
      shaders.forEach((sh) => gl.deleteShader(sh))
      gl.deleteProgram(program)
    }
  }, [src.src, scale, lensRadius])

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        loading="eager"
        fetchPriority="high"
        sizes={sizes}
        className={`${imgClassName} transition-opacity duration-300 ${ready ? 'opacity-0' : 'opacity-100'}`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`absolute inset-0 size-full cursor-none transition-opacity duration-300 ${ready ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
    </>
  )
}
