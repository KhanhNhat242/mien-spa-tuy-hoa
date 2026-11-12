import { PROCESS_STEPS } from '@/lib/site-data'
import { nw } from '@/lib/format'
import { Container, Section, SectionHeading, revealDelay } from '@/components/ui/Section'
import { CalendarIcon, ChatIcon, LotusIcon, PhoneIcon, TeaIcon } from '@/components/ui/Icons'

const ICONS = { calendar: CalendarIcon, phone: PhoneIcon, chat: ChatIcon, lotus: LotusIcon, tea: TeaIcon }

export function Process() {
  return (
    <Section id="quy-trinh" tone="sand" size="sm" labelledBy="process-title">
      <Container>
        <SectionHeading
          id="process-title"
          eyebrow="Quy trình"
          title="Năm bước trải nghiệm tại Miên"
          desc="Từ lúc đặt lịch đến khi nhâm nhi tách trà ấm, mọi bước đều nhẹ nhàng và rõ ràng."
        />

        <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
          {/* Đường nối nét đứt: dọc trên mobile, ngang trên desktop */}
          <span
            aria-hidden
            className="absolute top-8 bottom-8 left-8 border-l-2 border-dashed border-brand/20 lg:top-8 lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:border-t-2 lg:border-l-0"
          />
          {PROCESS_STEPS.map((s, i) => {
            const Icon = ICONS[s.icon]
            return (
              <li
                key={s.title}
                data-reveal="up"
                style={revealDelay(i * 120)}
                className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:text-center"
              >
                <span className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full bg-cream text-brand shadow-[0_14px_30px_-18px_rgba(99,56,26,0.6)] ring-4 ring-sand">
                  <Icon width={26} height={26} />
                  <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-sage text-[11px] font-bold text-cream">
                    {i + 1}
                  </span>
                </span>
                <div className="pt-2 lg:pt-5">
                  <h3 className="font-serif text-xl leading-snug text-brand">{nw(s.title, 1)}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft lg:mx-auto lg:max-w-[14rem]">{nw(s.desc)}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </Container>
    </Section>
  )
}
