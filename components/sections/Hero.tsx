import type { CSSProperties } from 'react'
import { SITE } from '@/lib/site-data'
import { IMG } from '@/lib/images'
import { nw } from '@/lib/format'
import { ArrowRightIcon } from '@/components/ui/Icons'
import { btn } from '@/components/ui/styles'
import { LensImage } from '@/components/ui/LensImage'
import { HeroTitle } from './HeroTitle'

const d = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties

/** Ngôi sao 4 cánh nhỏ (theo ảnh mẫu) */
function Sparkle({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} style={style}>
      <path fill="currentColor" d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
    </svg>
  )
}

/**
 * Hero bản 5 (theo ảnh mẫu khách gửi 13/11/2026): nền cream, 2 cột.
 * Trái: tiêu đề lớn (VariableProximity), 1 đoạn định vị, nút Đặt lịch ngay + liên kết chữ "Xem bảng giá →"
 * (khách đã bỏ tagline, hàng số liệu và thẻ dịch vụ nổi).
 * Phải: khung vuông canh giữa cột theo chiều dọc — vòng tròn mảnh, tấm nền bo góc lớn màu nâu nhạt, ảnh `hero-cutout`
 * (hero-banner3 đã tách nền, 2 người bên phải) đặt trên tấm nền, đầu kỹ thuật viên nhô khỏi mép trên như mẫu.
 * Chiều cao: 1 màn hình (trừ header), màn lớn giới hạn (AGENTS §6).
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-cream lg:h-[calc(100svh-5rem)] lg:max-h-[880px] lg:min-h-[640px] 2xl:max-h-[800px]"
    >
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 pt-6 pb-20 sm:px-6 md:pt-10 lg:grid lg:min-h-0 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-8 lg:py-10">
        {/* Cột chữ */}
        <div className="relative z-10 lg:col-span-6">
          <HeroTitle
            name={SITE.name}
            slogan={nw(SITE.slogan, 1)}
            className="hero-in max-w-[13ch] font-serif text-[2.5rem] leading-[1.06] tracking-[-0.01em] text-brand sm:mt-4 sm:text-6xl xl:text-[4.4rem]"
            style={d(80)}
          />

          <p className="hero-in mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg" style={d(160)}>
            {nw('Điểm hẹn chăm sóc cơ thể, trị liệu cổ vai gáy và gội đầu dưỡng sinh thư thái giữa lòng Tuy Hòa.')}
          </p>

          <div className="hero-in mt-6 flex items-center gap-6 lg:mt-8" style={d(320)}>
            <a href="#dat-lich" className={`${btn.primary} px-7 whitespace-nowrap`}>
              Đặt lịch ngay
            </a>
            <a
              href="#bang-gia"
              className="press group inline-flex min-h-11 items-center gap-2 text-sm font-semibold whitespace-nowrap text-brand"
            >
              Xem bảng giá
              <ArrowRightIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/*
          Cột ảnh — khung sân khấu VUÔNG luôn nằm giữa cột theo cả 2 chiều (cạnh = min(rộng, cao) của cột, qua
          container query kích thước — chỉ lg+; dưới lg cq trả về 0 khi cột là flex item nên dùng ô vuông cao = cột) → ảnh to nhất
          có thể mà vẫn canh giữa màn hình theo chiều dọc.
        */}
        <div className="relative min-h-[150px] flex-1 sm:min-h-[300px] lg:col-span-6 lg:h-full lg:min-h-0 lg:[container-type:size]">
          <div className="absolute inset-y-0 left-1/2 aspect-square max-w-full -translate-x-1/2 lg:inset-0 lg:m-auto lg:aspect-auto lg:size-[min(100cqw,100cqh)] lg:translate-x-0">
            {/* Vòng tròn mảnh phía sau */}
            <div aria-hidden className="hero-in absolute inset-0 rounded-full border border-brand/15" style={d(100)} />
            {/* Tấm nền bo góc lớn — mép trên ~38% để đầu kỹ thuật viên nhô lên khỏi tấm nền như mẫu */}
            <div
              aria-hidden
              className="hero-in absolute inset-x-[8%] top-[38%] bottom-[6%] rounded-[2.5rem] rounded-tl-[42%] bg-brand-soft/30 sm:rounded-[3rem] sm:rounded-tl-[42%]"
              style={d(150)}
            />
            {/* Ảnh đã tách nền — rộng hơn tấm nền một chút để ảnh cao hơn; đáy trùng đáy tấm nền (cắt bo góc dưới) */}
            <div className="hero-in absolute inset-x-[2%] top-0 bottom-[6%]" style={d(220)}>
              <div className="absolute inset-x-[6%] top-0 bottom-0 overflow-hidden rounded-b-[2.5rem] sm:rounded-b-[3rem]">
                {/* Hiệu ứng thấu kính khúc xạ theo con trỏ (WebGL, chỉ máy có chuột); ảnh tĩnh là bản dự phòng */}
                <LensImage
                  src={IMG.heroCutout}
                  alt="Kỹ thuật viên Miên Spa gội đầu dưỡng sinh cho khách"
                  sizes="(min-width: 1024px) 600px, 90vw"
                  scale={1.12}
                  imgClassName="scale-[1.12] origin-bottom object-contain object-bottom"
                />
              </div>
            </div>

            {/* Ngôi sao nhỏ */}
            <Sparkle className="hero-in absolute top-[22%] right-[4%] size-4 text-brand-soft" style={d(550)} />
            <Sparkle className="hero-in absolute bottom-[1%] left-[38%] size-3 text-brand-soft" style={d(600)} />
          </div>
        </div>
      </div>
    </section>
  )
}
