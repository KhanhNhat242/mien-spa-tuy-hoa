import { getService, type Service, type Variant } from './site-data'

/** 149000 -> "149.000đ" */
export function formatPrice(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'
}

/** 75 -> "75 phút" */
export const formatMinutes = (m: number) => `${m} phút`

/**
 * Chống "rớt 1 chữ" xuống dòng cuối: nối `keep` khoảng trắng cuối bằng NBSP
 * để dòng cuối luôn có ít nhất keep + 1 chữ. Dùng cho MỌI chuỗi hiển thị.
 */
export function nw(text: string, keep = 2) {
  let out = text
  for (let i = 0; i < keep; i++) {
    const idx = out.lastIndexOf(' ')
    if (idx < 0) break
    out = out.slice(0, idx) + ' ' + out.slice(idx + 1)
  }
  return out
}

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr))

/** Tóm tắt thời lượng + giá cho 1 hoặc nhiều dịch vụ (card dịch vụ nổi bật). */
export function summarize(serviceIds: readonly string[]) {
  const services = serviceIds.map(getService).filter(Boolean) as Service[]
  const variants: Variant[] = services.flatMap((s) => s.variants)
  const durations = uniq(variants.map((x) => x.duration).filter((d): d is number => d !== null)).sort(
    (a, b) => a - b,
  )
  const prices = uniq(variants.map((x) => x.price)).sort((a, b) => a - b)

  const duration =
    durations.length === 0 ? '' : durations.length === 1 ? formatMinutes(durations[0]) : durations.map((d) => `${d}'`).join(' / ')
  const price =
    prices.length === 1
      ? formatPrice(prices[0])
      : prices.length === 2 && variants.length === 2
        ? prices.map(formatPrice).join(' / ')
        : `Từ ${formatPrice(prices[0])}`
  return { duration, price }
}

/** Gom biến thể theo group (Nữ/Nam/...) để hiển thị 1 dòng/nhóm trên bảng giá */
export function priceRows(service: Service) {
  const groups = uniq(service.variants.map((x) => x.group ?? ''))
  const grouped = service.variants.some((x) => x.group) && groups.length > 1 && service.variants.length > groups.length
  if (!grouped) {
    // 1 dòng: gộp các thời lượng/giá ("30' / 60'" — "149.000đ / 288.000đ") hoặc mỗi nhóm 1 dòng
    if (service.variants.length > 1 && service.variants.every((x) => x.group)) {
      return service.variants.map((x) => ({
        name: `${service.name} ${x.group!.toLowerCase()}`,
        duration: x.duration ? `${x.duration}'` : '',
        price: formatPrice(x.price),
      }))
    }
    return [
      {
        name: service.name,
        duration: service.variants
          .map((x) => (x.duration ? `${x.duration}'` : ''))
          .filter(Boolean)
          .join(' / '),
        price: service.variants.map((x) => formatPrice(x.price)).join(' / '),
      },
    ]
  }
  return groups.map((g) => {
    const vs = service.variants.filter((x) => (x.group ?? '') === g)
    return {
      // Dùng ngoặc thay cho " – ": trình duyệt được ngắt dòng sau dấu gạch → rớt 1 chữ
      name: `${service.name} (${g})`,
      duration: vs.map((x) => (x.duration ? `${x.duration}'` : '')).join(' / '),
      price: vs.map((x) => formatPrice(x.price)).join(' / '),
    }
  })
}

/** Nhãn biến thể trong form đặt lịch, VD "Nữ · 60 phút · 249.000đ" */
export function variantLabel(x: Variant) {
  return [x.group, x.duration ? formatMinutes(x.duration) : null, formatPrice(x.price)].filter(Boolean).join(' · ')
}
