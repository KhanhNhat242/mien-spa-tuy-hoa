/**
 * NGUỒN DỮ LIỆU DUY NHẤT của website (xem docs/REQUIREMENTS.md §2, §3).
 * Không hard-code giá, giờ, địa chỉ, SĐT... trong component — luôn import từ file này.
 * Bảng giá theo menu MỚI: public/images/Miên Spa Tuy Hòa/hinhAnh/BangGia/721042731_...jpg
 */

export const SITE = {
  name: 'Miên Spa',
  fullName: 'Miên Spa Tuy Hòa',
  slogan: 'Nơi Tạo Nguồn Cảm Xúc',
  tagline: 'Nuông chiều bản thân – Tận hưởng trọn vẹn',
  // TODO(xac-nhan): địa chỉ lấy theo bảng giá mới, chờ spa xác nhận (REQUIREMENTS §10.1)
  address: {
    street: '21 Điện Biên Phủ',
    ward: 'Phường Tuy Hòa',
    province: 'Đắk Lắk',
    full: '21 Điện Biên Phủ, Phường Tuy Hòa, Đắk Lắk',
  },
  // TODO(xac-nhan): hotline chờ spa xác nhận trước khi công bố (REQUIREMENTS §10.5)
  phone: { display: '0847 177 968', raw: '0847177968' },
  zaloUrl: 'https://zalo.me/0847177968',
  // TODO(xac-nhan): fanpage chính thức (REQUIREMENTS §10.6)
  facebookUrl: 'https://www.facebook.com/mienspa',
  messengerUrl: 'https://m.me/mienspa',
  mapsUrl: 'https://maps.app.goo.gl/YjJXGN9mLf2oLAtw9',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=21%20%C4%90i%E1%BB%87n%20Bi%C3%AAn%20Ph%E1%BB%A7%2C%20Tuy%20H%C3%B2a&output=embed',
  // TODO(xac-nhan): tài liệu khách ghi 08:00, poster cửa tiệm ghi 09:00 (REQUIREMENTS §10.2)
  hours: { open: '09:00', close: '21:00', days: 'Thứ Hai – Chủ Nhật' },
  serviceArea: 'Tuy Hòa và các khu vực lân cận',
} as const

export const NAV = [
  { href: '#gioi-thieu', label: 'Giới thiệu' },
  { href: '#dich-vu', label: 'Dịch vụ' },
  { href: '#bang-gia', label: 'Bảng giá' },
  { href: '#khong-gian', label: 'Không gian' },
  { href: '#lien-he', label: 'Liên hệ' },
] as const

/* ------------------------------------------------------------------ */
/* Dịch vụ & bảng giá                                                  */
/* ------------------------------------------------------------------ */

export type CategoryId = 'goi-xong' | 'co-vai-gay-foot' | 'body' | 'combo' | 'le'

export type Variant = {
  id: string
  /** Nhóm hiển thị trên bảng giá, VD "Nữ" / "Nam" / "Cơ bản" */
  group?: string
  /** Thời lượng (phút); null nếu menu không ghi */
  duration: number | null
  price: number
}

export type Service = {
  id: string
  name: string
  category: CategoryId
  variants: Variant[]
  includes?: string[]
  highlight?: boolean
}

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'goi-xong', label: 'Gội đầu & Xông hơi' },
  { id: 'co-vai-gay-foot', label: 'Cổ vai gáy & Foot' },
  { id: 'body', label: 'Body Massage' },
  { id: 'combo', label: 'Combo Trọn Gói' },
  { id: 'le', label: 'Dịch vụ lẻ' },
]

const v = (id: string, duration: number | null, price: number, group?: string): Variant => ({
  id,
  duration,
  price,
  group,
})

