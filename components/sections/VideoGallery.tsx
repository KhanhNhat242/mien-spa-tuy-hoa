'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SITE } from '@/lib/site-data'
import { IMG, type SpaVideo } from '@/lib/images'
import { nw } from '@/lib/format'
import { PlayIcon } from '@/components/ui/Icons'

/** Độ dài đoạn xem trước khi hover (giây) */
const PREVIEW_SECONDS = 6

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

/**
 * Lưới video dọc 9:16 — desktop: hàng 1 bốn video, hàng 2 ba video căn giữa (flex-wrap, mỗi thẻ rộng 1/4);
 * mobile: cuộn ngang (scroll-snap).
 * Bấm thẻ → popup (<dialog> native: tự giữ focus) phát video lớn; đóng bằng Esc hoặc bấm ra nền, ← → để chuyển video
 * (không có nút đóng/trước/sau trên giao diện — theo yêu cầu khách).
 * Hover (chuột) → phát xem trước không tiếng đoạn đầu; video chỉ được gắn khi hover (không tải trước).
 */
export function VideoGallery({ videos }: { videos: SpaVideo[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState<number | null>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const lastIndex = useRef(0)

  const open = (i: number) => {
    lastIndex.current = i
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const close = useCallback(() => dialogRef.current?.close(), [])
  const step = useCallback(
    (d: number) => setIndex((cur) => (cur === null ? cur : (cur + d + videos.length) % videos.length)),
    [videos.length],
  )

  // Đóng dialog (Esc / nút đóng / bấm nền) → dừng video, trả focus về thẻ đã mở
  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    const onClose = () => {
      setIndex(null)
      triggerRefs.current[lastIndex.current]?.focus()
    }
    dlg.addEventListener('close', onClose)
    return () => dlg.removeEventListener('close', onClose)
  }, [])

  // Phím ← → để chuyển video khi popup đang mở
  useEffect(() => {
    if (index === null) return
    lastIndex.current = index
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.tagName === 'VIDEO') return
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, step])

  // Xem trước khi hover (chỉ chuột, tôn trọng giảm chuyển động)
  const [preview, setPreview] = useState<number | null>(null)
  const [previewReady, setPreviewReady] = useState(false)
  const startPreview = (i: number, pointerType: string) => {
    if (pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setPreviewReady(false)
    setPreview(i)
  }
  const stopPreview = () => {
    setPreview(null)
    setPreviewReady(false)
  }

  const v = index === null ? null : videos[index]

  return (
    <>
      <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:scroll-px-6 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-auto lg:max-w-5xl lg:flex-wrap lg:justify-center lg:gap-x-5 lg:gap-y-10 lg:overflow-visible lg:px-0 lg:pb-0">
        {videos.map((it, i) => (
          <li
            key={it.id}
            data-reveal="up"
            style={{ transitionDelay: `${(i % 4) * 90}ms` }}
            className="w-[58vw] max-w-[240px] shrink-0 snap-start lg:w-[calc((100%-3*1.25rem)/4)] lg:max-w-none"
          >
            <button
              ref={(el) => {
                triggerRefs.current[i] = el
              }}
              type="button"
              onClick={() => {
                stopPreview()
                open(i)
              }}
              onPointerEnter={(e) => startPreview(i, e.pointerType)}
              onPointerLeave={stopPreview}
              aria-haspopup="dialog"
              aria-label={`Xem video: ${it.title} (${fmt(it.duration)})`}
              className="on-dark group relative block aspect-[9/16] w-full overflow-hidden rounded-3xl bg-ink shadow-deep ring-1 ring-cream/10"
            >
              <Image
                src={it.poster}
                alt=""
                fill
                sizes="(min-width: 1024px) 240px, 58vw"
                placeholder="blur"
                className="object-cover transition-[scale] duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
              {/* Xem trước khi hover: chỉ gắn video lúc đang hover, tắt tiếng, lặp đoạn đầu */}
              {preview === i && (
                <video
                  src={it.src}
                  muted
                  playsInline
                  autoPlay
                  preload="auto"
                  aria-hidden="true"
                  tabIndex={-1}
                  onPlaying={() => setPreviewReady(true)}
                  onTimeUpdate={(e) => {
                    if (e.currentTarget.currentTime >= PREVIEW_SECONDS) e.currentTarget.currentTime = 0
                  }}
                  className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${previewReady ? 'opacity-100' : 'opacity-0'}`}
                />
              )}
              <span aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />
              <span
                aria-hidden
                className={`absolute top-1/2 left-1/2 grid size-14 -translate-1/2 place-items-center rounded-full bg-cream/90 text-brand shadow-soft backdrop-blur-sm transition-[scale,opacity] duration-300 group-hover:scale-110 ${
                  preview === i && previewReady ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <PlayIcon width={22} height={22} className="translate-x-0.5" />
              </span>
              <span aria-hidden className="absolute bottom-3 left-3 rounded-full bg-ink/60 px-2.5 py-1 text-xs font-semibold text-cream backdrop-blur-sm">
                {fmt(it.duration)}
              </span>
            </button>
            <p className="mt-3 text-base leading-snug font-medium text-cream">{nw(it.title)}</p>
          </li>
        ))}
      </ul>

      {/* Popup xem video */}
      <dialog
        ref={dialogRef}
        aria-label={v ? `Video: ${v.title}` : 'Video'}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
      >
        {v && (
          // Bấm vào vùng mờ quanh video → đóng popup. Esc vẫn đóng được.
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) close()
            }}
            className="on-dark relative flex h-[100svh] w-[100vw] cursor-zoom-out items-center justify-center p-3 sm:p-6"
          >

            <div className="relative aspect-[9/16] h-[min(calc(100svh-1.5rem),calc((100vw-1.5rem)*16/9))] cursor-auto overflow-hidden rounded-3xl bg-ink sm:h-[min(90svh,860px)]">
              <video key={v.id} src={v.src} poster={v.poster.src} controls autoPlay playsInline preload="metadata" className="size-full object-contain">
                <track kind="captions" />
              </video>

              {/* Thông tin đè lên video: phủ tới tận đáy (không hở dải), chừa chỗ thanh điều khiển bằng pb-16 */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/85 via-ink/50 to-transparent px-4 pt-20 pb-16 text-left text-cream sm:px-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream p-1">
                    <Image src={IMG.logo} alt="" sizes="36px" className="h-auto w-full" />
                  </span>
                  <p className="text-sm font-semibold [text-shadow:0_1px_3px_rgb(0_0_0/0.5)]">
                    {SITE.fullName}
                    <span className="block text-xs font-normal opacity-85">
                      Video {index! + 1}/{videos.length} · {fmt(v.duration)}
                    </span>
                  </p>
                </div>
                <h3 className="mt-2.5 font-serif text-[1.45rem] leading-tight [text-shadow:0_1px_4px_rgb(0_0_0/0.55)] sm:text-[1.6rem]">
                  {nw(v.title)}
                </h3>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
