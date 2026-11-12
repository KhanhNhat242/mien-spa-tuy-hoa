import { IDEAL_FOR, SITE, USPS } from '@/lib/site-data'
import { nw } from '@/lib/format'
import { Container, Eyebrow, Section, revealDelay } from '@/components/ui/Section'
import { CheckIcon, HeartHandIcon, LotusIcon, SoftLeaf, SparkIcon, ChatIcon } from '@/components/ui/Icons'

const USP_ICONS = [LotusIcon, ChatIcon, SparkIcon, HeartHandIcon]

export function About() {
  return (
    <Section id="gioi-thieu" tone="sand" labelledBy="about-title">
      <SoftLeaf aria-hidden className="deco-float pointer-events-none absolute -top-10 -right-16 hidden w-64 text-sage/10 md:block" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Câu chuyện + đối tượng phù hợp */}
          <div data-reveal="left">
            <Eyebrow>Về Miên Spa</Eyebrow>
            <h2 id="about-title" className="mt-4 font-serif text-3xl leading-tight text-brand sm:text-4xl lg:text-[2.75rem]">
              {nw('Cuối Tuần Là Để Yêu Bản Thân!', 1)}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {nw(
                `${SITE.fullName} là góc thư giãn giữa lòng Tuy Hòa, nơi bạn tạm gác bộn bề để được chăm sóc cơ thể trong không gian ấm áp, gần gũi thiên nhiên.`,
              )}
            </p>

            <div className="mt-8 rounded-3xl border-l-4 border-sage bg-cream/70 p-6 sm:p-7">
              <p className="font-serif text-xl text-brand">{nw('Liệu trình lý tưởng dành cho', 1)}</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {IDEAL_FOR.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[0.95rem] leading-snug text-ink">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage text-cream">
                      <CheckIcon width={12} height={12} strokeWidth={2.4} />
                    </span>
                    {nw(t)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4 USP */}
          <ul className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {USPS.map((u, i) => {
              const Icon = USP_ICONS[i]
              return (
                <li
                  key={u.title}
                  data-reveal="up"
                  style={revealDelay(i * 110)}
                  className={`rounded-3xl bg-cream p-7 shadow-[0_20px_50px_-35px_rgba(43,33,24,0.45)] ring-1 ring-brand/5 ${i % 2 === 1 ? 'sm:translate-y-8' : ''}`}
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-sand text-brand">
                    <Icon width={24} height={24} />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-brand">{nw(u.title, 1)}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{nw(u.desc)}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
