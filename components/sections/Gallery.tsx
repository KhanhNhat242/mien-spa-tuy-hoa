import { SITE } from '@/lib/site-data'
import { GUEST_GALLERY, SPACE_GALLERY, SPACE_VIDEO } from '@/lib/images'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { GalleryTabs } from './GalleryTabs'

export function Gallery() {
  return (
    <Section id="khong-gian" tone="cream" labelledBy="gallery-title">
      <Container>
        <SectionHeading
          id="gallery-title"
          title="Không gian"
          desc={`Ảnh chụp tại Miên Spa, ${SITE.address.street}, Tuy Hòa – và những vị khách đã ghé.`}
        />
        <GalleryTabs space={SPACE_GALLERY} guests={GUEST_GALLERY} video={SPACE_VIDEO} />
      </Container>
    </Section>
  )
}
