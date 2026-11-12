import { CATEGORIES, servicesIn } from '@/lib/site-data'
import { formatPrice, priceRows } from '@/lib/format'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { PriceBoard, type PriceGroup } from './PriceBoard'

/** Bảng giá: tiêu đề section + thanh tab nhóm + khung "price list" (PriceBoard). */
export function Pricing() {
  const groups: PriceGroup[] = CATEGORIES.map((c) => {
    const services = servicesIn(c.id)
    const prices = services.flatMap((s) => s.variants.map((x) => x.price))
    return {
      id: c.id,
      label: c.label,
      // Gợi ý khoảng giá cho tab Dịch vụ lẻ (REQUIREMENTS §6)
      hint: c.id === 'le' ? `${formatPrice(Math.min(...prices))} – ${formatPrice(Math.max(...prices))}` : undefined,
      rows: services.flatMap((s) => priceRows(s).map((r) => ({ ...r, serviceId: s.id, note: s.includes?.join(' · ') }))),
    }
  })

  return (
    <Section id="bang-gia" tone="cream" size="lg" labelledBy="pricing-title">
      <Container>
        <SectionHeading
          id="pricing-title"
          title="Bảng giá"
          desc="Chọn nhóm dịch vụ để xem thời lượng và chi phí. Bấm vào một dòng để đặt lịch dịch vụ đó."
        />
        <PriceBoard groups={groups} />
      </Container>
    </Section>
  )
}
