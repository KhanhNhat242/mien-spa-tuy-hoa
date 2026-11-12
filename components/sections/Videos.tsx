import { SPA_VIDEOS } from '@/lib/images'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { VideoGallery } from './VideoGallery'

/**
 * Video thực tế tại Miên Spa — 7 video dọc: desktop hàng 1 bốn video, hàng 2 ba video (căn giữa);
 * mobile cuộn ngang. Nền tối `ink` để video nổi bật và giữ nhịp xen kẽ nền giữa Quy trình (sand) và Liên hệ (cream).
 */
export function Videos() {
  return (
    <Section id="video" tone="ink" labelledBy="video-title">
      <Container>
        <SectionHeading
          id="video-title"
          tone="dark"
          title="Video thực tế tại Miên Spa"
          desc="Không gian, gội đầu dưỡng sinh, massage cổ vai gáy và body được quay ngay tại spa. Bấm vào video để xem lớn."
        />
        <VideoGallery videos={SPA_VIDEOS} />
      </Container>
    </Section>
  )
}
