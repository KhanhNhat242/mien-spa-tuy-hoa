import Image from 'next/image'
import { IDEAL_FOR, SITE, USPS } from '@/lib/site-data'
import { ABOUT_TILES } from '@/lib/images'
import { nw } from '@/lib/format'
import { Container, Section, revealDelay } from '@/components/ui/Section'
import { btn } from '@/components/ui/styles'
import { ArrowRightIcon } from '@/components/ui/Icons'

/**
 * Bố cục cụm ảnh (theo ảnh mẫu 12/11/2026): 2 cột so le —
 *  ┌── cao ──┐┌─ thấp ─┐
 *  │  0      ││  1     │
 *  │         │├────────┤
 *  ├─────────┤│  3     │
 *  │  2 thấp ││  cao   │
 *  └─────────┘└────────┘
 * Mỗi ô = 1 ý "Điều Miên chú trọng" (USPS cùng thứ tự); màu lớp phủ khi hover lấy từ token.
 */
const TILE = [
  { cell: 'col-start-1 row-span-2 row-start-1', overlay: 'bg-brand/80', radius: 'rounded-[2.5rem_2.5rem_2.5rem_1.25rem]' },
  { cell: 'col-start-2 row-start-1', overlay: 'bg-sage/90', radius: 'rounded-[2.5rem_2.5rem_1.25rem_2.5rem]' },
  { cell: 'col-start-1 row-start-3', overlay: 'bg-sage/90', radius: 'rounded-[1.25rem_2.5rem_2.5rem_2.5rem]' },
  { cell: 'col-start-2 row-span-2 row-start-2', overlay: 'bg-brand/80', radius: 'rounded-[2.5rem_1.25rem_2.5rem_2.5rem]' },
]

/**
 * Hover/focus vào ảnh → lớp phủ màu trượt lên từ đáy, chữ hiện lần lượt (tiêu đề → mô tả).
 * Màn cảm ứng: chạm vào ảnh (focus) để hiện. Nội dung luôn có trong DOM cho trình đọc màn hình.
 */
const REVEAL_BG =
  'translate-y-full transition-[translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus:translate-y-0 motion-reduce:transition-none'
const REVEAL_TEXT =
  'translate-y-4 opacity-0 transition-[opacity,translate] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 motion-reduce:transition-none'

export function About() {
  return (
    <Section id="gioi-thieu" tone="sand" labelledBy="about-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Cụm ảnh — bên trái */}
          <div className="lg:col-span-7">
            <h3 className="sr-only">Điều Miên chú trọng</h3>
            <ul className="grid h-[520px] grid-cols-2 grid-rows-[35fr_25fr_40fr] gap-3 sm:h-[620px] sm:gap-4 lg:h-[640px]">
              {USPS.map((u, i) => {
                const t = TILE[i]
                const img = ABOUT_TILES[i]
                return (
                  <li key={u.title} data-reveal="up" style={revealDelay(i * 110)} className={t.cell}>
                    <figure
                      tabIndex={0}
                      className={`group relative isolate size-full cursor-default overflow-hidden shadow-card outline-offset-4 ${t.radius}`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 380px, 50vw"
                        placeholder="blur"
                        style={{ objectPosition: img.pos }}
                        className="object-cover transition-[scale] duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                      />
                      {/* Lớp phủ + nội dung */}
                      <figcaption className="absolute inset-0 z-10 flex flex-col justify-end p-5 text-cream sm:p-7">
                        <span aria-hidden className={`absolute inset-0 -z-10 ${t.overlay} ${REVEAL_BG}`} />
                        <span className={`block font-serif text-xl leading-snug sm:text-2xl ${REVEAL_TEXT} delay-100`}>
                          {nw(u.title, 1)}
                        </span>
                        <span className={`mt-2 block text-sm leading-relaxed text-cream/90 sm:text-base ${REVEAL_TEXT} delay-200`}>
                          {nw(u.desc)}
                        </span>
                      </figcaption>
                    </figure>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Nội dung — bên phải */}
          <div className="lg:col-span-5">
            <h2 id="about-title" className="font-serif text-[2.4rem] leading-[1.05] tracking-[-0.01em] text-brand sm:text-[3.4rem] xl:text-[4rem]">
              {nw('Cuối Tuần Là Để Yêu Bản Thân!', 1)}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
              {nw(
                `${SITE.fullName} là góc thư giãn giữa lòng Tuy Hòa, nơi bạn tạm gác bộn bề để được chăm sóc cơ thể trong không gian ấm áp, gần gũi thiên nhiên.`,
              )}
            </p>

            <a href="#dat-lich" className={`${btn.primary} mt-8 px-7`}>
              Đặt lịch ngay
              <ArrowRightIcon width={18} height={18} />
            </a>

            <h3 className="mt-12 text-xs font-semibold uppercase tracking-[0.22em] text-sage">Liệu trình lý tưởng dành cho</h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {IDEAL_FOR.map((t, i) => (
                <li
                  key={t}
                  className={`rounded-full border px-4 py-2.5 text-sm leading-snug sm:text-base ${
                    i === 1 ? 'border-sage bg-sage text-cream' : 'border-brand/30 text-ink'
                  }`}
                >
                  {nw(t)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}
