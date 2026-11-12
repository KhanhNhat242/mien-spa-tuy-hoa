import Image from 'next/image'
import { COMBO_STEPS, servicesIn, type Service } from '@/lib/site-data'
import { COMBO_IMAGES } from '@/lib/images'
import { nw, summarize } from '@/lib/format'
import { Container, Section, revealDelay } from '@/components/ui/Section'
import { BookButton } from '@/components/ui/BookButton'
import { ArrowRightIcon } from '@/components/ui/Icons'

/**
 * Combo theo bố cục mẫu: tiêu đề 1 dòng "Combo" (mảnh) + "trọn gói" (đậm), rồi các hàng so le zig-zag:
 * thẻ màu đậm (tên lớn bên trái, thành phần + giá căn phải) và ảnh lớn đổi bên, chồng nhẹ lên thẻ.
 * Combo Chuyên Sâu là hàng đầu, thẻ nâu `brand` (nổi bật); các combo khác thẻ `sage`.
 */
/**
 * Hiệu ứng hover — chỉ trên thiết bị có chuột (`@media (hover:hover)`); màn cảm ứng luôn hiện đủ màu + chi tiết:
 * - Ảnh minh hoạ ẩn mặc định (desktop lg+), trượt vào từ phía của nó khi hover/focus vào hàng; thẻ luôn giữ màu gốc
 * - REVEAL: chi tiết combo ẩn mặc định, trượt vào lần lượt (stagger) khi hover/focus
 */
const SLIDE_BASE =
  'transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none lg:[@media(hover:hover)]:opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100'
/** Ảnh bên phải trượt vào từ phải, ảnh bên trái trượt vào từ trái */
const slideFrom = (flip: boolean) =>
  `${SLIDE_BASE} ${flip ? 'lg:[@media(hover:hover)]:-translate-x-[40%]' : 'lg:[@media(hover:hover)]:translate-x-[40%]'}`
const REVEAL =
  'transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none [@media(hover:hover)]:translate-x-3 [@media(hover:hover)]:opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100'
const stagger = (i: number) => ({ transitionDelay: `${i * 60}ms` })
/**
 * Độ rộng thẻ (desktop): mặc định full chiều ngang khung nội dung; hover/focus → thu về 3/4 để nhường chỗ
 * cho ảnh trượt vào (ảnh rộng 1/3, chồng lên thẻ 1/12). Màn cảm ứng: luôn 3/4 + ảnh.
 * Lưu ý: group-hover có độ ưu tiên CSS cao hơn biến thể @media nên luôn thắng khi hover.
 */
const CARD_WIDTH =
  'lg:w-3/4 lg:[@media(hover:hover)]:w-full lg:group-hover:w-3/4 lg:group-focus-within:w-3/4 transition-[width,padding] duration-700 ease-out motion-reduce:transition-none'
/**
 * Đệm phía ảnh (ảnh chồng lên thẻ 1/12 khung): chỉ cần khi ảnh hiện. Mặc định (có chuột) hai bên bằng nhau
 * → chữ các hàng thẳng hàng; hover/focus → nới đệm phía ảnh. Màn cảm ứng: luôn nới (ảnh luôn hiện).
 */
const imageSidePad = (flip: boolean) =>
  flip
    ? 'lg:pr-12 lg:pl-[calc(100%/12+2.5rem)] lg:[@media(hover:hover)]:pl-12 lg:group-hover:pl-[calc(100%/12+2.5rem)] lg:group-focus-within:pl-[calc(100%/12+2.5rem)]'
    : 'lg:pl-12 lg:pr-[calc(100%/12+2.5rem)] lg:[@media(hover:hover)]:pr-12 lg:group-hover:pr-[calc(100%/12+2.5rem)] lg:group-focus-within:pr-[calc(100%/12+2.5rem)]'

