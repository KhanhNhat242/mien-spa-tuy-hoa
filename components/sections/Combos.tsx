import Image from 'next/image'
import { COMBO_STEPS, servicesIn } from '@/lib/site-data'
import { COMBO_STEP_IMAGES } from '@/lib/images'
import { nw, summarize } from '@/lib/format'
import { Container, Section, SectionHeading, revealDelay } from '@/components/ui/Section'
import { BookButton } from '@/components/ui/BookButton'
import { ArrowRightIcon, ClockIcon, RiceStalk, SparkIcon } from '@/components/ui/Icons'
import { btn } from '@/components/ui/styles'

export function Combos() {
  const combos = servicesIn('combo')
  const vip = combos.find((c) => c.highlight)!
  const others = combos.filter((c) => !c.highlight)
  const vipSum = summarize([vip.id])

  return (
    <Section id="combo" tone="sand" labelledBy="combo-title">
      <Container>
        <SectionHeading
          id="combo-title"
          eyebrow="Gói combo"
          title="Combo trọn gói cho một ngày thật chậm"
          desc="Kết hợp nhiều liệu pháp trong một lần ghé, để cơ thể và tinh thần được thả lỏng trọn vẹn từ đầu đến chân."
        />

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Spotlight: Combo Chuyên Sâu */}
          <article
            data-reveal="left"
            className="relative flex flex-col overflow-hidden rounded-[2rem] bg-brand p-7 text-cream shadow-[0_40px_80px_-40px_rgba(99,56,26,0.8)] sm:p-10 lg:col-span-7"
          >
            <RiceStalk aria-hidden className="deco-float pointer-events-none absolute -top-4 right-4 h-48 text-cream/10" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-sage/30 blur-3xl" />

            <div className="relative flex flex-1 flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cream/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-sand ring-1 ring-cream/20">
                <SparkIcon width={14} height={14} />
                {nw('Trải nghiệm VVIP cuối tuần', 1)}
              </span>
              <div className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                <h3 className="font-serif text-3xl leading-tight sm:text-4xl">{nw(vip.name, 1)}</h3>
                <p className="flex items-baseline gap-3">
                  <span className="inline-flex items-center gap-1.5 text-sm text-sand/80">
                    <ClockIcon width={16} height={16} />
                    {vipSum.duration}
                  </span>
                  <span className="font-serif text-3xl text-cream sm:text-4xl">{vipSum.price}</span>
                </p>
              </div>

              {/* Timeline 4 bước */}
              <ol className="relative mt-8 mb-9 space-y-5 before:absolute before:top-4 before:bottom-4 before:left-8 before:w-px before:border-l before:border-dashed before:border-cream/30 sm:before:left-10">
                {COMBO_STEPS.map((s, i) => (
                  <li key={s.title} className="relative flex items-center gap-4 sm:gap-5">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl ring-2 ring-cream/25 sm:size-20">
                      <Image src={COMBO_STEP_IMAGES[i]} alt={s.title} fill sizes="80px" className="object-cover" />
                      <span className="absolute bottom-1 left-1 flex size-6 items-center justify-center rounded-full bg-sage text-[11px] font-bold text-cream">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-serif text-lg leading-snug text-cream">{nw(s.title, 1)}</p>
                      <p className="mt-1 text-sm leading-relaxed text-sand/80">{nw(s.desc)}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <BookButton serviceId={vip.id} className={`${btn.light} w-fit lg:mt-auto`}>
                Đặt Combo Chuyên Sâu
                <ArrowRightIcon width={18} height={18} />
              </BookButton>
            </div>
          </article>

          {/* 3 combo còn lại */}
          <div className="grid gap-6 lg:col-span-5 lg:grid-rows-3">
            {others.map((c, i) => {
              const sum = summarize([c.id])
              return (
                <article
                  key={c.id}
                  data-reveal="right"
                  style={revealDelay(i * 120)}
                  className="flex flex-col justify-between gap-4 rounded-[1.75rem] bg-cream p-6 shadow-[0_20px_50px_-35px_rgba(43,33,24,0.45)] ring-1 ring-brand/5 sm:p-7"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-xl leading-snug text-brand sm:text-2xl">{nw(c.name, 1)}</h3>
                      <p className="shrink-0 text-right">
                        <span className="block font-semibold text-sage">{sum.price}</span>
                        <span className="block text-xs text-ink-soft">{sum.duration}</span>
                      </p>
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {c.includes!.map((x) => (
                        <li key={x} className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink-soft">
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <BookButton serviceId={c.id} ariaLabel={`Chọn ${c.name}`} className={`${btn.ghost} w-fit`}>
                    Chọn combo này
                    <ArrowRightIcon width={16} height={16} />
                  </BookButton>
                </article>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
