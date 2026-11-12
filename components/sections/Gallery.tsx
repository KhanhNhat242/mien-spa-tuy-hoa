import { GUEST_GALLERY, SPACE_GALLERY, SPACE_VIDEO } from '@/lib/images'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { RiceStalk } from '@/components/ui/Icons'
import { GalleryTabs } from './GalleryTabs'

export function Gallery() {
  return (
    <Section id="khong-gian" tone="cream" labelledBy="gallery-title">
      <RiceStalk aria-hidden className="deco-float pointer-events-none absolute top-10 left-[4%] hidden h-44 text-sage/15 lg:block" />
      <RiceStalk aria-hidden className="deco-float pointer-events-none absolute top-16 right-[5%] hidden h-36 -scale-x-100 text-brand/10 lg:block" />
      <Container>
        <SectionHeading
          id="gallery-title"
          eyebrow="Không gian Miên Spa"
          title="Một góc ấm áp để bạn trở về"
          desc="Gỗ mộc, cây xanh và ánh đèn dịu – cùng những khoảnh khắc thật của khách tại Miên."
        />
        <GalleryTabs space={SPACE_GALLERY} guests={GUEST_GALLERY} video={SPACE_VIDEO} />
      </Container>
    </Section>
  )
}
