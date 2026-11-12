import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro, Playfair_Display } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Suspense } from 'react'
import { SITE } from '@/lib/site-data'

const beVietnam = Be_Vietnam_Pro({
  variable: '--font-be-vietnam',
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['vietnamese', 'latin'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${SITE.fullName} – ${SITE.slogan}`,
  description: `${SITE.name} tại Tuy Hòa: gội đầu dưỡng sinh, massage body, massage đá nóng, massage Thái, trị liệu cổ vai gáy. Mở cửa ${SITE.hours.open} – ${SITE.hours.close} mỗi ngày. Đặt lịch: ${SITE.phone.display}.`,
  openGraph: {
    title: `${SITE.fullName} – ${SITE.slogan}`,
    description: `${SITE.tagline}. Đặt lịch chăm sóc cơ thể và thư giãn tại ${SITE.address.full}.`,
    locale: 'vi_VN',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#FAF6EF',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${playfair.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <Suspense fallback={null}>
          <AntdRegistry>{children}</AntdRegistry>
        </Suspense>
      </body>
    </html>
  )
}
