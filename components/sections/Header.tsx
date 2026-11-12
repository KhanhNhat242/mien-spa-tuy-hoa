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
  // Đang trong phạm vi Hero → ẩn nút gọi/đặt lịch, menu dồn sang phải
  const [inHero, setInHero] = useState(true)

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
    const hero = document.getElementById('top')
    // rootMargin trừ chiều cao header: Hero coi như đã qua khi mép dưới chạm đáy header
    const heroIo = new IntersectionObserver(([e]) => setInHero(e.isIntersecting), { rootMargin: '-80px 0px 0px 0px' })
    if (hero) heroIo.observe(hero)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      heroIo.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    // Menu mobile đang mở → khoá cuộn trang (chừa bề rộng thanh cuộn để trang không bị giật ngang)
    const html = document.documentElement
    const gap = window.innerWidth - html.clientWidth
    const prev = { overflow: html.style.overflow, paddingRight: html.style.paddingRight }
    html.style.overflow = 'hidden'
    if (gap > 0) html.style.paddingRight = `${gap}px`
    // Lên desktop (menu mobile ẩn) thì tự đóng để không giữ khoá cuộn
    const mq = window.matchMedia('(min-width: 1024px)')
    const onMq = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
      html.style.overflow = prev.overflow
      html.style.paddingRight = prev.paddingRight
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-sand bg-cream/90 backdrop-blur-md transition-shadow ${scrolled ? 'shadow-soft' : ''}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-0 px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label={`${SITE.fullName} – về đầu trang`}>
          <Image src={IMG.logo} alt={`Logo ${SITE.name}`} className="h-11 w-auto lg:h-14" sizes="80px" preload />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-serif text-xl text-brand">{SITE.name}</span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-sage">Tuy Hòa</span>
          </span>
        </a>

        {/* Hai khoảng đệm co giãn: ngoài Hero cả hai grow → menu ở giữa; trong Hero đệm phải về 0 → menu dồn phải */}
        <div aria-hidden className="flex-1" />

        <nav aria-label="Điều hướng chính" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`relative inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors ${active === n.href ? 'text-brand' : 'text-ink-soft hover:text-brand'}`}
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

        <div
          aria-hidden
          className={`hidden transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none lg:block ${inHero ? 'grow-0' : 'grow'}`}
        />

        <div className="flex items-center gap-2">
          {/* Nút gọi + đặt lịch (chỉ desktop — mobile đã có trong menu & thanh liên hệ dưới): thu về 0 khi đang ở Hero (animation max-width → menu trượt giữa ↔ phải) */}
          <div
            inert={inHero}
            className={`-my-3 hidden overflow-hidden py-3 transition-[max-width,opacity] lg:block duration-500 ease-out motion-reduce:transition-none ${
              inHero ? 'max-w-0 opacity-0' : 'max-w-[22rem] opacity-100'
            }`}
          >
            <div className="flex w-max items-center gap-2 pl-4">
              <a
                href={`tel:${SITE.phone.raw}`}
                className="hidden shrink-0 items-center gap-2 px-3 text-sm font-semibold whitespace-nowrap text-brand xl:inline-flex"
              >
                <PhoneIcon width={18} height={18} />
                {SITE.phone.display}
              </a>
              <a href="#dat-lich" className={`${btn.primary} hidden min-h-11 shrink-0 whitespace-nowrap lg:inline-flex`}>
                Đặt lịch
              </a>
            </div>
          </div>
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
