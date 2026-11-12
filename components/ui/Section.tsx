import type { CSSProperties, ReactNode } from 'react'
import { nw } from '@/lib/format'

export type Tone = 'cream' | 'sand' | 'ink'

const toneClass: Record<Tone, string> = {
  cream: 'bg-cream',
  // Nature Distilled: nền sand phủ lớp giấy kraft rất nhẹ
  sand: 'bg-sand paper-grain',
  ink: 'bg-ink',
}

const fillClass: Record<Tone, string> = {
  cream: 'text-cream',
  sand: 'text-sand',
  ink: 'text-ink',
}

/**
 * Organic Biophilic: đường cong sóng mềm ở mép trên section, tô bằng màu của section phía trên
 * → hai nền "chảy" vào nhau thay vì cắt thẳng. `flip` đảo chiều để các sóng không lặp lại.
 */
export function Wave({ from, flip = false }: { from: Tone; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 top-0 h-6 w-full md:h-10 lg:h-14 ${fillClass[from]} ${flip ? '-scale-x-100' : ''}`}
    >
      <path
        fill="currentColor"
        d="M0 0h1440v22c-120 18-260 34-420 30-170-4-260-34-420-34S330 44 190 46C110 47 50 40 0 32Z"
      />
    </svg>
  )
}

/** Khung section chuẩn: nền xen kẽ + khoảng cách dọc py-14 / md:py-16 / lg:py-24|28 + sóng nối */
export function Section({
  id,
  tone = 'cream',
  size = 'md',
  className = '',
  children,
  labelledBy,
  waveFrom,
  waveFlip,
}: {
  id?: string
  tone?: Tone
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: ReactNode
  labelledBy?: string
  /** Màu của section phía trên để vẽ đường cong nối */
  waveFrom?: Tone
  waveFlip?: boolean
}) {
  const pad = size === 'lg' ? 'lg:py-28' : size === 'sm' ? 'lg:py-20' : 'lg:py-24'
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative overflow-clip py-14 md:py-16 ${pad} ${toneClass[tone]} ${className}`}
    >
      {waveFrom && <Wave from={waveFrom} flip={waveFlip} />}
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
    <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${color} ${className}`}>{nw(children, 1)}</p>
  )
}

/**
 * Tiêu đề section kiểu trang menu giấy của spa: H2 serif căn trái, mô tả ngắn bên phải (desktop),
 * kẻ một đường mảnh bên dưới. Không eyebrow lặp lại tiêu đề, không căn giữa đồng loạt.
 */
export function SectionHeading({
  id,
  title,
  desc,
  tone = 'light',
  rule = true,
  className = '',
}: {
  id?: string
  title: string
  desc?: string
  tone?: 'light' | 'dark'
  /** Đường kẻ dưới tiêu đề — tắt khi nội dung ngay bên dưới đã có đường kẻ riêng */
  rule?: boolean
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <div
      className={`mb-10 grid gap-4 lg:mb-14 ${rule ? 'border-b pb-8' : ''} lg:grid-cols-12 lg:items-end lg:gap-8 ${dark ? 'border-cream/15' : 'border-brand/15'} ${className}`}
    >
      <h2
        id={id}
        className={`font-serif text-[2.1rem] leading-[1.1] sm:text-5xl lg:col-span-7 lg:text-[3.5rem] ${dark ? 'text-cream' : 'text-brand'}`}
      >
        {nw(title, 1)}
      </h2>
      {desc && (
        <p className={`max-w-md text-base leading-relaxed lg:col-span-5 lg:justify-self-end ${dark ? 'text-sand/85' : 'text-ink-soft'}`}>
          {nw(desc)}
        </p>
      )}
    </div>
  )
}

/** Độ trễ hiệu ứng data-reveal (stagger) */
export const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties
