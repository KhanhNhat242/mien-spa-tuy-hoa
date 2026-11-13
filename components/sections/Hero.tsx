import type { CSSProperties } from 'react'
import Image from 'next/image'
import { CATEGORIES, NAV, SITE } from '@/lib/site-data'
import { IMG } from '@/lib/images'
import { nw } from '@/lib/format'
import { CheckIcon, PhoneIcon, PinIcon } from '@/components/ui/Icons'
import { HeroTitle } from './HeroTitle'

const d = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties

/** Ba nhóm dịch vụ nêu trong thanh giữa Hero (nhãn lấy từ CATEGORIES — không hard-code) */
const HIGHLIGHT_IDS = ['goi-xong', 'body', 'combo'] as const

/**
 * Hero dạng banner (theo ảnh mẫu khách gửi 13/11/2026): ảnh `hero-banner` phủ toàn khung, mờ nhẹ + lớp tối;
 * giữa là logo, thanh menu trang (thay tagline), slogan cỡ lớn (VariableProximity), 2 đường kẻ mảnh kẹp thanh 3 nhóm
 * dịch vụ có dấu tích; hàng đáy: hotline (trái) · Đặt lịch ngay (giữa) · địa chỉ (phải).
 * Chiều cao: 1 màn hình ở mobile/tablet/laptop (desktop lg+ header ẩn nên Hero cao 100svh); màn lớn giới hạn lg ≤ 960px, 2xl (≥1536px) ≤ 880px.
 */
export function Hero() {
  const highlights = HIGHLIGHT_IDS.map((id) => CATEGORIES.find((c) => c.id === id)!.label)

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-ink text-cream lg:h-svh lg:max-h-[960px] lg:min-h-[640px] 2xl:max-h-[880px]"
    >
      {/* Ảnh nền + lớp tối (đảm bảo tương phản chữ cream) */}
      <Image
        src={IMG.heroBanner}
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        placeholder="blur"
        className="-z-20 scale-105 object-cover object-[78%_75%] blur-[2px] lg:object-[60%_75%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/60" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-ink)_120%)] opacity-70" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center px-4 pt-8 pb-24 text-center sm:px-6 lg:px-8 lg:pt-10 lg:pb-10">
        {/* Khối giữa */}
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          <div className="hero-in rounded-2xl bg-cream px-4 py-2 shadow-soft" style={d(0)}>
            <Image src={IMG.logo} alt={`Logo ${SITE.name}`} className="h-12 w-auto sm:h-16" sizes="120px" />
          </div>
          {/* Menu trang đặt trong Hero (md+); header ẩn menu của nó khi đang ở Hero để không lặp. Mobile dùng nút menu trên header */}
          <nav aria-label="Điều hướng trong banner" className="hero-in mt-5 hidden md:block" style={d(80)}>
            <ul className="flex flex-wrap justify-center gap-x-9 gap-y-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="press group relative inline-flex min-h-11 items-center text-base font-medium whitespace-nowrap text-cream/90 transition-colors hover:text-cream"
                  >
                    {n.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-1.5 h-px origin-left scale-x-0 bg-sand transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <HeroTitle
            name={SITE.name}
            slogan={nw(SITE.slogan, 1)}
            className="hero-in mt-4 max-w-[16ch] font-serif text-[2.9rem] leading-[1.04] tracking-[-0.01em] text-cream sm:mt-8 sm:text-7xl lg:max-w-none lg:text-[5.4rem] xl:text-[6.4rem]"
            style={d(150)}
          />

          {/* Đường kẻ – thanh dịch vụ – đường kẻ */}
          <div className="hero-in mt-6 w-full max-w-4xl sm:mt-10" style={d(300)}>
            <span aria-hidden className="mx-auto block h-px w-full bg-cream/55" />
            <ul className="mx-auto my-5 flex w-fit flex-col items-start gap-x-10 gap-y-2.5 rounded-3xl border border-sand/50 bg-ink/35 px-6 py-3.5 backdrop-blur-sm sm:my-6 sm:flex-row sm:items-center sm:rounded-full sm:px-8">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-base whitespace-nowrap text-cream sm:text-lg">
                  <CheckIcon width={18} height={18} className="shrink-0 text-sand" />
                  {h}
                </li>
              ))}
            </ul>
            <span aria-hidden className="mx-auto block h-px w-full bg-cream/55" />
          </div>
        </div>

        {/* Hàng đáy: hotline · đặt lịch · địa chỉ */}
        {/* Chừa lề phải < 1440px cho cụm nút nổi (Gọi/Zalo/Messenger) ở góc phải. Dưới lg ẩn: thanh liên hệ cố định phía dưới đã có Gọi điện + Đặt lịch */}
        <div className="hero-in mt-8 hidden w-full items-center gap-4 lg:grid lg:grid-cols-3 lg:max-[1439px]:pr-16" style={d(450)}>
          <a href={`tel:${SITE.phone.raw}`} className="press flex items-center gap-3 text-left">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cream text-brand">
              <PhoneIcon width={20} height={20} />
            </span>
            <span className="leading-tight">
              <span className="block text-sm text-sand">Hotline</span>
              <span className="text-lg font-semibold whitespace-nowrap">{SITE.phone.display}</span>
            </span>
          </a>

          <a
            href="#dat-lich"
            className="press mx-auto inline-flex min-h-12 items-center justify-center rounded-full bg-sand px-8 text-sm font-semibold tracking-[0.16em] whitespace-nowrap text-brand uppercase shadow-lift transition-colors hover:bg-cream"
          >
            Đặt lịch ngay
          </a>

          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="press flex items-center justify-end gap-3 text-right"
          >
            <span className="leading-tight">
              <span className="block text-sm text-sand">Địa chỉ</span>
              <span className="text-lg font-semibold whitespace-nowrap">{SITE.address.street}</span>
            </span>
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cream text-brand">
              <PinIcon width={20} height={20} />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
