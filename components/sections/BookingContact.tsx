import { SITE } from '@/lib/site-data'
import { nw } from '@/lib/format'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { ClockIcon, FacebookIcon, PhoneIcon, PinIcon, ArrowRightIcon } from '@/components/ui/Icons'
import { btn } from '@/components/ui/styles'
import { BookingForm } from './BookingForm'

export function BookingContact() {
  const info = [
    { icon: PinIcon, label: 'Địa chỉ', value: SITE.address.full, href: SITE.mapsUrl },
    { icon: PhoneIcon, label: 'Hotline / Zalo', value: SITE.phone.display, href: `tel:${SITE.phone.raw}` },
    { icon: ClockIcon, label: 'Giờ mở cửa', value: `${SITE.hours.open} – ${SITE.hours.close} (${SITE.hours.days})` },
  ]

  return (
    <Section id="lien-he" tone="cream" size="lg" labelledBy="booking-title">
      <Container>
        <SectionHeading
          id="booking-title"
          title="Đặt lịch & liên hệ"
          desc="Gọi, nhắn Zalo hoặc để lại thông tin trong form – chọn cách nào tiện cho bạn."
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Form đặt lịch */}
          <div
            id="dat-lich"
            data-reveal="up"
            className="scroll-mt-24 rounded-3xl bg-cream p-6 shadow-lift sm:p-8 lg:col-span-7 lg:p-10"
          >
            <h3 className="sr-only">Form đặt lịch</h3>
            <p id="bk-intro" className="mb-7 font-serif text-xl leading-snug text-brand sm:text-2xl">
              {nw(
                `Để lại thông tin, ${SITE.name} sẽ gọi lại xác nhận giờ và dịch vụ trước khi bạn đến.`,
              )}
            </p>
            <BookingForm />
          </div>

          {/* Liên hệ & bản đồ */}
          <div data-reveal="right" className="flex flex-col gap-6 lg:col-span-5">
            <ul className="space-y-4">
              {info.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand/15 text-brand">
                      <Icon width={22} height={22} />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-sage">{label}</span>
                      <span className="mt-1 block font-medium leading-snug text-ink">{nw(value)}</span>
                    </span>
                  </>
                )
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-cream/60"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-2">{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className={btn.primary}>
                <PinIcon width={18} height={18} />
                Chỉ đường Google Maps
              </a>
              <a href={SITE.facebookUrl} target="_blank" rel="noopener noreferrer" className={btn.outline}>
                <FacebookIcon width={18} height={18} />
                Fanpage
                <ArrowRightIcon width={16} height={16} />
              </a>
            </div>

            <div className="relative min-h-64 flex-1 overflow-hidden rounded-3xl bg-cream ring-1 ring-brand/10">
              {/* Nền chờ khi bản đồ chưa tải */}
              <div aria-hidden className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-ink-soft">
                <PinIcon width={28} height={28} className="text-brand" />
                <span className="text-sm">{nw(SITE.address.full)}</span>
              </div>
              <iframe
                title={`Bản đồ đường đến ${SITE.fullName}`}
                src={SITE.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0 grayscale-[30%] sepia-[15%]"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
