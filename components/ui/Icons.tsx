import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const base = (p: P): P => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  ...p,
})

export const PhoneIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 4h3l1.5 4-2 1.2a11 11 0 0 0 5.3 5.3l1.2-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
)

export const CalendarIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2" />
  </svg>
)

export const ClockIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)

export const PinIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

export const ChatIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5Z" />
    <path d="M8.5 8.5h7M8.5 11.5h4.5" />
  </svg>
)

export const LotusIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 19c-3.5 0-7-2-8.5-5.5C6 13 8 14 9.5 15.5" />
    <path d="M12 19c3.5 0 7-2 8.5-5.5C18 13 16 14 14.5 15.5" />
    <path d="M12 19c-2.2-1.6-3.5-4-3.5-6.5S10 7 12 5c2 2 3.5 4.9 3.5 7.5S14.2 17.4 12 19Z" />
  </svg>
)

export const TeaIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 10h13v3.5A5.5 5.5 0 0 1 11.5 19h-2A5.5 5.5 0 0 1 4 13.5Z" />
    <path d="M17 11.5h1.5a2 2 0 0 1 0 4H16.5M8 3.5c-.8 1 .8 2 0 3M12 3.5c-.8 1 .8 2 0 3M4 21h13" />
  </svg>
)

export const LeafIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 19C5 10 10 5 20 4c0 9-5 15-13 15Z" />
    <path d="M5 19c3-4 6-7 10-9" />
  </svg>
)

export const SparkIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" />
  </svg>
)

export const HeartHandIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 11.5 9 8.6a2 2 0 0 1 3-2.6 2 2 0 0 1 3 2.6Z" />
    <path d="M3 16h3l4 2.5h5.5a1.5 1.5 0 0 0 0-3H12m-6 .5 5.5-3.5h3M17 15.5l3-2a1.4 1.4 0 0 1 1.8 2.1L17.5 20" />
  </svg>
)

export const CheckIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

export const ArrowRightIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const MenuIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
)

export const CloseIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const ChevronIcon = ({ dir = 'right', ...p }: P & { dir?: 'left' | 'right' }) => (
  <svg {...base(p)}>
    <path d={dir === 'right' ? 'm9 5 7 7-7 7' : 'm15 5-7 7 7 7'} />
  </svg>
)

export const FacebookIcon = (p: P) => (
  <svg {...base({ ...p, fill: 'currentColor', stroke: 'none' })}>
    <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4A20 20 0 0 0 14.3 4C12.1 4 10.5 5.4 10.5 7.9v2.6H8v3h2.5V21Z" />
  </svg>
)

export const MessengerIcon = (p: P) => (
  <svg {...base({ ...p, fill: 'currentColor', stroke: 'none' })}>
    <path d="M12 3C7 3 3 6.7 3 11.4c0 2.6 1.3 5 3.3 6.5V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.3S17 3 12 3Zm.9 11.2-2.3-2.4-4.4 2.4 4.9-5.2 2.3 2.4 4.4-2.4Z" />
  </svg>
)

/** Chữ "Zalo" dạng huy hiệu — không dùng logo thương hiệu gốc */
export const ZaloIcon = ({ className }: { className?: string }) => (
  <span aria-hidden className={`inline-flex items-center justify-center font-sans text-[10px] font-bold tracking-tight ${className ?? ''}`}>
    Zalo
  </span>
)

/** Hoạ tiết bông lúa (lấy cảm hứng từ logo) để trang trí nền */
export const RiceStalk = (p: P) => (
  <svg viewBox="0 0 120 220" fill="none" aria-hidden {...p}>
    <path d="M60 218C58 160 50 110 78 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {[
      [74, 44, -35],
      [70, 64, -30],
      [66, 86, -25],
      [62, 110, -20],
      [86, 52, 40],
      [82, 74, 35],
      [76, 98, 30],
      [70, 124, 25],
    ].map(([x, y, r], i) => (
      <ellipse
        key={i}
        cx={x}
        cy={y}
        rx="5"
        ry="13"
        transform={`rotate(${r} ${x} ${y})`}
        fill="currentColor"
      />
    ))}
    <ellipse cx="80" cy="26" rx="4.5" ry="11" transform="rotate(20 80 26)" fill="currentColor" />
  </svg>
)

/** Chiếc lá mềm — trang trí góc section */
export const SoftLeaf = (p: P) => (
  <svg viewBox="0 0 200 200" fill="none" aria-hidden {...p}>
    <path d="M20 180C30 90 90 30 185 20c-5 95-70 160-165 160Z" fill="currentColor" />
    <path d="M20 180C70 120 110 80 160 45" stroke="var(--color-cream)" strokeWidth="2" opacity=".6" />
  </svg>
)
