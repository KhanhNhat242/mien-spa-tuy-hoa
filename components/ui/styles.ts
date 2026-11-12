/**
 * Class dùng chung (không đặt trong file 'use client' để server component dùng được).
 * Nút có `.press` (micro-interaction khi nhấn) + focus ring 3px toàn cục trong globals.css.
 */
export const btn = {
  primary:
    'press inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand px-6 text-sm font-semibold text-cream shadow-card hover:-translate-y-0.5 hover:bg-brand-soft hover:shadow-lift',
  outline:
    'press inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-brand/30 bg-cream/60 px-6 text-sm font-semibold text-brand hover:border-brand hover:bg-cream',
  light:
    'press inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-cream px-6 text-sm font-semibold text-brand hover:-translate-y-0.5 hover:bg-sand',
  ghost:
    'press inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand underline-offset-4 hover:text-brand-soft hover:underline',
}

/** Thẻ (card) chuẩn: bo 24px, nền kem, bóng mềm ánh nâu */
export const card = 'rounded-3xl bg-cream shadow-card ring-1 ring-brand/5'

export const BOOK_EVENT = 'mien:book'
export type BookDetail = { serviceId: string; variantId?: string }