function ComboRow({ combo, index }: { combo: Service; index: number }) {
  const sum = summarize([combo.id])
  const img = COMBO_IMAGES[combo.id]
  const flip = index % 2 === 1 // hàng lẻ: ảnh bên trái, thẻ bên phải
  const vip = !!combo.highlight
  const [first, ...rest] = combo.name.split(' ') // "Combo" / "Chuyên Sâu"
  const items = vip ? COMBO_STEPS.map((s) => s.title) : (combo.includes ?? [])

  return (
    <li data-reveal="up" style={revealDelay(index * 120)} className="group relative">
      {/*
        Ảnh — desktop: định vị tuyệt đối (rộng 4/12 cột, trùm lên mép trên/dưới thẻ 12%) để chiều cao hàng
        chỉ phụ thuộc vào thẻ → không còn khoảng trống thừa khi ảnh đang ẩn.
      */}
      <div
        className={`relative z-10 aspect-[16/10] overflow-hidden rounded-3xl shadow-lift lg:absolute lg:inset-y-[-12%] lg:aspect-auto lg:w-1/3 ${slideFrom(flip)} ${flip ? 'lg:left-0' : 'lg:right-0'
          }`}
      >
        <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 400px, 100vw" placeholder="blur" className="reveal-zoom object-cover" />
      </div>

      {/* Thẻ */}
      <article
        className={`on-dark relative z-20 mx-3 -mt-14 rounded-3xl p-6 text-cream shadow-card sm:mx-6 sm:p-8 lg:mx-0 lg:mt-0 lg:py-10 ${CARD_WIDTH} ${vip ? 'bg-brand' : 'bg-sage'
          } lg:z-0 ${flip ? 'lg:ml-auto' : ''} ${imageSidePad(flip)}`}
      >
        {/* mobile: tên → thành phần & giá → nút; sm+: tên + nút bên trái, thành phần & giá bên phải */}
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:grid-rows-[1fr_auto] sm:gap-x-10 sm:gap-y-4">
          <div className="sm:col-start-1 sm:row-start-1">
            {vip && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-sand/85">Trải nghiệm VVIP cuối tuần</p>}
            <h3 className="font-serif text-[2.5rem] leading-[0.95] tracking-[-0.01em] sm:text-5xl">
              <span className="block">{first}</span>
              <span className="block">{nw(rest.join(' '), 1)}</span>
            </h3>
          </div>
          <BookButton
            serviceId={combo.id}
            ariaLabel={`Đặt ${combo.name}`}
            className="press order-last inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-cream underline-offset-4 hover:underline sm:order-none sm:col-start-1 sm:row-start-2 sm:self-end"
          >
            Đặt combo này
            <ArrowRightIcon width={16} height={16} />
          </BookButton>

          <div className="relative sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:text-right">
            {/* Gợi ý khi chi tiết đang ẩn (chỉ thiết bị có chuột) */}
            <p
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden items-center justify-end text-sm text-cream/75 transition-opacity duration-300 group-focus-within:opacity-0 group-hover:opacity-0 [@media(hover:hover)]:sm:flex"
            >
              Di chuột để xem chi tiết
            </p>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-cream/75 ${REVEAL}`} style={stagger(0)}>
              {sum.duration}
            </p>
            <ul className="mt-2 space-y-1 text-[0.95rem] leading-snug text-cream/90">
              {items.map((x, i) => (
                <li key={x} className={REVEAL} style={stagger(i + 1)}>
                  {vip && <span className="text-cream/60">{i + 1}. </span>}
                  {nw(x)}
                </li>
              ))}
            </ul>
            <p className={`mt-5 font-serif text-3xl text-cream sm:text-4xl ${REVEAL}`} style={stagger(items.length + 1)}>
              {sum.price}
            </p>
          </div>
        </div>
      </article>
    </li>
  )
}

export function Combos() {
  const combos = servicesIn('combo') // Chuyên Sâu đứng đầu theo dữ liệu

  return (
    <Section id="combo" tone="sand" labelledBy="combo-title">
      <Container>
        <header className="mb-10 text-center lg:mb-14">
          <h2 id="combo-title" className="font-serif text-[2.6rem] leading-[1.1] tracking-[-0.01em] whitespace-nowrap text-brand sm:text-6xl lg:text-[4.5rem]">
            <span className="font-normal">Combo</span> <span className="font-semibold">trọn gói</span>
          </h2>
        </header>

        <ol className="space-y-8 lg:space-y-16">
          {combos.map((c, i) => (
            <ComboRow key={c.id} combo={c} index={i} />
          ))}
        </ol>
      </Container>
    </Section>
  )
}
