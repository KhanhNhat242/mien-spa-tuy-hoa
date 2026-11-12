'use client'

import type { ReactNode } from 'react'

import { BOOK_EVENT, type BookDetail } from './styles'

/** Nút "Đặt lịch": cuộn tới form và điền sẵn dịch vụ (BookingForm lắng nghe BOOK_EVENT). */
export function BookButton({
  serviceId,
  variantId,
  className = '',
  children,
  ariaLabel,
}: {
  serviceId?: string
  variantId?: string
  className?: string
  children: ReactNode
  ariaLabel?: string
}) {
  return (
    <a
      href="#dat-lich"
      aria-label={ariaLabel}
      className={className}
      onClick={() => {
        if (serviceId) {
          window.dispatchEvent(new CustomEvent<BookDetail>(BOOK_EVENT, { detail: { serviceId, variantId } }))
        }
      }}
    >
      {children}
    </a>
  )
}
