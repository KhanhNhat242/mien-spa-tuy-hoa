'use client'

import { useEffect, useState, useSyncExternalStore, type FormEvent, type ReactNode } from 'react'
import { CATEGORIES, SERVICES, SITE, getService } from '@/lib/site-data'
import { formatMinutes, formatPrice, nw, variantLabel } from '@/lib/format'
import { BOOK_EVENT, btn, type BookDetail } from '@/components/ui/styles'
import { CheckIcon, ClockIcon, PhoneIcon } from '@/components/ui/Icons'

type Fields = {
  name: string
  phone: string
  serviceId: string
  variantId: string
  date: string
  time: string
  people: string
  note: string
}
type Errors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = { name: '', phone: '', serviceId: '', variantId: '', date: '', time: '', people: '1', note: '' }
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}
const toHHMM = (min: number) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`
const localDate = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const normalizePhone = (s: string) => s.replace(/[\s.\-()]/g, '')

// Ngày hôm nay chỉ đọc ở client (tránh lệch SSR / prerender)
const noop = () => () => {}
const useToday = () => useSyncExternalStore(noop, () => localDate(), () => '')

function validate(f: Fields, duration: number): Errors {
  const e: Errors = {}
  const name = f.name.trim()
  if (name.length < 2 || name.length > 60) e.name = 'Vui lòng nhập họ tên (2–60 ký tự).'
  if (!/^0\d{9}$/.test(normalizePhone(f.phone))) e.phone = 'Số điện thoại gồm 10 số, bắt đầu bằng 0.'
  if (!f.serviceId) e.serviceId = 'Vui lòng chọn dịch vụ hoặc combo.'
  else if (!f.variantId) e.variantId = 'Vui lòng chọn phiên bản dịch vụ.'
  const today = localDate()
  if (!f.date) e.date = 'Vui lòng chọn ngày.'
  else if (f.date < today) e.date = 'Ngày đã qua, vui lòng chọn lại.'
  if (!f.time) e.time = 'Vui lòng chọn giờ.'
  else {
    if (toMin(f.time) + duration > toMin(SITE.hours.close)) e.time = 'Liệu trình sẽ kết thúc sau giờ đóng cửa.'
    if (f.date === today) {
      const now = new Date()
      if (toMin(f.time) <= now.getHours() * 60 + now.getMinutes()) e.time = 'Khung giờ này đã qua, vui lòng chọn giờ khác.'
    }
  }
  const people = Number(f.people)
  if (!Number.isInteger(people) || people < 1 || people > 10) e.people = 'Số người từ 1 đến 10.'
  if (f.note.length > 500) e.note = 'Ghi chú tối đa 500 ký tự.'
  return e
}

export function BookingForm() {
  const [f, setF] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  // Micro-interaction: đếm số lần được điền sẵn → đổi key để chạy lại hiệu ứng viền nháy
  const [prefill, setPrefill] = useState<{ n: number; name: string } | null>(null)
  const today = useToday()

  const service = f.serviceId ? getService(f.serviceId) : undefined
  const variant = service?.variants.find((x) => x.id === f.variantId)
  const duration = variant?.duration ?? 30

  const slots: string[] = []
  for (let t = toMin(SITE.hours.open); t + duration <= toMin(SITE.hours.close); t += 30) slots.push(toHHMM(t))

  // Nhận yêu cầu "Đặt lịch" từ các card dịch vụ
  useEffect(() => {
    const onBook = (e: Event) => {
      const { serviceId, variantId } = (e as CustomEvent<BookDetail>).detail
      const s = getService(serviceId)
      if (!s) return
      setStatus('idle')
      setF((prev) => ({ ...prev, serviceId, variantId: variantId ?? (s.variants.length === 1 ? s.variants[0].id : '') }))
      setErrors((prev) => ({ ...prev, serviceId: undefined, variantId: undefined }))
      setPrefill((p) => ({ n: (p?.n ?? 0) + 1, name: s.name }))
    }
    window.addEventListener(BOOK_EVENT, onBook)
    return () => window.removeEventListener(BOOK_EVENT, onBook)
  }, [])

  const set = <K extends keyof Fields>(k: K, value: Fields[K]) => {
    setF((prev) => {
      const next = { ...prev, [k]: value }
      if (k === 'serviceId') {
        const s = getService(value as string)
        next.variantId = s && s.variants.length === 1 ? s.variants[0].id : ''
      }
      return next
    })
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  const onBlur = (k: keyof Fields) => {
    const e = validate(f, duration)
    setErrors((prev) => ({ ...prev, [k]: e[k] }))
  }

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    if (status === 'sending') return
    const e = validate(f, duration)
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) {
      document.getElementById(`bk-${first}`)?.focus()
      return
    }
    setStatus('sending')
    // TODO(xac-nhan): chưa có nơi nhận dữ liệu đặt lịch (REQUIREMENTS §7) — bản demo chỉ mô phỏng gửi
    window.setTimeout(() => setStatus('done'), 900)
  }

  if (status === 'done') {
    return (
      <div className="lightbox-fade flex flex-col items-center py-10 text-center" role="status">
        <span className="pop-in flex size-16 items-center justify-center rounded-full bg-sage text-cream">
          <CheckIcon width={30} height={30} strokeWidth={2.2} />
        </span>
        <p className="mt-6 font-serif text-2xl text-brand">{nw('Đã gửi yêu cầu đặt lịch', 1)}</p>
        <p className="mt-3 max-w-md text-ink-soft">
          {nw(`${SITE.name} đã nhận yêu cầu của bạn và sẽ gọi lại để xác nhận lịch trong thời gian sớm nhất.`)}
        </p>
        {service && (
          <p className="mt-5 rounded-2xl bg-sand px-5 py-3 text-sm text-ink">
            <span className="font-semibold text-brand">{service.name}</span>
            {variant && ` · ${variantLabel(variant)}`}
            <br />
            {f.time} · {f.date.split('-').reverse().join('/')} · {f.people} người
          </p>
        )}
        <p className="mt-6 text-sm text-ink-soft">{nw('Cần gấp? Liên hệ ngay với Miên:')}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <a href={`tel:${SITE.phone.raw}`} className={btn.primary}>
            <PhoneIcon width={18} height={18} /> Gọi {SITE.phone.display}
          </a>
          <a href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer" className={btn.outline}>
            Nhắn Zalo
          </a>
        </div>
        <button
          type="button"
          className={`${btn.ghost} mt-6`}
          onClick={() => {
            setF(EMPTY)
            setPrefill(null)
            setStatus('idle')
          }}
        >
          Gửi yêu cầu khác
        </button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby="bk-intro" className="grid gap-5 sm:grid-cols-2">
      <p aria-live="polite" className="sm:col-span-2 empty:hidden">
        {prefill && (
          <span key={prefill.n} className="msg-in flex items-center gap-2 rounded-2xl bg-sage/10 px-4 py-3 text-sm text-sage">
            <CheckIcon width={18} height={18} strokeWidth={2.2} className="shrink-0" />
            <span>
              Đã chọn <strong className="font-semibold">{prefill.name}</strong>. {nw('Hãy chọn phiên bản, ngày và giờ phù hợp.')}
            </span>
          </span>
        )}
      </p>
      <Field id="name" label="Họ và tên" error={errors.name}>
        <input
          id="bk-name"
          className={inputCls(errors.name)}
          value={f.name}
          onChange={(e) => set('name', e.target.value)}
          onBlur={() => onBlur('name')}
          autoComplete="name"
          maxLength={60}
          placeholder="Nguyễn Thị An"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'bk-name-err' : undefined}
        />
      </Field>
      <Field id="phone" label="Số điện thoại" error={errors.phone}>
        <input
          id="bk-phone"
          className={inputCls(errors.phone)}
          value={f.phone}
          onChange={(e) => set('phone', e.target.value)}
          onBlur={() => onBlur('phone')}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="09xx xxx xxx"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'bk-phone-err' : undefined}
        />
      </Field>

      <Field id="serviceId" label="Dịch vụ / Combo" error={errors.serviceId}>
        <select
          id="bk-serviceId"
          key={`svc-${prefill?.n ?? 0}`}
          className={`${inputCls(errors.serviceId)} ${prefill ? 'field-flash' : ''}`}
          value={f.serviceId}
          onChange={(e) => set('serviceId', e.target.value)}
          aria-invalid={!!errors.serviceId}
          aria-describedby={errors.serviceId ? 'bk-serviceId-err' : undefined}
        >
          <option value="">Chọn dịch vụ…</option>
          {CATEGORIES.map((c) => (
            <optgroup key={c.id} label={c.label}>
              {SERVICES.filter((s) => s.category === c.id).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </Field>
      <Field id="variantId" label="Phiên bản" error={errors.variantId}>
        <select
          id="bk-variantId"
          key={`var-${prefill?.n ?? 0}`}
          className={`${inputCls(errors.variantId)} ${prefill ? 'field-flash' : ''}`}
          value={f.variantId}
          onChange={(e) => set('variantId', e.target.value)}
          disabled={!service}
          aria-invalid={!!errors.variantId}
          aria-describedby={errors.variantId ? 'bk-variantId-err' : undefined}
        >
          {!service && <option value="">Chọn dịch vụ trước</option>}
          {service && service.variants.length > 1 && <option value="">Chọn Nam/Nữ, thời lượng…</option>}
          {service?.variants.map((x) => (
            <option key={x.id} value={x.id}>
              {variantLabel(x)}
            </option>
          ))}
        </select>
      </Field>

      <Field id="date" label="Ngày" error={errors.date}>
        <input
          id="bk-date"
          type="date"
          className={inputCls(errors.date)}
          value={f.date}
          min={today || undefined}
          onChange={(e) => set('date', e.target.value)}
          onBlur={() => onBlur('date')}
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? 'bk-date-err' : undefined}
        />
      </Field>
      <Field id="time" label={`Giờ (${SITE.hours.open} – ${SITE.hours.close})`} error={errors.time}>
        <select
          id="bk-time"
          className={inputCls(errors.time)}
          value={f.time}
          onChange={(e) => set('time', e.target.value)}
          aria-invalid={!!errors.time}
          aria-describedby={errors.time ? 'bk-time-err' : undefined}
        >
          <option value="">Chọn giờ…</option>
          {slots.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <Field id="people" label="Số người" error={errors.people}>
        <input
          id="bk-people"
          type="number"
          min={1}
          max={10}
          inputMode="numeric"
          className={inputCls(errors.people)}
          value={f.people}
          onChange={(e) => set('people', e.target.value)}
          onBlur={() => onBlur('people')}
          aria-invalid={!!errors.people}
          aria-describedby={errors.people ? 'bk-people-err' : undefined}
        />
      </Field>
      <Field id="note" label="Ghi chú (không bắt buộc)" error={errors.note}>
        <input
          id="bk-note"
          className={inputCls(errors.note)}
          value={f.note}
          maxLength={500}
          onChange={(e) => set('note', e.target.value)}
          placeholder="Tình trạng cơ thể, yêu cầu riêng…"
          aria-invalid={!!errors.note}
          aria-describedby={errors.note ? 'bk-note-err' : undefined}
        />
      </Field>

      {/* Tạm tính */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-sand/70 px-5 py-4 sm:col-span-2" aria-live="polite">
        {variant ? (
          <>
            <span className="inline-flex items-center gap-2 text-sm text-ink-soft">
              <ClockIcon width={18} height={18} className="text-sage" />
              {variant.duration ? `Thời lượng dự kiến: ${formatMinutes(variant.duration)}` : 'Thời lượng: theo tư vấn'}
            </span>
            <span className="text-sm text-ink-soft">
              Tạm tính:{' '}
              <span key={`${variant.id}-${f.people}`} className="msg-in inline-block font-serif text-xl text-brand">
                {formatPrice(variant.price * Math.max(1, Number(f.people) || 1))}
              </span>
            </span>
          </>
        ) : (
          <span className="text-sm text-ink-soft">{nw('Chọn dịch vụ để xem thời lượng và giá tạm tính.')}</span>
        )}
      </div>

      <div className="sm:col-span-2">
        <button type="submit" aria-busy={status === 'sending'} disabled={status === 'sending'} className={`${btn.primary} w-full disabled:cursor-wait disabled:opacity-70`}>
          {status === 'sending' ? (
            <>
              <span aria-hidden className="spinner size-4 rounded-full border-2 border-cream/40 border-t-cream" />
              Đang gửi…
            </>
          ) : (
            'Gửi yêu cầu đặt lịch'
          )}
        </button>
        <p className="mt-3 text-center text-xs text-ink-soft">
          {nw('Lịch chỉ được giữ sau khi Miên Spa gọi xác nhận.')}
        </p>
      </div>
    </form>
  )
}

const inputCls = (err?: string) =>
  `h-12 w-full rounded-xl border bg-cream px-4 text-base text-ink placeholder:text-ink-soft/50 transition focus:outline-none focus:ring-[3px] disabled:opacity-60 ${err ? 'border-danger/60 focus:ring-danger/20' : 'border-brand/15 focus:border-brand/50 focus:ring-brand/20'}`

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={`bk-${id}`} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`bk-${id}-err`} className="msg-in mt-1.5 text-sm text-danger">
          {nw(error)}
        </p>
      )}
    </div>
  )
}
