'use client'

import Image from 'next/image'
import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { SITE, type CategoryId } from '@/lib/site-data'
import { IMG, PRICE_PANELS } from '@/lib/images'
import { nw } from '@/lib/format'
import { ArrowRightIcon } from '@/components/ui/Icons'
import { BookButton } from '@/components/ui/BookButton'

export type PriceRow = { name: string; duration: string; price: string; note?: string; serviceId: string }
export type PriceGroup = { id: CategoryId; label: string; hint?: string; rows: PriceRow[] }

/**
 * Thanh tab nhóm dịch vụ + khung "price list" theo ảnh mẫu:
 * trái = ảnh riêng của nhóm, giữ nguyên màu gốc (đổi theo tab); phải = trang menu (logo, tiêu đề nhóm in hoa + đường kẻ,
 * dòng "tên ····· giá" + ghi chú, thanh địa chỉ). Bấm tab → khung phải hiển thị nhóm đó.
 * Mỗi dòng bấm được → điền sẵn dịch vụ vào form đặt lịch.
 */
export function PriceBoard({ groups }: { groups: PriceGroup[] }) {
  const [active, setActive] = useState(0)
  const base = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const g = groups[active]
  const panel = PRICE_PANELS[g.id]

  // Chọn tab + cuộn ngang thanh tab để tab đang chọn luôn nằm giữa (mobile), không cuộn dọc trang
  const select = (i: number) => {
    setActive(i)
    const el = refs.current[i]
    const bar = el?.parentElement
    if (el && bar && bar.scrollWidth > bar.clientWidth) {
      bar.scrollTo({ left: el.offsetLeft - (bar.clientWidth - el.clientWidth) / 2, behavior: 'smooth' })
    }
  }

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (active + dir + groups.length) % groups.length
    select(next)
    refs.current[next]?.focus({ preventScroll: true })
  }

  return (
    <div>
      {/* Thanh tab */}
      <div
        role="tablist"
        aria-label="Nhóm dịch vụ"
        className="no-scrollbar relative -mx-4 mb-8 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 lg:mb-10"
      >
        {groups.map((t, i) => {
          const selected = i === active
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              role="tab"
              type="button"
              id={`${base}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${base}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={onKey}
              className={`press min-h-11 shrink-0 snap-start rounded-full px-5 text-sm font-semibold whitespace-nowrap ${selected ? 'bg-brand text-cream shadow-soft' : 'bg-sand text-ink-soft hover:text-brand'
                }`}
            >
              {t.label}
              {t.hint && <span className={`ml-1.5 font-normal ${selected ? 'text-sand/85' : 'text-ink-soft/80'}`}>({t.hint})</span>}
            </button>
          )
        })}
      </div>

      {/* Khung price list */}
      <div className="overflow-clip rounded-3xl shadow-card ring-1 ring-brand/10 lg:grid lg:min-h-[680px] lg:grid-cols-[5fr_7fr]">
        {/* Panel trái: mỗi tab một ảnh, giữ nguyên màu gốc (không chữ, không lớp phủ) */}
        <div className="relative h-56 overflow-clip bg-sand sm:h-72 lg:h-auto">
          <Image
            key={panel.src.src}
            src={panel.src}
            alt={panel.alt}
            fill
            // Panel cao (tới ~1000px) + object-cover → cần ảnh rộng ~900px để không phóng to gây mờ
            sizes="(min-width: 1024px) 900px, 100vw"
            placeholder="blur"
            style={{ objectPosition: panel.pos }}
            className="lightbox-fade object-cover"
          />
        </div>

        <div className="paper-grain relative flex flex-col bg-sand">
          <div className="flex-1 px-6 pt-10 pb-8 sm:px-10 lg:px-14 lg:pt-12">
            <header className="text-center">
              <Image src={IMG.logo} alt="" aria-hidden className="mx-auto h-16 w-auto" sizes="80px" />
              <p className="mt-3 font-serif text-2xl tracking-[0.08em] text-brand uppercase">{SITE.fullName}</p>
              <p className="mt-1 text-xs tracking-[0.3em] text-ink-soft">{nw('Theo menu mới nhất của spa', 2)}</p>
            </header>

            <section
              key={g.id}
              id={`${base}-panel`}
              role="tabpanel"
              aria-labelledby={`${base}-tab-${active}`}
              className="lightbox-fade mt-10"
            >
              <h3 className="border-b border-brand/40 pb-3 font-serif text-2xl tracking-[0.06em] text-brand uppercase sm:text-[1.75rem]">
                {g.label}
              </h3>
              <ul className="mt-2">
                {g.rows.map((r) => (
                  <li key={r.name}>
                    <BookButton
                      serviceId={r.serviceId}
                      ariaLabel={`Đặt lịch ${r.name}, ${r.price}`}
                      className="group -mx-3 block rounded-xl px-3 py-3 transition-colors hover:bg-cream/70"
                    >
                      {/* Tên và giá cùng hàng; sm+: thêm chấm dẫn "tên ····· giá" như menu giấy */}
                      <span className="flex items-baseline gap-3 sm:items-end">
                        <span className="min-w-0 flex-1 text-base leading-snug text-ink sm:flex-none">{nw(r.name)}</span>
                        <span aria-hidden className="dot-leader mb-1.5 hidden h-1 min-w-6 flex-1 sm:block" />
                        <span className="shrink-0 font-serif text-lg leading-snug whitespace-nowrap text-brand sm:text-xl">{r.price}</span>
                        <ArrowRightIcon
                          width={16}
                          height={16}
                          className="mb-1 hidden shrink-0 text-brand opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
                        />
                      </span>
                      {/* Ghi chú (thời lượng · thành phần) ở dòng dưới, rộng hết hàng */}
                      <span className="mt-1 block text-sm leading-relaxed text-ink-soft md:pr-7">
                        {r.duration && <span>{r.duration}</span>}
                        {r.duration && r.note && <span aria-hidden> · </span>}
                        {r.note && nw(r.note)}
                      </span>
                    </BookButton>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <p className="border-t border-brand/30 px-6 py-5 text-center text-xs tracking-[0.24em] text-ink-soft uppercase">
            {nw(`${SITE.address.street} · ${SITE.phone.display}`, 3)}
          </p>
        </div>
      </div>
    </div>
  )
}
