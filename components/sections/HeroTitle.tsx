'use client'

import { useRef, type CSSProperties } from 'react'
import { VariableProximity } from '@/components/ui/VariableProximity'

/** Độ đậm Playfair Display (font biến thiên): thường 400 → gần con trỏ 900 */
const FROM = "'wght' 400"
const TO = "'wght' 900"

/**
 * Tiêu đề Hero "Miên Spa / Nơi Tạo Nguồn Cảm Xúc" với hiệu ứng VariableProximity (React Bits):
 * chữ đậm dần khi con trỏ (hoặc ngón tay khi vuốt) lại gần. `slogan` đã qua `nw()` để không rớt 1 chữ.
 */
export function HeroTitle({ name, slogan, className, style }: { name: string; slogan: string; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLHeadingElement>(null)
  return (
    <h1 id="hero-title" ref={ref} className={className} style={style}>
      <span className="block">
        <VariableProximity label={name} containerRef={ref} fromFontVariationSettings={FROM} toFontVariationSettings={TO} radius={140} falloff="linear" />
      </span>
      <VariableProximity label={slogan} containerRef={ref} fromFontVariationSettings={FROM} toFontVariationSettings={TO} radius={140} falloff="linear" />
    </h1>
  )
}
