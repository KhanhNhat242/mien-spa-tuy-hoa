'use client'

import { useState, type ComponentType, type SVGProps } from 'react'
import { PROCESS_STEPS } from '@/lib/site-data'
import { nw } from '@/lib/format'
import { CalendarIcon, ChatIcon, LotusIcon, PhoneIcon, TeaIcon } from '@/components/ui/Icons'

const ICONS: Record<(typeof PROCESS_STEPS)[number]['icon'], ComponentType<SVGProps<SVGSVGElement>>> = {
  calendar: CalendarIcon,
  phone: PhoneIcon,
  chat: ChatIcon,
  lotus: LotusIcon,
  tea: TeaIcon,
}

/* ------------------------------------------------------------------ */
/* Hình học đường đi (hệ toạ độ viewBox 1200 × 480)                    */
/* ------------------------------------------------------------------ */
type Pt = [number, number]
const W = 1200
const H = 480

const START: Pt = [30, 470]
/** Toạ độ tâm 5 vòng tròn — so le cao thấp như mẫu */
const NODES: Pt[] = [
  [100, 390],
  [300, 240],
  [520, 110],
  [700, 360],
  [950, 250],
]
const END: Pt = [1170, 60]
/** Khối chữ (góc trên-trái) — đặt ở vùng đường cong không đi qua */
const TEXT: Pt[] = [
  [164, 356],
  [364, 214],
  [584, 84],
  [764, 330],
  [1004, 226],
]
const TEXT_W = 190

/** Điểm điều khiển Bézier từng đoạn (START→N1, N1→N2, …, N5→END), chọn để tránh khối chữ */
const SEGMENTS: [Pt, Pt, Pt][] = [
  [[60, 470], [100, 440], NODES[0]],
  [[100, 280], [200, 240], NODES[1]],
  [[300, 120], [400, 110], NODES[2]],
  [[520, 260], [700, 210], NODES[3]],
  [[700, 250], [850, 250], NODES[4]],
  [[950, 130], [1060, 60], END],
]

const PATH_D = `M${START.join(' ')} ` + SEGMENTS.map(([c1, c2, p]) => `C${c1.join(' ')} ${c2.join(' ')} ${p.join(' ')}`).join(' ')

/** Độ dài cung của 1 đoạn Bézier (lấy mẫu) */
function cubicLength(p0: Pt, c1: Pt, c2: Pt, p3: Pt, steps = 60) {
  let len = 0
  let prev = p0
  for (let i = 1; i <= steps; i++) {
    const t = i / steps
    const u = 1 - t
    const pt: Pt = [
      u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p3[1],
    ]
    len += Math.hypot(pt[0] - prev[0], pt[1] - prev[1])
    prev = pt
  }
  return len
}

/** Tỉ lệ quãng đường (0–1) từ đầu đường tới tâm từng nút → độ dài đoạn "tiến trình" khi hover */
const NODE_PROGRESS: number[] = (() => {
  const lens: number[] = []
  let from = START
  for (const [c1, c2, p] of SEGMENTS) {
    lens.push(cubicLength(from, c1, c2, p))
    from = p
  }
  const total = lens.reduce((a, b) => a + b, 0)
  let acc = 0
  return NODES.map((_, i) => {
    acc += lens[i]
    return acc / total
  })
})()

const pct = (v: number, of: number) => `${(v / of) * 100}%`

/* ------------------------------------------------------------------ */

/** Vòng tròn icon: mặc định không viền màu; active → vòng hở màu brand xoay vào */
function StepNode({ index, active, size }: { index: number; active: boolean; size: 'lg' | 'sm' }) {
  const Icon = ICONS[PROCESS_STEPS[index].icon]
  const dim = size === 'lg' ? 'size-[88px]' : 'size-[72px]'
  return (
    <span className={`relative flex ${dim} shrink-0 items-center justify-center rounded-full bg-cream shadow-card`}>
      <span
        aria-hidden
        className={`absolute -inset-2 rounded-full border-[5px] transition-[border-color,rotate] duration-500 ease-out motion-reduce:transition-none ${
          active ? 'rotate-[225deg] border-brand border-b-transparent' : 'rotate-45 border-transparent'
        }`}
      />
      <Icon
        width={size === 'lg' ? 32 : 28}
        height={size === 'lg' ? 32 : 28}
        className={`transition-colors duration-300 ${active ? 'text-brand' : 'text-ink-soft'}`}
      />
    </span>
  )
}

