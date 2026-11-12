import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { ProcessPath } from './ProcessPath'

/**
 * Một buổi tại Miên — 5 bước theo bố cục infographic: đường chấm uốn lượn nối 5 vòng tròn icon.
 * Hover/chạm vào bước → đường tiến trình chạy tới bước đó + vòng ngoài icon đổi màu (ProcessPath).
 */
export function Process() {
  return (
    <Section id="quy-trinh" tone="sand" size="sm" labelledBy="process-title">
      <Container>
        <SectionHeading
          id="process-title"
          title="Một buổi tại Miên"
          desc="Từ lúc đặt lịch đến tách trà gừng sau liệu trình. Chọn từng bước để xem hành trình."
        />
        <ProcessPath />
      </Container>
    </Section>
  )
}
