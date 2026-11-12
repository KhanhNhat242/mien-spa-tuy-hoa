'use client'

import { useEffect } from 'react'

/**
 * Bật hiệu ứng [data-reveal] trong globals.css: thêm .is-revealed khi phần tử vào khung nhìn,
 * gỡ khi phần tử trôi lại xuống dưới (cuộn ngược) để lần sau cuộn xuống vẫn có hiệu ứng.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-revealed'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement
          if (e.isIntersecting) el.classList.add('is-revealed')
          else if (e.boundingClientRect.top > 0) el.classList.remove('is-revealed')
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}
