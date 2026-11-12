'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { NAV, SITE } from '@/lib/site-data'
import { IMG } from '@/lib/images'
import { CloseIcon, MenuIcon, PhoneIcon } from '@/components/ui/Icons'
import { btn } from '@/components/ui/styles'

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)

  // Scroll-spy: tô đậm mục menu của section đang xem
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive('#' + e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-sand bg-cream/90 backdrop-blur-md transition-shadow ${scrolled ? 'shadow-[0_8px_30px_-18px_rgba(43,33,24,0.35)]' : ''}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label={`${SITE.fullName} – về đầu trang`}>
          <Image src={IMG.logo} alt={`Logo ${SITE.name}`} className="h-11 w-auto lg:h-14" sizes="80px" preload />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-serif text-xl text-brand">{SITE.name}</span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-sage">Tuy Hòa</span>
          </span>
        </a>

        <nav aria-label="Điều hướng chính" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${active === n.href ? 'text-brand' : 'text-ink-soft hover:text-brand'}`}
                >
                  {n.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-4 -bottom-0.5 h-px origin-center bg-brand transition-transform duration-300 ${active === n.href ? 'scale-x-100' : 'scale-x-0'}`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.phone.raw}`}
            className="hidden items-center gap-2 px-3 text-sm font-semibold text-brand xl:inline-flex"
          >
            <PhoneIcon width={18} height={18} />
            {SITE.phone.display}
          </a>
          <a href="#dat-lich" className={`${btn.primary} hidden min-h-11 sm:inline-flex`}>
            Đặt lịch
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-brand transition hover:bg-sand lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden border-t border-sand bg-cream transition-[grid-template-rows] duration-300 lg:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] border-transparent'}`}
      >
        <nav aria-label="Điều hướng di động" className="min-h-0">
          <ul className="px-4 py-3 sm:px-6">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className={`flex min-h-12 items-center border-b border-sand font-serif text-lg ${active === n.href ? 'text-brand' : 'text-ink'}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <a href="#dat-lich" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className={`${btn.primary} w-full`}>
                Đặt lịch ngay
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
