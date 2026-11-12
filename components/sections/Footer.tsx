import Image from 'next/image'
import { NAV, SITE } from '@/lib/site-data'
import { IMG } from '@/lib/images'
import { nw } from '@/lib/format'
import { ClockIcon, FacebookIcon, PhoneIcon, PinIcon } from '@/components/ui/Icons'

// Năm bản quyền cố định (Cache Components không cho gọi new Date() khi prerender)
const COPYRIGHT_YEAR = 2026

export function Footer() {
  return (
    <footer className="bg-ink pt-14 pb-28 text-cream lg:pt-16 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <div className="inline-flex rounded-3xl bg-cream px-6 py-4">
            <Image src={IMG.logo} alt={`Logo ${SITE.name}`} className="h-20 w-auto" sizes="120px" />
          </div>
          <p className="mt-5 font-serif text-2xl text-sand italic">{nw(SITE.slogan, 1)}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-sand/70">{nw(`${SITE.tagline}.`)}</p>
        </div>

        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand/60">Liên hệ</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <PinIcon width={18} height={18} className="mt-0.5 shrink-0 text-sand/70" />
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sand">
                {nw(SITE.address.full)}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <PhoneIcon width={18} height={18} className="mt-0.5 shrink-0 text-sand/70" />
              <a href={`tel:${SITE.phone.raw}`} className="hover:text-sand">
                {SITE.phone.display} (Hotline / Zalo)
              </a>
            </li>
            <li className="flex items-start gap-3">
              <ClockIcon width={18} height={18} className="mt-0.5 shrink-0 text-sand/70" />
              <span>
                {SITE.hours.open} – {SITE.hours.close}, {nw(SITE.hours.days, 3)}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FacebookIcon width={18} height={18} className="mt-0.5 shrink-0 text-sand/70" />
              <a href={SITE.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sand">
                Fanpage {SITE.name}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Liên kết chân trang" className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand/60">Khám phá</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm lg:grid-cols-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-cream/85 hover:text-sand">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#dat-lich" className="text-cream/85 hover:text-sand">
                Đặt lịch
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="border-t border-cream/10 pt-6 text-center text-xs text-sand/50">
          © {COPYRIGHT_YEAR} {SITE.fullName}. {nw('Phục vụ Tuy Hòa và các khu vực lân cận.')}
        </p>
      </div>
    </footer>
  )
}
