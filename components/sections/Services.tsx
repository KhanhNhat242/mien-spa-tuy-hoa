import Image from 'next/image'
import { FEATURED } from '@/lib/site-data'
import { IMG } from '@/lib/images'
import { nw, summarize } from '@/lib/format'
import { Container, Section, SectionHeading, revealDelay } from '@/components/ui/Section'
import { BookButton } from '@/components/ui/BookButton'
import { ArrowRightIcon, ClockIcon } from '@/components/ui/Icons'

type Item = (typeof FEATURED)[number]

function ServiceCard({ item, spotlight, index, wide }: { item: Item; spotlight?: boolean; index: number; wide?: boolean }) {
  const { duration, price } = summarize(item.serviceIds)
  return (
    <article
      data-reveal="up"
      style={revealDelay((index % 3) * 120)}
      className={`group flex h-full ${wide ? 'md:col-span-2 lg:col-span-1' : ''} flex-col overflow-hidden rounded-[1.75rem] bg-cream shadow-[0_24px_60px_-40px_rgba(43,33,24,0.5)] ring-1 ring-sand transition duration-500 hover:-translate-y-1 hover:shadow-[0_36px_70px_-40px_rgba(99,56,26,0.55)]`}
    >
      <div className={`relative overflow-hidden ${spotlight ? 'aspect-[16/10]' : wide ? 'aspect-[4/3] md:aspect-[21/9] lg:aspect-[4/3]' : 'aspect-[4/3]'}`}>
        <Image
          src={IMG[item.image]}
          alt={item.title}
          fill
          sizes={spotlight ? '(min-width: 1024px) 600px, 100vw' : '(min-width: 768px) 400px, 100vw'}
          placeholder="blur"
          className="reveal-zoom object-cover"
        />
        <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-brand backdrop-blur">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${spotlight ? 'p-7 lg:p-8' : 'p-6 lg:p-7'}`}>
        <h3 className={`font-serif leading-snug text-brand ${spotlight ? 'text-2xl lg:text-[1.75rem]' : 'text-xl lg:text-2xl'}`}>
          {nw(item.title, 1)}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          {duration && (
            <span className="inline-flex items-center gap-1.5 text-ink-soft">
              <ClockIcon width={16} height={16} className="text-sage" />
              {duration}
            </span>
          )}
          <span className="font-semibold text-sage">{price}</span>
        </div>

        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{nw(item.desc)}</p>

        <BookButton
          serviceId={item.bookId}
          ariaLabel={`Đặt lịch ${item.title}`}
          className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-brand/25 px-5 text-sm font-semibold text-brand transition group-hover:border-brand group-hover:bg-brand group-hover:text-cream"
        >
          Đặt lịch
          <ArrowRightIcon width={16} height={16} />
        </BookButton>
      </div>
    </article>
  )
}

export function Services() {
  const top = FEATURED.slice(0, 2)
  const bottom = FEATURED.slice(2)
  return (
    <Section id="dich-vu" tone="cream" size="lg" labelledBy="services-title">
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow="Dịch vụ nổi bật"
          title="Năm liệu pháp thư giãn tại Miên"
          desc="Mỗi liệu trình được tư vấn theo tình trạng cơ thể của bạn, với thời lượng và chi phí rõ ràng ngay từ đầu."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {top.map((it, i) => (
            <ServiceCard key={it.key} item={it} spotlight index={i} />
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-8">
          {bottom.map((it, i) => (
            <ServiceCard key={it.key} item={it} index={i + 2} wide={i === bottom.length - 1} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
