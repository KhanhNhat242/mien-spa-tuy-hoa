import Image from 'next/image'
import { CATEGORIES, SITE, servicesIn } from '@/lib/site-data'
import { IMG } from '@/lib/images'
import { formatPrice, nw, priceRows } from '@/lib/format'
import { Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Section'
import { ArrowRightIcon } from '@/components/ui/Icons'
import { btn } from '@/components/ui/styles'
import { PriceTabs, type PriceTab } from './PriceTabs'

function buildTabs(): PriceTab[] {
  return CATEGORIES.map((c) => {
    const services = servicesIn(c.id)
    const rows = services.flatMap((s) =>
      priceRows(s).map((r) => ({
        ...r,
        serviceId: s.id,
        note: s.includes?.join(' · '),
      })),
    )
    let hint: string | undefined
    if (c.id === 'le') {
      const prices = services.flatMap((s) => s.variants.map((x) => x.price))
      hint = `${formatPrice(Math.min(...prices))} – ${formatPrice(Math.max(...prices))}`
    }
    return { id: c.id, label: c.label, hint, rows }
  })
}

export function Pricing() {
  return (
    <Section id="bang-gia" tone="cream" size="lg" labelledBy="pricing-title">
      <Container>
        <SectionHeading
          id="pricing-title"
          eyebrow="Bảng giá"
          title="Bảng giá dịch vụ rõ ràng, dễ chọn"
          desc="Chọn nhóm dịch vụ để xem nhanh thời lượng và chi phí từng liệu trình tại Miên Spa."
        />

        <PriceTabs tabs={buildTabs()} />

        {/* Banner Phiếu Quà Tặng */}
        <div
          data-reveal="up"
          className="mx-auto mt-14 grid max-w-4xl items-center gap-6 overflow-hidden rounded-[2rem] bg-sand p-4 sm:grid-cols-[200px_1fr] sm:gap-8 sm:p-5 lg:mt-16"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] sm:aspect-[4/5]">
            <Image
              src={IMG.giftVoucher}
              alt="Phiếu Quà Tặng (Gift Voucher) của Miên Spa"
              fill
              sizes="(min-width: 640px) 200px, 100vw"
              placeholder="blur"
              className="object-cover object-[50%_45%]"
            />
          </div>
          <div className="px-2 pb-3 sm:px-0 sm:pr-6 sm:pb-0">
            <Eyebrow tone="soft">Phiếu Quà Tặng</Eyebrow>
            <p className="mt-3 font-serif text-2xl leading-snug text-brand">{nw('Gửi trao sự thư giãn', 1)}</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
              {nw(
                `${SITE.name} có phát hành Phiếu Quà Tặng (Gift Voucher) tinh tế để bạn gửi trao sự thư giãn đến người thân yêu.`,
              )}
            </p>
            <a href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer" className={`${btn.ghost} mt-3`}>
              Hỏi về Phiếu Quà Tặng qua Zalo
              <ArrowRightIcon width={16} height={16} />
            </a>
          </div>
        </div>
      </Container>
    </Section>
  )
}
