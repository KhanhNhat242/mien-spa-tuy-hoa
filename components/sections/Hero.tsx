import type { CSSProperties } from 'react'
import Image from 'next/image'
import { SITE } from '@/lib/site-data'
import { IMG } from '@/lib/images'
import { nw, summarize } from '@/lib/format'
import { ArrowRightIcon, ChatIcon, ClockIcon, LeafIcon, PhoneIcon, PinIcon, RiceStalk } from '@/components/ui/Icons'
import { btn } from '@/components/ui/styles'

const d = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties

/**
 * Hero vừa đúng 1 màn hình ở mọi kích thước:
 * - mobile/tablet: cột dọc, cụm ảnh co giãn lấp phần chiều cao còn lại (flex-1)
 * - desktop: 2 cột 5:7, chiều cao = 100svh - header
 */
export function Hero() {
  const combo = summarize(['combo-chuyen-sau'])

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-cream lg:h-[calc(100svh-5rem)] lg:max-h-[940px] lg:min-h-[640px]"
    >
      {/* Nền trang trí: vầng sáng ấm + bông lúa */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 size-[520px] rounded-full bg-sand/70 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-30%] size-[560px] rounded-full bg-sage/10 blur-3xl" />
        <RiceStalk className="deco-float absolute bottom-10 left-[36%] hidden h-36 text-brand/10 lg:block" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 pt-6 pb-20 sm:px-6 md:gap-10 md:pt-12 md:pb-24 lg:grid lg:min-h-0 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-8 lg:py-8">
        {/* Cột chữ */}
        <div className="md:mx-auto md:max-w-2xl md:text-center lg:col-span-5 lg:mx-0 lg:max-w-none lg:text-left">
          <p
            className="hero-in inline-flex items-center gap-2 rounded-full border border-sage/25 bg-sage/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-sage sm:text-xs"
            style={d(0)}
          >
            <LeafIcon width={16} height={16} />
            {nw('Đi Phú Yên hãy đến Miên', 1)}
          </p>

          <h1 id="hero-title" className="hero-in mt-4 font-serif text-brand md:mt-6" style={d(120)}>
            <span className="block text-5xl leading-[1.04] sm:text-7xl xl:text-[5.25rem]">{SITE.name}</span>
            <span className="mt-2 block text-2xl leading-tight text-brand-soft italic sm:text-4xl md:mt-3 xl:text-[2.6rem]">
              {nw(SITE.slogan, 1)}
            </span>
          </h1>

          <p
            className="hero-in mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink-soft sm:text-lg md:mx-auto md:mt-6 lg:mx-0"
            style={d(240)}
          >
            {nw('Điểm hẹn chăm sóc cơ thể, trị liệu cổ vai gáy và gội đầu dưỡng sinh thư thái giữa lòng Tuy Hòa.')}{' '}
            <span className="font-medium text-brand">{nw(`${SITE.tagline}.`)}</span>
          </p>

          <div className="hero-in mt-6 flex gap-3 md:mt-8 md:justify-center lg:justify-start" style={d(360)}>
            <a href="#dat-lich" className={`${btn.primary} flex-1 px-4 sm:flex-none sm:px-6`}>
              Đặt lịch ngay
              <ArrowRightIcon width={18} height={18} />
            </a>
            <a href={`tel:${SITE.phone.raw}`} className={`${btn.outline} flex-1 px-4 sm:flex-none sm:px-6`}>
              <PhoneIcon width={18} height={18} />
              <span className="sm:hidden">Gọi ngay</span>
              <span className="hidden sm:inline">{nw(`Gọi ${SITE.phone.display}`, 3)}</span>
            </a>
          </div>

          <dl className="hero-in mt-8 hidden grid-cols-2 gap-4 border-t border-brand/10 pt-6 text-sm sm:max-w-md lg:grid" style={d(480)}>
            <div className="flex items-start gap-2.5">
              <ClockIcon className="mt-0.5 shrink-0 text-sage" width={18} height={18} />
              <div>
                <dt className="text-ink-soft">Mở cửa mỗi ngày</dt>
                <dd className="font-semibold text-brand">
                  {SITE.hours.open} – {SITE.hours.close}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <PinIcon className="mt-0.5 shrink-0 text-sage" width={18} height={18} />
              <div>
                <dt className="text-ink-soft">{SITE.address.street}</dt>
                <dd className="font-semibold text-brand">{nw(SITE.address.ward, 1)}</dd>
              </div>
            </div>
          </dl>
        </div>

        {/* Cột ảnh: collage vòm */}
        <div className="relative min-h-[250px] flex-1 sm:min-h-[380px] lg:col-span-7 lg:h-full lg:max-h-[780px] lg:min-h-0">
          <div className="absolute inset-0 mx-auto max-w-[620px] lg:max-w-none">
            {/* Vòm nền (gợi bức tường vòm của spa) */}
            <div aria-hidden className="absolute top-[5%] right-0 bottom-0 w-[62%] rounded-t-full bg-sand lg:right-[6%] lg:w-[58%]" />

            {/* Ảnh chính – vòm */}
            <div
              className="hero-in absolute top-0 right-[6%] bottom-[5%] w-[58%] overflow-hidden rounded-t-full rounded-b-[2rem] shadow-[0_40px_80px_-40px_rgba(99,56,26,0.6)] ring-1 ring-brand/10 lg:right-[12%] lg:w-[52%]"
              style={d(200)}
            >
              <Image
                src={IMG.heroMain}
                alt="Kỹ thuật viên Miên Spa chuẩn bị khăn trên giường trị liệu"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 36vw, 60vw"
                placeholder="blur"
                className="object-cover object-[50%_30%]"
              />
            </div>

            {/* Ảnh phụ – khay trà */}
            <div
              className="hero-in absolute bottom-0 left-0 aspect-[3/4] h-[62%] overflow-hidden rounded-[1.5rem] border-[5px] border-cream shadow-[0_30px_60px_-30px_rgba(43,33,24,0.55)] sm:rounded-[1.75rem] lg:bottom-[2%] lg:left-[4%] lg:h-[56%]"
              style={d(420)}
            >
              <Image
                src={IMG.heroTea}
                alt="Khay mây với trà gừng ấm và lá dứa"
                fill
                sizes="(min-width: 1024px) 22vw, 40vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>

            {/* Huy hiệu tư vấn */}
            <div
              className="hero-in absolute top-[8%] left-0 flex items-center gap-3 rounded-2xl bg-cream/95 px-3.5 py-2.5 shadow-[0_20px_40px_-20px_rgba(43,33,24,0.4)] ring-1 ring-sand sm:px-4 sm:py-3 lg:top-[14%] lg:left-[6%]"
              style={d(560)}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage sm:size-10">
                <ChatIcon width={20} height={20} />
              </span>
              <span className="text-xs leading-tight sm:text-sm">
                <span className="block font-semibold text-brand">Tư vấn riêng</span>
                <span className="block text-ink-soft">{nw('theo tình trạng từng khách', 1)}</span>
              </span>
            </div>

            {/* Huy hiệu Combo Chuyên Sâu */}
            <a
              href="#combo"
              className="hero-in absolute right-0 bottom-[10%] w-[50%] max-w-[240px] rounded-2xl bg-brand px-4 py-3 text-cream shadow-[0_24px_50px_-20px_rgba(99,56,26,0.8)] transition hover:-translate-y-0.5 sm:px-5 sm:py-4 lg:right-[2%] lg:bottom-[16%]"
              style={d(680)}
            >
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-sand/80">
                {nw('VVIP cuối tuần', 1)}
              </span>
              <span className="mt-1 block font-serif text-base leading-snug sm:text-lg">{nw('Combo Chuyên Sâu', 1)}</span>
              <span className="mt-1 flex flex-wrap items-baseline gap-x-2 text-xs sm:text-sm">
                <span className="text-sand/80">{combo.duration}</span>
                <span className="font-semibold">{combo.price}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
