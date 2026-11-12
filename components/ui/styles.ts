/** Class dùng chung cho nút (không đặt trong file 'use client' để server component dùng được) */
export const btn = {
  primary:
    'inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand px-6 text-sm font-semibold text-cream shadow-[0_10px_30px_-12px_rgba(99,56,26,0.7)] transition hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
  outline:
    'inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-brand/30 bg-cream/60 px-6 text-sm font-semibold text-brand transition hover:border-brand hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
  light:
    'inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-cream px-6 text-sm font-semibold text-brand transition hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream',
  ghost:
    'inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand underline-offset-4 transition hover:text-brand-soft hover:underline',
}

export const BOOK_EVENT = 'mien:book'
export type BookDetail = { serviceId: string; variantId?: string }