function StepText({ index, active }: { index: number; active: boolean }) {
  const s = PROCESS_STEPS[index]
  return (
    <>
      <p className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">
        Bước <span className={`transition-colors duration-300 ${active ? 'text-sage' : 'text-brand-soft'}`}>0{index + 1}</span>
      </p>
      <span
        aria-hidden
        className={`mt-1.5 block h-0.5 origin-left bg-sage transition-[width] duration-500 ease-out ${active ? 'w-16' : 'w-8'}`}
      />
      <h3 className="mt-3 font-serif text-xl leading-snug text-brand">{nw(s.title, 1)}</h3>
      <p className="mt-1.5 text-base leading-relaxed text-ink-soft">{nw(s.desc)}</p>
    </>
  )
}

/**
 * Quy trình 5 bước theo mẫu "infographic": đường chấm uốn lượn nối 5 vòng tròn so le.
 * Hover (hoặc chạm trên màn cảm ứng) vào 1 bước → đường liền chạy dọc đường chấm tới đúng bước đó
 * + vòng ngoài icon của bước đó đổi màu. Mặc định không viền màu, không tiến trình.
 * ≥ xl: bố cục đường cong; < xl: dòng thời gian dọc với hiệu ứng tương tự.
 */
export function ProcessPath() {
  const [active, setActive] = useState<number | null>(null)
  const progress = active === null ? 0 : NODE_PROGRESS[active]
  const on = (i: number) => ({
    onMouseEnter: () => setActive(i),
    onClick: () => setActive(i),
  })

  return (
    <div onMouseLeave={() => setActive(null)}>
      {/* Desktop: đường cong */}
      <ol className="relative mx-auto hidden w-full max-w-[1200px] xl:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible" fill="none">
          {/* Đường chấm nền */}
          <path d={PATH_D} stroke="var(--color-brand)" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.5 11" />
          {/* Đường tiến trình: chạy tới bước đang hover */}
          <path
            d={PATH_D}
            pathLength={1}
            stroke="var(--color-brand)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="1 1"
            strokeDashoffset={1 - progress}
            className="transition-[stroke-dashoffset] duration-[900ms] ease-out motion-reduce:transition-none"
            style={{ opacity: progress > 0 ? 1 : 0 }}
          />
          {/* Mũi tên cuối đường */}
          <path d="M1150 52 1170 60 1160 79" stroke="var(--color-brand)" strokeOpacity="0.6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {PROCESS_STEPS.map((s, i) => (
          <li key={s.title} className="contents">
            <span
              {...on(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-default"
              style={{ left: pct(NODES[i][0], W), top: pct(NODES[i][1], H) }}
            >
              <StepNode index={i} active={active === i} size="lg" />
            </span>
            <div
              {...on(i)}
              className="absolute cursor-default"
              style={{ left: pct(TEXT[i][0], W), top: pct(TEXT[i][1], H), width: pct(TEXT_W, W) }}
            >
              <StepText index={i} active={active === i} />
            </div>
          </li>
        ))}
      </ol>

      {/* Mobile / tablet: dòng thời gian dọc */}
      <ol className="xl:hidden">
        {PROCESS_STEPS.map((s, i) => (
          <li key={s.title} {...on(i)} className="relative grid grid-cols-[72px_1fr] gap-x-6 pb-10 last:pb-0">
            {i < PROCESS_STEPS.length - 1 && (
              <>
                <span aria-hidden className="absolute top-[88px] bottom-4 left-[35px] border-l-[3px] border-dotted border-brand/40" />
                {/* Đoạn nối "chạy" khi bước sau nó đang active */}
                <span
                  aria-hidden
                  style={{ transitionDelay: active !== null && i < active ? `${i * 150}ms` : '0ms' }}
                  className={`absolute top-[88px] bottom-4 left-[35px] w-[3px] origin-top rounded-full bg-brand transition-transform duration-500 ease-out motion-reduce:transition-none ${
                    active !== null && i < active ? 'scale-y-100' : 'scale-y-0'
                  }`}
                />
              </>
            )}
            <StepNode index={i} active={active === i} size="sm" />
            <div className="pt-1">
              <StepText index={i} active={active === i} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