export const SERVICES: Service[] = [
  // Gội đầu & Xông hơi
  { id: 'xong-kho-da-muoi', name: 'Xông khô đá muối', category: 'goi-xong', variants: [v('30', 30, 50000)] },
  { id: 'goi-nhanh-em-be', name: 'Gội nhanh em bé', category: 'goi-xong', variants: [v('20', 20, 29000)] },
  { id: 'goi-an-nhien', name: 'Gội An Nhiên', category: 'goi-xong', variants: [v('40', 40, 49000)] },
  { id: 'goi-thao-moc', name: 'Gội Thảo Mộc thư giãn', category: 'goi-xong', variants: [v('50', 50, 89000)] },
  { id: 'goi-an-lac', name: 'Gội An Lạc dưỡng sinh', category: 'goi-xong', variants: [v('75', 75, 149000)] },

  // Cổ vai gáy & Foot
  {
    id: 'co-vai-gay',
    name: 'Trị liệu đầu cổ vai gáy',
    category: 'co-vai-gay-foot',
    variants: [v('co-ban-30', 30, 149000, 'Cơ bản'), v('chuyen-sau-60', 60, 229000, 'Chuyên sâu')],
  },
  {
    id: 'ban-chan',
    name: 'Liệu pháp trị liệu bàn chân',
    category: 'co-vai-gay-foot',
    variants: [v('30', 30, 149000), v('60', 60, 288000)],
  },

  // Body massage
  {
    id: 'massage-viet-nam',
    name: 'Massage Việt Nam',
    category: 'body',
    variants: [
      v('nu-60', 60, 249000, 'Nữ'),
      v('nu-90', 90, 339000, 'Nữ'),
      v('nam-60', 60, 329000, 'Nam'),
      v('nam-90', 90, 429000, 'Nam'),
    ],
  },
  {
    id: 'da-nong',
    name: 'Liệu pháp Đá Nóng',
    category: 'body',
    variants: [
      v('nu-70', 70, 299000, 'Nữ'),
      v('nu-90', 90, 389000, 'Nữ'),
      v('nam-70', 70, 369000, 'Nam'),
      v('nam-90', 90, 469000, 'Nam'),
    ],
  },
  { id: 'massage-thai', name: 'Massage body Thái', category: 'body', variants: [v('75', 75, 449000)] },
  { id: 'ba-bau', name: 'Thư giãn bà bầu', category: 'body', variants: [v('60', 60, 250000)] },
  {
    id: 'thai-doc',
    name: 'Massage Thải Độc Hàn Khí Giải Rượu Bia',
    category: 'body',
    variants: [v('60', 60, 389000)],
  },

  // Combo
  {
    id: 'combo-chuyen-sau',
    name: 'Combo Chuyên Sâu',
    category: 'combo',
    highlight: true,
    variants: [v('120', 120, 599000)],
    includes: [
      'Ngâm chân thảo dược',
      'Xông hơi đá muối',
      'Massage đá nóng trị liệu toàn thân',
      'Gội đầu An Lạc dưỡng sinh',
    ],
  },
  {
    id: 'combo-thu-gian',
    name: 'Combo Thư Giãn',
    category: 'combo',
    variants: [v('75', 75, 288000)],
    includes: ['Ngâm chân thảo dược', 'Trị liệu cổ vai gáy', 'Gội đầu An Nhiên'],
  },
  {
    id: 'combo-duong-sinh',
    name: 'Combo Dưỡng Sinh',
    category: 'combo',
    variants: [v('90', 90, 339000)],
    includes: ['Xông hơi đá muối', 'Massage trị liệu toàn thân', 'Gội đầu thư giãn'],
  },
  {
    id: 'combo-khoe-dep',
    name: 'Combo Khỏe Đẹp Toàn Diện',
    category: 'combo',
    variants: [v('90', 90, 349000)],
    includes: ['Ngâm chân thảo dược', 'Chăm sóc da mặt chuyên sâu', 'Gội đầu An Lạc dưỡng sinh'],
  },

  // Dịch vụ lẻ
  { id: 'giac-hoi', name: 'Giác hơi', category: 'le', variants: [v('x', null, 50000)] },
  { id: 'chuom-da-nong', name: 'Chườm đá nóng', category: 'le', variants: [v('x', null, 50000)] },
  { id: 'dap-thuoc-bac', name: 'Đắp thuốc Bắc giảm đau mỏi vai gáy', category: 'le', variants: [v('x', null, 69000)] },
  { id: 'cham-cuu-khong-kim', name: 'Châm cứu không kim', category: 'le', variants: [v('x', null, 79000)] },
  { id: 'u-huyet-yen', name: 'Ủ huyết yến trắng da', category: 'le', variants: [v('x', null, 89000)] },
  { id: 'massage-mat-dau', name: 'Massage mặt & đầu', category: 'le', variants: [v('30', 30, 149000)] },
  { id: 'that-lung', name: 'Trị liệu vùng thắt lưng', category: 'le', variants: [v('30', 30, 149000)] },
  { id: 'da-mat-nang-co', name: 'Chăm sóc da mặt nâng cơ tự nhiên', category: 'le', variants: [v('45', 45, 120000)] },
]

export const getService = (id: string) => SERVICES.find((s) => s.id === id)
export const servicesIn = (category: CategoryId) => SERVICES.filter((s) => s.category === category)

/* ------------------------------------------------------------------ */
/* Nội dung marketing (chỉ dùng câu chữ có nguồn — REQUIREMENTS §1, §3, §4) */
/* ------------------------------------------------------------------ */

/** 5 dịch vụ chính (REQUIREMENTS §3.1). Giá/thời lượng tự tính từ SERVICES. */
export const FEATURED = [
  {
    key: 'goi-dau',
    title: 'Gội đầu dưỡng sinh',
    serviceIds: ['goi-an-lac'],
    bookId: 'goi-an-lac',
    image: 'svcGoiDau',
    desc: 'Nuôi dưỡng mái tóc mềm mượt, kết hợp massage khai thông huyệt đạo vùng đầu.',
  },
  {
    key: 'co-vai-gay',
    title: 'Chăm sóc & thư giãn cổ – vai – gáy',
    serviceIds: ['co-vai-gay'],
    bookId: 'co-vai-gay',
    image: 'svcCoVaiGay',
    desc: 'Giãn cơ mềm mại, day ấn huyệt đạo giải tỏa điểm ứ trệ, giúp thư giãn và giảm đau nhức.',
  },
  {
    key: 'da-nong',
    title: 'Massage đá nóng',
    serviceIds: ['da-nong'],
    bookId: 'da-nong',
    image: 'svcDaNong',
    desc: 'Kết hợp đi đá nóng giúp giữ ấm cơ thể, làm dịu vùng cơ và tăng lưu thông khí huyết.',
  },
  {
    key: 'body',
    title: 'Massage body thư giãn',
    serviceIds: ['massage-viet-nam'],
    bookId: 'massage-viet-nam',
    image: 'svcBody',
    desc: 'Phục hồi năng lượng toàn thân với kỹ thuật miết, xoa bóp êm dịu theo thể trạng.',
  },
  {
    key: 'thai',
    title: 'Massage Thái',
    serviceIds: ['massage-thai'],
    bookId: 'massage-thai',
    image: 'svcThai',
    desc: 'Kỹ thuật kéo giãn chuyên sâu giúp cơ khớp linh hoạt, giải tỏa căng cứng toàn diện.',
  },
] as const

/** 4 bước Combo Chuyên Sâu — nguyên văn poster của spa */
export const COMBO_STEPS = [
  { title: 'Ngâm chân thảo dược', desc: 'Thư giãn, kích thích huyệt đạo, lưu thông khí huyết.' },
  { title: 'Xông hơi đá muối', desc: 'Đào thải độc tố qua tuyến mồ hôi, thanh lọc cơ thể.' },
  {
    title: 'Massage đá nóng trị liệu toàn thân',
    desc: 'Giãn cơ sâu, giảm đau nhức, lưu thông khí huyết, cân bằng năng lượng.',
  },
  { title: 'Gội đầu An Lạc dưỡng sinh', desc: 'Đánh thức giác quan, tóc sạch mềm mượt, thư giãn tinh thần.' },
] as const

export const USPS = [
  { title: 'Không gian chuyên nghiệp', desc: 'Không gian và trải nghiệm chăm sóc chuyên nghiệp.' },
  { title: 'Tư vấn theo tình trạng', desc: 'Liệu trình được tư vấn theo tình trạng của từng khách.' },
  { title: 'Chất lượng là ưu tiên', desc: 'Chú trọng chất lượng dịch vụ và trải nghiệm khách hàng.' },
  { title: 'Đồng hành tận tình', desc: 'Tư vấn tận tình, hỗ trợ khách trong suốt quá trình sử dụng dịch vụ.' },
] as const

/** "Liệu trình lý tưởng dành cho" — từ ấn phẩm cổ vai gáy của spa */
export const IDEAL_FOR = [
  'Dân văn phòng dùng máy tính thường xuyên',
  'Người mỏi cổ, đau vai, căng gáy',
  'Người muốn giảm đau mỏi nhanh chóng',
  'Lần đầu trải nghiệm massage trị liệu',
] as const

export const PROCESS_STEPS = [
  { icon: 'calendar', title: 'Đặt lịch hẹn', desc: 'Qua website, hotline hoặc Zalo.' },
  { icon: 'phone', title: 'Spa gọi xác nhận', desc: 'Chốt thời gian và dịch vụ trước khi đến.' },
  { icon: 'chat', title: 'Đón tiếp & tư vấn', desc: 'Thăm hỏi, tư vấn đúng tình trạng cơ thể.' },
  { icon: 'lotus', title: 'Trải nghiệm liệu trình', desc: 'Chăm sóc tận tâm trong không gian tĩnh lặng.' },
  { icon: 'tea', title: 'Thư giãn & dùng trà', desc: 'Thưởng thức trà gừng ấm sau liệu trình.' },
] as const
