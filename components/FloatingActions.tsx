import { SITE } from '@/lib/site-data'
import { CalendarIcon, MessengerIcon, PhoneIcon, ZaloIcon } from '@/components/ui/Icons'

/**
 * Cụm nút nổi: thanh đáy trên mobile (Gọi · Zalo · Đặt lịch), cột tròn góc phải trên desktop.
 * Vùng bấm >= 44px; footer có pb-28 trên mobile để thanh không che nội dung cuối trang.
 */
export function FloatingActions() {
  return (
    <>
      {/* Mobile / tablet */}
      <nav
        aria-label="Liên hệ nhanh"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-cream/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-12px_30px_-20px_rgba(43,33,24,0.4)] backdrop-blur-md lg:hidden"
      >
        <ul className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <li>
            <a href={`tel:${SITE.phone.raw}`} className="press flex min-h-12 flex-col items-center justify-center rounded-xl text-xs font-semibold text-brand transition active:bg-sand">
              <PhoneIcon width={20} height={20} />
              Gọi điện
            </a>
          </li>
          <li>
            <a
              href={SITE.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press flex min-h-12 flex-col items-center justify-center rounded-xl text-xs font-semibold text-brand transition active:bg-sand"
            >
              <ZaloIcon className="h-5 rounded-md border border-current px-1" />
              Zalo
            </a>
          </li>
          <li>
            <a href="#dat-lich" className="press flex min-h-12 flex-col items-center justify-center rounded-xl bg-brand text-xs font-semibold text-cream transition active:bg-brand-soft">
              <CalendarIcon width={20} height={20} />
              Đặt lịch
            </a>
          </li>
        </ul>
      </nav>

      {/* Desktop */}
      <ul aria-label="Liên hệ nhanh" className="fixed right-6 bottom-6 z-40 hidden flex-col gap-3 lg:flex">
        {[
          { href: `tel:${SITE.phone.raw}`, label: `Gọi ${SITE.phone.display}`, icon: <PhoneIcon width={22} height={22} />, cls: 'bg-brand text-cream' },
          { href: SITE.zaloUrl, label: 'Nhắn Zalo', icon: <ZaloIcon className="text-xs" />, cls: 'bg-cream text-brand ring-1 ring-brand/15', ext: true },
          { href: SITE.messengerUrl, label: 'Nhắn Messenger', icon: <MessengerIcon width={22} height={22} />, cls: 'bg-cream text-brand ring-1 ring-brand/15', ext: true },
        ].map((b) => (
          <li key={b.label}>
            <a
              href={b.href}
              aria-label={b.label}
              title={b.label}
              {...(b.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`press flex size-14 items-center justify-center rounded-full shadow-card hover:-translate-y-0.5 ${b.cls}`}
            >
              {b.icon}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
