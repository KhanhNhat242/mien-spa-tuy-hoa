import type { CSSProperties } from 'react'
import Image from 'next/image'
import { SITE } from '@/lib/site-data'
import { IMG } from '@/lib/images'
import { nw } from '@/lib/format'
import { ArrowRightIcon, PhoneIcon } from '@/components/ui/Icons'
import { btn } from '@/components/ui/styles'
import { HeroTitle } from './HeroTitle'

const d = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties

/** Ngôi sao 8 cánh trang trí (theo bố cục mẫu) */
function Star({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className} style={style}>
      <path
        fill="currentColor"
        d="M50 0 56 30 79 10 64 37 96 31 69 48 100 59 67 62 86 88 58 70 54 100 46 70 21 92 36 64 3 66 31 49 0 34 34 38 20 9 44 30Z"
      />
    </svg>
  )
}

/**
 * Hero theo bố cục mẫu (ảnh khách gửi 12/11/2026): nền cream trơn; trái là tiêu đề serif lớn 3 dòng,
 * 1 đoạn mô tả, nút chính + nút tròn có vòng viền (gọi hotline); phải là ảnh `hero-img` trong khung bo
 * cong lớn không đều, cặp ngôi sao phía trên-trái khung.
 * Vừa đúng 1 màn hình ở mọi kích thước (mobile: khung ảnh co giãn lấp phần còn lại).
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-cream lg:h-[calc(100svh-5rem)] lg:max-h-[880px] lg:min-h-[640px] 2xl:max-h-[800px]"
    >
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 pt-5 pb-20 sm:gap-8 sm:px-6 md:pt-12 md:pb-10 lg:grid lg:min-h-0 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-8 lg:py-12">
        {/* Cột chữ */}
        <div className="relative z-10 lg:col-span-6 xl:col-span-6">
          {/* Tiêu đề có hiệu ứng VariableProximity: chữ đậm dần khi con trỏ lại gần */}
          <HeroTitle
            name={SITE.name}
            slogan={nw(SITE.slogan, 1)}
            className="hero-in max-w-[12ch] font-serif text-[2.5rem] leading-[1.08] tracking-[-0.01em] text-brand sm:text-6xl xl:text-[4.6rem]"
            style={d(0)}
          />

          <p className="hero-in mt-4 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg lg:mt-7" style={d(200)}>
            {nw('Điểm hẹn chăm sóc cơ thể, trị liệu cổ vai gáy và gội đầu dưỡng sinh thư thái giữa lòng Tuy Hòa.')}{' '}
            <span className="hidden text-brand sm:inline">{nw(`${SITE.tagline}.`)}</span>
          </p>

          <div className="hero-in mt-6 flex items-center gap-x-5 sm:gap-x-6 lg:mt-10" style={d(300)}>
            <a href="#dat-lich" className={`${btn.primary} px-8`}>
              Đặt lịch ngay
              <ArrowRightIcon width={18} height={18} />
            </a>
            {/* Nút tròn có vòng viền (vị trí nút "play" của mẫu) → gọi hotline */}
            <a
              href={`tel:${SITE.phone.raw}`}
              aria-label={`Gọi tư vấn ${SITE.phone.display}`}
              className="press group inline-flex items-center gap-3 text-sm font-semibold whitespace-nowrap text-brand"
            >
              <span className="relative grid size-12 shrink-0 place-items-center rounded-full bg-cream shadow-soft ring-4 sm:size-14 sm:ring-[5px] ring-brand/15 transition-[box-shadow] duration-300 group-hover:ring-brand/30">
                <PhoneIcon width={20} height={20} />
              </span>
              <span aria-hidden className="max-sm:hidden">
                <span className="block text-xs font-medium text-ink-soft">Gọi tư vấn</span>
                {SITE.phone.display}
              </span>
            </a>
          </div>
        </div>

        {/* Cột ảnh */}
        <div className="relative min-h-[150px] flex-1 sm:min-h-[440px] lg:col-span-6 lg:h-full lg:min-h-0">
          <div className="absolute inset-y-0 right-0 left-[8%] sm:left-[18%] lg:left-[16%] lg:inset-y-[2%]">
            {/* Cặp ngôi sao phía trên-trái khung */}
            <Star className="hero-in absolute top-[2%] left-[-15%] size-9 text-brand-soft sm:size-12" style={d(450)} />
            <Star className="hero-in absolute top-[10%] left-[-6%] size-5 text-brand sm:size-7" style={d(550)} />

            {/* Khung ảnh bo cong lớn không đều — lớp ngoài nổi bồng bềnh (.water-float), lớp trong hiện vào (.hero-in) */}
            <div className="water-float absolute inset-0">
              <div
                className="hero-in absolute inset-0 overflow-hidden rounded-[34%_12%_26%_6%/24%_8%_20%_4%] bg-sand shadow-lift"
                style={d(150)}
              >
                <Image
                  src={IMG.heroImg}
                  alt="Kỹ thuật viên Miên Spa gội đầu dưỡng sinh cho khách"
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 520px, 90vw"
                  placeholder="blur"
                  className="object-cover object-[50%_45%]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
