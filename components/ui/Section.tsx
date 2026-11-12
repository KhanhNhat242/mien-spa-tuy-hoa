import type { CSSProperties, ReactNode } from 'react'
import { nw } from '@/lib/format'

type Tone = 'cream' | 'sand'

const toneClass: Record<Tone, string> = {
  cream: 'bg-cream',
  sand: 'bg-sand',
}

/** Khung section chuẩn: nền xen kẽ + khoảng cách dọc py-14 / md:py-16 / lg:py-24|28 */
export function Section({
  id,
  tone = 'cream',
  size = 'md',
  className = '',
  children,
  labelledBy,
}: {
  id?: string
  tone?: Tone
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: ReactNode
  labelledBy?: string
}) {
  const pad = size === 'lg' ? 'lg:py-28' : size === 'sm' ? 'lg:py-20' : 'lg:py-24'
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative overflow-hidden py-14 md:py-16 ${pad} ${toneClass[tone]} ${className}`}
    >
      {children}
    </section>
  )
}

export function Container({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

export function Eyebrow({ children, tone = 'sage', className = '' }: { children: string; tone?: 'sage' | 'soft' | 'light'; className?: string }) {
  const color = tone === 'sage' ? 'text-sage' : tone === 'soft' ? 'text-brand-soft' : 'text-sand'
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${color} ${className}`}>
      <span aria-hidden className="h-px w-6 bg-current opacity-60" />
      {nw(children, 1)}
    </p>
  )
}

/** Cụm tiêu đề section: Eyebrow + H2 serif + mô tả (max-w-2xl) — cách nội dung mb-12/16 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  desc,
  align = 'center',
  className = '',
}: {
  id?: string
  eyebrow: string
  title: string
  desc?: string
  align?: 'center' | 'left'
  className?: string
}) {
  const center = align === 'center'
  return (
    <div className={`mb-12 lg:mb-16 ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'} ${className}`} data-reveal="up">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-4 font-serif text-3xl leading-tight text-brand sm:text-4xl lg:text-[2.75rem]">
        {nw(title, 1)}
      </h2>
      {desc && <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{nw(desc)}</p>}
    </div>
  )
}

/** Độ trễ hiệu ứng data-reveal (stagger) */
export const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties
