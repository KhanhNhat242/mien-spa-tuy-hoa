/**
 * Ảnh dùng trên website. Ảnh gốc nằm ở public/images/Miên Spa Tuy Hòa/ (giữ nguyên);
 * bản đã cắt viền/chữ + nén WebP nằm ở assets/images/ và được import tĩnh tại đây.
 */
import logo from '@/assets/images/logo.png'
import heroMain from '@/assets/images/hero-main.webp'
import heroTea from '@/assets/images/hero-tea.webp'
import giftVoucher from '@/assets/images/gift-voucher.webp'
import svcGoiDau from '@/assets/images/svc-goi-dau.webp'
import svcGoiReal from '@/assets/images/svc-goi-real.webp'
import svcCoVaiGay from '@/assets/images/svc-co-vai-gay.webp'
import svcDaNong from '@/assets/images/svc-da-nong.webp'
import svcBody from '@/assets/images/svc-body.webp'
import svcThai from '@/assets/images/svc-thai.webp'
import comboStep1 from '@/assets/images/combo-step-1.webp'
import comboStep2 from '@/assets/images/combo-step-2.webp'
import comboStep3 from '@/assets/images/combo-step-3.webp'
import comboStep4 from '@/assets/images/combo-step-4.webp'
import spaceArch from '@/assets/images/space-arch.webp'
import spaceArch2 from '@/assets/images/space-arch-2.webp'
import spaceOverview from '@/assets/images/space-overview.webp'
import spaceReception from '@/assets/images/space-reception.webp'
import spaceDecor from '@/assets/images/space-decor.webp'
import spaceLily from '@/assets/images/space-lily.webp'
import spaceTeam from '@/assets/images/space-team.webp'
import spaceShampoo from '@/assets/images/space-shampoo.webp'
import guest1 from '@/assets/images/guest-1.webp'
import guest2 from '@/assets/images/guest-2.webp'
import guest3 from '@/assets/images/guest-3.webp'
import guest4 from '@/assets/images/guest-4.webp'
import guest5 from '@/assets/images/guest-5.webp'
import guest6 from '@/assets/images/guest-6.webp'
import guest7 from '@/assets/images/guest-7.webp'
import guest8 from '@/assets/images/guest-8.webp'
import type { StaticImageData } from 'next/image'

export const IMG = {
  logo,
  heroMain,
  heroTea,
  giftVoucher,
  svcGoiDau,
  svcGoiReal,
  svcCoVaiGay,
  svcDaNong,
  svcBody,
  svcThai,
  spaceArch,
} satisfies Record<string, StaticImageData>

export const COMBO_STEP_IMAGES = [comboStep1, comboStep2, comboStep3, comboStep4]

export type GalleryItem = { src: StaticImageData; alt: string }

export const SPACE_GALLERY: GalleryItem[] = [
  { src: spaceArch2, alt: 'Góc sofa dưới vòm logo Miên Spa' },
  { src: spaceReception, alt: 'Quầy đón tiếp với hoa và túi quà' },
  { src: heroTea, alt: 'Khay trà gừng ấm trên bàn gỗ' },
  { src: spaceOverview, alt: 'Toàn cảnh khu đón tiếp nhìn từ trên cao' },
  { src: spaceLily, alt: 'Bình hoa ly vàng và menu dịch vụ' },
  { src: spaceTeam, alt: 'Kỹ thuật viên Miên Spa bên bình hoa ly' },
  { src: spaceShampoo, alt: 'Giường gội đầu dưỡng sinh' },
  { src: spaceDecor, alt: 'Góc trang trí sả, quế và tượng gốm' },
]

export const GUEST_GALLERY: GalleryItem[] = [
  { src: guest3, alt: 'Nhóm khách quốc tế chụp ảnh tại Miên Spa' },
  { src: guest1, alt: 'Khách chụp ảnh lưu niệm dưới vòm logo' },
  { src: guest2, alt: 'Cặp đôi khách hàng cầm bảng “Đi Phú Yên hãy đến Miên”' },
  { src: guest4, alt: 'Nhóm bạn trẻ ghé thăm Miên Spa' },
  { src: guest5, alt: 'Hai khách nữ ngồi sofa tại sảnh' },
  { src: guest6, alt: 'Khách được tư vấn tại sảnh chờ' },
  { src: guest7, alt: 'Khách nghỉ ngơi sau liệu trình' },
  { src: guest8, alt: 'Kỹ thuật viên phục vụ khách tại sảnh' },
]

// TODO(xac-nhan): chưa xem được nội dung video, cần kiểm tra lại trước khi gửi khách
export const SPACE_VIDEO = {
  src: encodeURI('/images/Miên Spa Tuy Hòa/video/FDown.vn_Tai_video_Facebook_720p (HD)_1945.mp4'),
  poster: spaceArch,
}
