'use client'

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { BookButton } from '@/components/ui/BookButton'
import { nw } from '@/lib/format'

export type PriceRow = { name: string; duration: string; price: string; note?: string; serviceId: string }
export type PriceTab = { id: string; label: string; hint?: string; rows: PriceRow[] }

export function PriceTabs({ tabs }: { tabs: PriceTab[] }) {
  const [active, setActive] = useState(0)
  const base = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (active + dir + tabs.length) % tabs.length
    setActive(next)
    refs.current[next]?.focus()
  }

  return (
    <div data-reveal="up">
      <div
        role="tablist"
        aria-label="Nhóm dịch vụ"
        className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {tabs.map((t, i) => {
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
              aria-controls={`${base}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKey}
              className={`min-h-11 shrink-0 snap-start rounded-full px-5 text-sm font-semibold whitespace-nowrap transition ${selected ? 'bg-brand text-cream shadow-[0_10px_24px_-12px_rgba(99,56,26,0.7)]' : 'bg-sand text-ink-soft hover:bg-sand/70 hover:text-brand'}`}
            >
              {t.label}
              {t.hint && <span className={`ml-1.5 font-normal ${selected ? 'text-sand/80' : 'text-ink-soft/70'}`}>({t.hint})</span>}
            </button>
          )
        })}
      </div>

      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={i !== active}
          className="lightbox-fade mx-auto mt-8 max-w-4xl rounded-[2rem] bg-cream p-2 shadow-[0_30px_70px_-45px_rgba(43,33,24,0.5)] ring-1 ring-sand sm:p-4 lg:mt-10"
        >
          <ul className="divide-y divide-sand">
            {t.rows.map((r) => (
              <li key={r.name} className="group flex items-center gap-3 rounded-2xl px-4 py-4 transition hover:bg-sand/40 sm:gap-4 sm:px-5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-end gap-3">
                    <p className="min-w-0 font-medium leading-snug text-ink">{nw(r.name)}</p>
                    <span aria-hidden className="dot-leader mb-1.5 h-1 min-w-4 flex-1" />
                    <p className="shrink-0 text-right font-serif text-lg leading-snug text-brand">{r.price}</p>
                  </div>
                  {(r.duration || r.note) && (
                    <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                      {r.duration && <span className="font-medium text-sage">{r.duration}</span>}
                      {r.duration && r.note && <span aria-hidden> · </span>}
                      {r.note && nw(r.note)}
                    </p>
                  )}
                </div>
                <BookButton
                  serviceId={r.serviceId}
                  ariaLabel={`Đặt lịch ${r.name}`}
                  className="hidden min-h-9 shrink-0 items-center rounded-full border border-brand/20 px-3 text-xs font-semibold text-brand opacity-0 transition group-hover:opacity-100 hover:bg-brand hover:text-cream focus-visible:opacity-100 md:inline-flex"
                >
                  Đặt
                </BookButton>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
