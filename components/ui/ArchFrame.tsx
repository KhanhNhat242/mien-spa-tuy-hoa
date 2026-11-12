import type { CSSProperties, ReactNode } from 'react'

/**
 * Khung vòm — lấy từ bức tường vòm thật của spa.
 * Không dùng `rounded-t-full rounded-b-3xl` trên cùng một phần tử: bán kính "full" là vô hạn,
 * trình duyệt co mọi bán kính theo tỉ lệ nên góc dưới bị về 0 (vuông). Vì vậy tách 2 lớp:
 * lớp ngoài cắt vòm trên, lớp trong bo góc dưới; bóng dùng drop-shadow để ôm đúng hình vòm.
 */
export function ArchFrame({
  className = '',
  style,
  children,
}: {
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <div className={`[filter:drop-shadow(0_24px_32px_rgb(99_56_26/0.22))] ${className}`} style={style}>
      <div className="size-full overflow-hidden rounded-t-full">
        <div className="relative size-full overflow-hidden rounded-b-3xl">{children}</div>
      </div>
    </div>
  )
}
