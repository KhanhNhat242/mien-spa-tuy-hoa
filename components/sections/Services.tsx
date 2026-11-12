import { FEATURED } from '@/lib/site-data'
import { IMG } from '@/lib/images'
import { nw, summarize } from '@/lib/format'
import { Container, Section } from '@/components/ui/Section'
import { ServiceCarousel, type ServiceSlide } from './ServiceCarousel'

/**
 * Dịch vụ chính — bố cục theo ảnh mẫu (12/11/2026): tiêu đề căn giữa, băng chuyền thẻ:
 * thẻ giữa = mô tả trái + ảnh phải; thẻ hai bên chỉ có ảnh, nhỏ dần. Cuộn trong section → thẻ tiếp theo.
 */
export function Services() {
  const slides: ServiceSlide[] = FEATURED.map((it) => {
    const { duration, price } = summarize(it.serviceIds)
    return { key: it.key, title: it.title, desc: it.desc, bookId: it.bookId, duration, price, image: IMG[it.image] }
  })

  return (
    <Section id="dich-vu" tone="cream" labelledBy="services-title">
      <Container>
        <ServiceCarousel
          slides={slides}
          heading={
            <header className="mb-8 text-center lg:mb-10">
              <h2 id="services-title" className="font-serif text-[2.4rem] leading-[1.1] tracking-[-0.01em] text-brand sm:text-5xl lg:text-[3.4rem]">
                {nw('Dịch vụ chính', 1)}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                {nw('Thời lượng và chi phí ghi rõ cho từng liệu pháp. Lướt qua để xem lần lượt từng dịch vụ.')}
              </p>
            </header>
          }
        />
      </Container>
    </Section>
  )
}
