'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { nw } from '@/lib/format'
import { BookButton } from '@/components/ui/BookButton'
import { ArrowRightIcon, ClockIcon } from '@/components/ui/Icons'

export type ServiceSlide = {
  key: string
  title: string
  desc: string
  bookId: string
  duration: string | null
  price: string
  image: StaticImageData
}

/**
 * Vị trí thẻ theo khoảng cách tới thẻ đang chọn (desktop lg+), tính theo % chiều rộng sân khấu:
 * 0 = thẻ chính (mô tả trái + ảnh phải) · ±1, ±2 = thẻ hai bên chỉ có ảnh, nhỏ dần · xa hơn = ẩn.
 */
const SLOT: Record<number, { x: number; w: number; h: number; o: number; z: number }> = {
  0: { x: 50, w: 60, h: 100, o: 1, z: 30 },
  1: { x: 86.5, w: 9, h: 72, o: 1, z: 20 },
  2: { x: 95.5, w: 6, h: 52, o: 1, z: 10 },
  3: { x: 99.5, w: 4, h: 40, o: 0, z: 0 },
}
const slot = (offset: number) => {
  const s = SLOT[Math.min(Math.abs(offset), 3)]
  return { ...s, x: offset < 0 ? 100 - s.x : s.x }
}
/** Mỗi dịch vụ chiếm bao nhiêu chiều cao màn hình khi cuộn (desktop) */
const STEP_SVH = 55

/**
 * Dịch vụ chính — băng chuyền thẻ theo ảnh mẫu.
 * Desktop: section được ghim (sticky) trong lúc cuộn; mỗi đoạn cuộn STEP_SVH đưa dịch vụ tiếp theo vào giữa.
 * Mobile/tablet: dải thẻ vuốt ngang (scroll-snap), mỗi thẻ đủ ảnh + mô tả.
 */
export function ServiceCarousel({ slides, heading }: { slides: ServiceSlide[]; heading: ReactNode }) {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const n = slides.length

  useEffect(() => {
    const el = track.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const run = r.height - window.innerHeight
      if (run <= 0) return // dưới lg: track không cao hơn màn hình → không điều khiển bằng cuộn
      const p = Math.min(1, Math.max(0, -r.top / run))
      setActive(Math.min(n - 1, Math.floor(p * n)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [n])

  /** Cuộn trang tới đoạn ứng với thẻ i (desktop) — dùng cho chấm điều hướng & bấm thẻ bên */
  const goTo = (i: number) => {
    const el = track.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const run = r.height - window.innerHeight
    if (run <= 0) return setActive(i)
    window.scrollTo({ top: window.scrollY + r.top + ((i + 0.5) / n) * run })
  }

  return (
    <div
      ref={track}
      className="relative lg:h-[var(--track)]"
      style={{ '--track': `calc(100svh + ${(n - 1) * STEP_SVH}svh)` } as CSSProperties}
    >
      <div className="lg:sticky lg:top-20 lg:flex lg:h-[calc(100svh-5rem)] lg:flex-col lg:justify-center">
        {heading}

        {/* Sân khấu */}
        <ul
          aria-label="Dịch vụ chính"
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:relative lg:mx-0 lg:block lg:h-[min(480px,calc(100svh-19rem))] lg:overflow-visible lg:p-0"
        >
          {slides.map((s, i) => {
            const off = i - active
            const pos = slot(off)
            const main = off === 0
            return (
              <li
                key={s.key}
                onClick={main ? undefined : () => goTo(i)}
                style={
                  {
                    '--x': `${pos.x}%`,
                    '--w': `${pos.w}%`,
                    '--h': `${pos.h}%`,
                    '--o': pos.o,
                    zIndex: pos.z,
                  } as CSSProperties
                }
                className={`relative w-[85%] shrink-0 snap-center overflow-hidden rounded-3xl bg-cream shadow-card ring-1 ring-brand/10 sm:w-[60%] md:w-[46%] lg:absolute lg:top-1/2 lg:left-[var(--x)] lg:h-[var(--h)] lg:w-[var(--w)] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:opacity-[var(--o)] lg:transition-[left,width,height,opacity,box-shadow] lg:duration-700 lg:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  main ? 'lg:shadow-deep' : 'lg:cursor-pointer lg:hover:shadow-lift'
                }`}
              >
                {/* Ảnh — mobile: trên cùng; desktop: nửa phải thẻ chính / cả thẻ bên (viền trắng như mẫu) */}
                <div
                  className={`relative m-2 aspect-[4/3] overflow-hidden rounded-2xl lg:absolute lg:m-0 lg:aspect-auto lg:transition-[inset] lg:duration-700 lg:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    main ? 'lg:inset-y-3 lg:right-3 lg:left-1/2' : 'lg:inset-1.5'
                  }`}
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 400px, 85vw"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>

                {/* Mô tả — desktop: chỉ hiện ở thẻ chính (thẻ bên chỉ có ảnh) */}
                <div
                  className={`flex flex-col p-5 pt-3 sm:p-6 sm:pt-4 lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 lg:p-8 xl:p-10 lg:transition-[opacity,visibility,translate] lg:ease-out motion-reduce:transition-none ${
                    main ? 'lg:visible lg:translate-x-0 lg:opacity-100 lg:delay-300 lg:duration-500' : 'lg:invisible lg:-translate-x-4 lg:opacity-0 lg:duration-200'
                  }`}
                >
                  <p className="font-serif text-3xl leading-tight text-brand xl:text-[2.6rem]">{s.price}</p>
                  {s.duration && (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink-soft">
                      <ClockIcon width={16} height={16} className="text-sage" />
                      {s.duration}
                    </p>
                  )}

                  <div className="mt-5 lg:mt-auto">
                    <h3 className="font-serif text-xl leading-snug text-brand xl:text-2xl">{nw(s.title, 1)}</h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-soft">{nw(s.desc)}</p>
                    <BookButton
                      serviceId={s.bookId}
                      ariaLabel={`Đặt lịch ${s.title}`}
                      className="press mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold whitespace-nowrap text-cream hover:bg-brand/90"
                    >
                      Đặt lịch
                      <ArrowRightIcon width={16} height={16} />
                    </BookButton>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {/* Chấm điều hướng (desktop) — cũng là đường cho bàn phím/trình đọc màn hình */}
        <div className="mt-8 hidden justify-center gap-2 lg:flex">
          {slides.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Xem ${s.title}`}
              aria-current={i === active}
              className="press grid size-11 place-items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-[width,background-color] duration-500 ${
                  i === active ? 'w-8 bg-brand' : 'w-1.5 bg-brand/25'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
