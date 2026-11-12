import { SITE, SERVICES } from '@/lib/site-data'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Combos } from '@/components/sections/Combos'
import { Pricing } from '@/components/sections/Pricing'
import { Process } from '@/components/sections/Process'
import { Videos } from '@/components/sections/Videos'
import { Gallery } from '@/components/sections/Gallery'
import { BookingContact } from '@/components/sections/BookingContact'
import { Footer } from '@/components/sections/Footer'
import { FloatingActions } from '@/components/FloatingActions'
import { RevealObserver } from '@/components/RevealObserver'

// Dữ liệu cấu trúc DaySpa — chỉ dùng thông tin trong lib/site-data.ts
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DaySpa',
  name: SITE.fullName,
  slogan: SITE.slogan,
  telephone: SITE.phone.raw,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.ward,
    addressRegion: SITE.address.province,
    addressCountry: 'VN',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: SITE.hours.open,
    closes: SITE.hours.close,
  },
  sameAs: [SITE.facebookUrl],
  hasMap: SITE.mapsUrl,
  areaServed: SITE.serviceArea,
  makesOffer: SERVICES.map((s) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: s.name },
    price: Math.min(...s.variants.map((x) => x.price)),
    priceCurrency: 'VND',
  })),
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      {/* Accessible & Ethical: bỏ qua menu, nhảy thẳng tới nội dung */}
      <a
        href="#noi-dung"
        className="sr-only rounded-full bg-brand px-5 py-3 text-sm font-semibold text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
      >
        Bỏ qua đến nội dung chính
      </a>
      <Header />
      <main id="noi-dung" tabIndex={-1} className="flex-1 focus:outline-none">
        <Hero />
        <About />
        <Services />
        <Combos />
        <Pricing />
        <Process />
        <Videos />
        {/* <Gallery /> */}
        <BookingContact />
      </main>
      <Footer />
      <FloatingActions />
      <RevealObserver />
    </>
  )
}
