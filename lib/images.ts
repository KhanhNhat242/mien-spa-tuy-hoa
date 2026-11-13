/**
 * Ảnh dùng trên website. Ảnh gốc nằm ở public/images/Miên Spa Tuy Hòa/ (giữ nguyên);
 * bản đã cắt viền/chữ + nén WebP nằm ở assets/images/ và được import tĩnh tại đây.
 */
import logo from '@/assets/images/logo.png'
import heroMain from '@/assets/images/hero-main.webp'
import heroTea from '@/assets/images/hero-tea.webp'
// Ảnh Hero (khách cung cấp: public/images/hero-img.jpg → WebP)
import heroImg from '@/assets/images/hero-img.webp'
// Ảnh nền banner Hero (khách cung cấp: public/images/hero-banner2.jpg → WebP 1920px)
import heroBanner from '@/assets/images/hero-banner2.webp'
// Hero bản 4: cắt từ hero-banner2 (1028x1036), lấy kỹ thuật viên + khách ở nửa phải ảnh
import heroDuo from '@/assets/images/hero-duo.webp'
// Hero bản 5: hero-banner3 (đã tách nền trắng → trong suốt), cắt 2 người bên phải (544x537, WebP có alpha)
import heroCutout from '@/assets/images/hero-cutout.webp'
import giftVoucher from '@/assets/images/gift-voucher.webp'
import priceLe from '@/assets/images/price-le.webp'
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
import comboChuyenSau from '@/assets/images/combo-chuyen-sau.webp'
import comboThuGian from '@/assets/images/combo-thu-gian.webp'
import comboDuongSinh from '@/assets/images/combo-duong-sinh.webp'
import comboKhoeDep from '@/assets/images/combo-khoe-dep.webp'
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
import priceFoot from '@/assets/images/price-foot.webp'
import priceBody from '@/assets/images/price-body.webp'
import poster_851c from '@/assets/images/video-851c.webp'
import poster_71b7 from '@/assets/images/video-71b7.webp'
import poster_7846 from '@/assets/images/video-7846.webp'
import poster_d0e4 from '@/assets/images/video-d0e4.webp'
import poster_9c12 from '@/assets/images/video-9c12.webp'
import poster_1945 from '@/assets/images/video-1945.webp'
import poster_1952 from '@/assets/images/video-1952.webp'
import type { StaticImageData } from 'next/image'
import type { CategoryId } from './site-data'

/**
 * Ảnh panel trái của bảng giá — mỗi nhóm (tab) một ảnh khác nhau, đều ≥ ~900px chiều cao để không vỡ nét
 * (ảnh chụp thật, không chữ; body cắt khung dọc từ ảnh gốc 2000px, tâm là chủ thể).
 * `pos` = điểm lấy nét (object-position) — quan trọng ở mobile, nơi panel là dải ngang.
 */
export const PRICE_PANELS: Record<CategoryId, { src: StaticImageData; alt: string; pos: string }> = {
  'goi-xong': { src: svcGoiReal, alt: 'Kỹ thuật viên gội đầu dưỡng sinh cho khách', pos: '50% 58%' },
  'co-vai-gay-foot': { src: priceFoot, alt: 'Kỹ thuật viên Miên Spa massage chân cho khách', pos: '50% 45%' },
  body: { src: priceBody, alt: 'Đôi tay kỹ thuật viên massage vùng lưng', pos: '50% 30%' },
  combo: { src: spaceDecor, alt: 'Góc thảo mộc với sả, quế, hoa sứ và tượng gốm tại Miên Spa', pos: '50% 55%' },
  le: { src: priceLe, alt: 'Kỹ thuật viên Miên Spa xếp khăn chuẩn bị giường liệu trình', pos: '50% 40%' },
}

export const IMG = {
  logo,
  heroMain,
  heroImg,
  heroBanner,
  heroDuo,
  heroCutout,
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

/** Ảnh lớn cho từng combo (bộ ảnh Thân – Tâm – Trí + massage lưng, đã cắt bỏ chữ/logo đè) */
export const COMBO_IMAGES: Record<string, { src: StaticImageData; alt: string }> = {
  'combo-chuyen-sau': { src: comboChuyenSau, alt: 'Khách nằm thư giãn, nhắm mắt trong liệu trình tại Miên Spa' },
  'combo-thu-gian': { src: comboThuGian, alt: 'Đôi tay kỹ thuật viên massage vùng vai gáy' },
  'combo-duong-sinh': { src: comboDuongSinh, alt: 'Khách mặc áo choàng nghỉ ngơi bên khung cửa cây xanh' },
  'combo-khoe-dep': { src: comboKhoeDep, alt: 'Khách nữ trong áo choàng tại phòng chờ nhiều cây xanh' },
}

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
  poster: svcGoiReal,
}

/** Cụm 4 ảnh Giới thiệu — thứ tự khớp USPS trong site-data (hover ảnh → hiện ý tương ứng) */
export const ABOUT_TILES: { src: StaticImageData; alt: string; pos: string }[] = [
  { src: spaceArch, alt: 'Góc sofa dưới bức tường vòm có logo Miên Spa', pos: '50% 40%' },
  { src: guest8, alt: 'Kỹ thuật viên phục vụ trà cho khách tại sảnh', pos: '40% 40%' },
  { src: spaceShampoo, alt: 'Giường gội đầu dưỡng sinh với vòm phun nước', pos: '50% 50%' },
  { src: spaceTeam, alt: 'Hai kỹ thuật viên Miên Spa bên bình hoa ly', pos: '50% 50%' },
]

/**
 * Video thực tế tại spa (public/images/Miên Spa Tuy Hòa/video — tải từ Facebook của spa), đều quay dọc 9:16.
 * Tiêu đề mô tả đúng nội dung đã xem trong video; poster = khung hình trích từ video (không có chữ in sẵn).
 * Thứ tự = thứ tự hiển thị: hàng 1 bốn video, hàng 2 ba video.
 */
export type SpaVideo = { id: string; src: string; poster: StaticImageData; title: string; duration: number }
const vsrc = (id: string) => encodeURI(`/images/Miên Spa Tuy Hòa/video/FDown.vn_Tai_video_Facebook_720p (HD)_${id}.mp4`)
export const SPA_VIDEOS: SpaVideo[] = [
  { id: '851c', src: vsrc('851c'), poster: poster_851c, title: 'Dạo một vòng không gian Miên Spa', duration: 31 },
  { id: '71b7', src: vsrc('71b7'), poster: poster_71b7, title: 'Gội đầu dưỡng sinh, thư giãn mọi giác quan', duration: 67 },
  { id: '7846', src: vsrc('7846'), poster: poster_7846, title: 'Massage cổ vai gáy và lưng', duration: 108 },
  { id: 'd0e4', src: vsrc('d0e4'), poster: poster_d0e4, title: 'Ngâm chân thảo mộc và massage chân', duration: 88 },
  { id: '9c12', src: vsrc('9c12'), poster: poster_9c12, title: 'Combo gội đầu và massage body', duration: 81 },
  { id: '1945', src: vsrc('1945'), poster: poster_1945, title: 'Massage body thư giãn', duration: 24 },
  { id: '1952', src: vsrc('1952'), poster: poster_1952, title: 'Một buổi chiều tại phòng gội đầu', duration: 13 },
]
