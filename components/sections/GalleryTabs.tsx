'use client'

import Image, { type StaticImageData } from 'next/image'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ChevronIcon, CloseIcon } from '@/components/ui/Icons'
import { nw } from '@/lib/format'

type Item = { src: StaticImageData; alt: string }
type Video = { src: string; poster: StaticImageData }

// Bố cục bento 4 cột (md+) cho tab Không gian: 8 ảnh + 1 video = lưới 4x4 kín
const SPACE_SPANS = [
  'col-span-2 row-span-2',
  '',
  'row-span-2',
  '',
  '',
  /* video */ 'col-span-2 row-span-2',
  '',
  '',
  '',
]

export function GalleryTabs({ space, guests, video }: { space: Item[]; guests: Item[]; video: Video }) {
  const [tab, setTab] = useState<0 | 1>(0)
  const [open, setOpen] = useState<number | null>(null)
  const base = useId()
  const items = tab === 0 ? space : guests

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  )

  return (
    <div>
      <div role="tablist" aria-label="Bộ sưu tập ảnh" className="mx-auto mb-10 flex w-fit gap-1 rounded-full bg-sand p-1.5" data-reveal="up">
        {[
          ['Không gian & Trà bánh', 'Không gian'],
          ['Khoảnh khắc khách hàng', 'Khách hàng'],
        ].map(([label, short], i) => (
          <button
            key={label}
            type="button"
            role="tab"
            id={`${base}-t${i}`}
            aria-selected={tab === i}
            aria-controls={`${base}-p${i}`}
            onClick={() => setTab(i as 0 | 1)}
            className={`press min-h-11 rounded-full px-5 text-sm font-semibold whitespace-nowrap transition sm:px-6 ${tab === i ? 'bg-brand text-cream shadow-soft' : 'text-ink-soft hover:text-brand'}`}
          >
            <span className="sm:hidden">{short}</span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {tab === 0 ? (
        <div
          role="tabpanel"
          id={`${base}-p0`}
          aria-labelledby={`${base}-t0`}
          className="lightbox-fade grid auto-rows-[150px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 md:grid-cols-4 lg:auto-rows-[210px]"
        >
          {[...space.slice(0, 5), null, ...space.slice(5)].map((it, idx) => {
            const span = SPACE_SPANS[idx]
            if (it === null) {
              return (
                <div key="video" className={`relative overflow-hidden rounded-3xl bg-ink ${span}`}>
                  <video
                    className="absolute inset-0 size-full object-cover"
                    controls
                    playsInline
                    preload="none"
                    poster={video.poster.src}
                    aria-label="Video giới thiệu không gian Miên Spa"
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                </div>
              )
            }
            const i = idx > 5 ? idx - 1 : idx
            return <Tile key={it.alt} item={it} className={span} onOpen={() => setOpen(i)} />
          })}
        </div>
      ) : (
        <div role="tabpanel" id={`${base}-p1`} aria-labelledby={`${base}-t1`} className="lightbox-fade columns-2 gap-3 sm:gap-4 md:columns-4">
          {guests.map((it, i) => (
            <Tile key={it.alt} item={it} natural className="mb-3 break-inside-avoid sm:mb-4" onOpen={() => setOpen(i)} />
          ))}
        </div>
      )}

      {open !== null && <Lightbox items={items} index={open} onClose={close} onStep={step} />}
    </div>
  )
}

function Tile({ item, className = '', natural, onOpen }: { item: Item; className?: string; natural?: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Phóng to ảnh: ${item.alt}`}
      className={`group relative block w-full overflow-hidden rounded-3xl bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
    >
      {natural ? (
        <Image src={item.src} alt={item.alt} sizes="(min-width: 768px) 25vw, 50vw" placeholder="blur" className="h-auto w-full transition duration-700 group-hover:scale-105" />
      ) : (
        <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 50vw, 100vw" placeholder="blur" className="object-cover transition duration-700 group-hover:scale-105" />
      )}
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent opacity-0 transition group-hover:opacity-100" />
    </button>
  )
}

function Lightbox({ items, index, onClose, onStep }: { items: Item[]; index: number; onClose: () => void; onStep: (d: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const item = items[index]

  useEffect(() => {
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onStep])

  const nav = 'absolute top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur transition hover:bg-cream/30'

  return (
    <div role="dialog" aria-modal="true" aria-label="Xem ảnh" className="on-dark fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 sm:p-10" onClick={onClose}>
      <button ref={closeRef} type="button" aria-label="Đóng" onClick={onClose} className="absolute top-4 right-4 z-10 flex size-12 items-center justify-center rounded-full bg-cream/15 text-cream transition hover:bg-cream/30">
        <CloseIcon width={24} height={24} />
      </button>
      <button type="button" aria-label="Ảnh trước" className={`${nav} left-3 sm:left-6`} onClick={(e) => (e.stopPropagation(), onStep(-1))}>
        <ChevronIcon dir="left" width={24} height={24} />
      </button>
      <figure key={index} className="lightbox-fade relative h-full max-h-[85svh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" />
        <figcaption className="absolute inset-x-0 -bottom-1 translate-y-full pt-3 text-center text-sm text-sand">
          {nw(item.alt)} · {index + 1}/{items.length}
        </figcaption>
      </figure>
      <button type="button" aria-label="Ảnh tiếp theo" className={`${nav} right-3 sm:right-6`} onClick={(e) => (e.stopPropagation(), onStep(1))}>
        <ChevronIcon dir="right" width={24} height={24} />
      </button>
    </div>
  )
}
