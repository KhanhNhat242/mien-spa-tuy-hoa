<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Quy tắc dự án — Miên Spa Tuy Hòa (BẮT BUỘC)

Website demo đặt lịch cho Miên Spa Tuy Hòa. Mọi thay đổi trong repo phải tuân theo các quy tắc dưới đây.

## 1. Nguồn sự thật
- `docs/REQUIREMENTS.md` là nguồn sự thật duy nhất về nội dung, dữ liệu, phạm vi, thiết kế. **Đọc nó trước khi làm bất kỳ việc gì.**
- Code mâu thuẫn với tài liệu = code sai. Muốn thay đổi yêu cầu → sửa `docs/REQUIREMENTS.md` trước (kèm lý do/nguồn), rồi mới sửa code.
- Yêu cầu mới từ người dùng chưa có trong tài liệu → cập nhật tài liệu cùng lúc với code.
- Không tự thêm tính năng ngoài phạm vi (giỏ hàng, thanh toán, đăng nhập, đa ngôn ngữ, blog…) khi chưa được yêu cầu.

## 2. Dữ liệu doanh nghiệp
- Tên, slogan, địa chỉ, hotline, Zalo, Facebook, Google Maps, giờ mở cửa, dịch vụ, combo, giá, thời lượng **chỉ được khai báo ở một nơi**: `lib/site-data.ts` (tạo khi bắt đầu code). Component chỉ import từ đó — **không hard-code** trong JSX.
- Giá/thời lượng phải khớp đúng bảng giá ở §3.2 của tài liệu (bảng giá mới). **Không dùng menu cũ** `BangGia/574584762_...jpg`.
- Danh sách dịch vụ trong form đặt lịch phải sinh ra từ cùng dữ liệu bảng giá.
- Thông tin đang chờ xác nhận (§10 của tài liệu) đánh dấu bằng comment `// TODO(xac-nhan): ...` cạnh giá trị trong `lib/site-data.ts`.

## 3. Nội dung
- Toàn bộ nội dung hiển thị bằng **tiếng Việt có dấu đầy đủ**, viết đúng "Miên Spa", "Tuy Hòa", "Đắk Lắk".
- **Không bịa**: giá, dịch vụ, số liệu, năm kinh nghiệm, chứng nhận, đánh giá, tên/lời nhận xét khách hàng, tên nhân viên.
- **Không dùng ngôn từ y khoa / cam kết hiệu quả** ("chữa khỏi", "trị dứt điểm", "100%"…). Không quảng bá điều trị mụn/nám/trẻ hoá da như dịch vụ chính.
- Form đặt lịch chỉ được nói "đã gửi yêu cầu, spa sẽ liên hệ xác nhận" — không nói "đặt lịch thành công/đã giữ chỗ".
- Không tự ý bịa nơi nhận dữ liệu đặt lịch (email/Sheet/Zalo OA…) — hỏi trước.

## 4. Thiết kế
- Dùng token màu ở §5 của tài liệu (khai báo trong `app/globals.css` qua `@theme`), không dùng mã màu rời rạc trong class. Không dark mode.
- Font phải có subset `vietnamese`.
- Phong cách: thoáng, thiên nhiên, nhẹ nhàng; ưu tiên ảnh thật của spa trong `public/images/`. Không dùng ảnh stock/ảnh AI bên ngoài khi chưa được yêu cầu.
- Mobile-first; kiểm tra ở 360px và 1440px; không cuộn ngang.
- Animation: tái sử dụng hệ thống `data-reveal`, `.deco-float`, `.lightbox-fade` trong `globals.css`; luôn tôn trọng `prefers-reduced-motion`.
- Logo `public/images/main-logo.jpg`: không đổi màu, kéo méo, cắt.

## 5. Kỹ thuật
- Stack: Next.js 16 (App Router, `cacheComponents: true`), React 19, TypeScript, Tailwind CSS v4, Ant Design v6 (`@ant-design/nextjs-registry`). Không thêm thư viện UI/CSS khác khi chưa hỏi.
- **Đọc tài liệu trong `node_modules/next/dist/docs/` trước khi dùng API Next.js** (xem khối phía trên) — không dựa vào trí nhớ về Next.js cũ.
- Mặc định Server Component; chỉ đặt `'use client'` ở component lá cần tương tác (form, gallery, menu mobile…).
- Cấu trúc: `app/` (route), `components/` (mỗi section 1 file, VD `components/sections/Hero.tsx`), `lib/` (dữ liệu, tiện ích). Tên file component PascalCase.
- Ảnh dùng `next/image` với `alt` tiếng Việt và `sizes`; đường dẫn ảnh (thư mục có dấu và khoảng trắng) khai báo tập trung trong `lib/`, không rải rác.
- Video: không autoplay tải nặng trên mobile, dùng `preload="none"` hoặc `"metadata"`.
- SEO: `lang="vi"`, metadata tiếng Việt, Open Graph, JSON-LD `DaySpa` chỉ dùng dữ liệu từ `lib/site-data.ts`.
- Validate form ở client (và server nếu có backend); SĐT VN `^0\d{9}$` sau khi bỏ khoảng trắng/dấu chấm.

## 6. Quy ước code đã thiết lập (bắt buộc dùng lại, không làm song song cách khác)
- **Không để 1 chữ rớt xuống dòng cuối** (desktop, tablet, mobile): mọi chuỗi hiển thị đi qua `nw()` trong `lib/format.ts` (đoạn văn `nw(text)`, tiêu đề `nw(text, 1)`); nút/nhãn ngắn dùng `whitespace-nowrap`. CSS toàn cục đã có `text-wrap: pretty/balance` — không gỡ.
- Giá/thời lượng hiển thị qua `formatPrice`, `summarize`, `priceRows`, `variantLabel` trong `lib/format.ts` — không tự nối chuỗi giá.
- Ảnh: bản gốc giữ nguyên ở `public/images/Miên Spa Tuy Hòa/`; ảnh dùng trên web là bản đã cắt viền/chữ, nén WebP ở `assets/images/` (tên ASCII), import tĩnh qua `lib/images.ts`. Ảnh mới phải theo đúng luồng này.
- Section: dùng `Section`, `Container`, `SectionHeading`, `Eyebrow`, `revealDelay` trong `components/ui/Section.tsx`. Nền xen kẽ cream/sand theo thứ tự trang; khoảng cách dọc `py-14 md:py-16 lg:py-24|28`; container `max-w-7xl px-4 sm:px-6 lg:px-8`; tiêu đề cách nội dung `mb-12 lg:mb-16`; lưới thẻ `gap-6 lg:gap-8`.
- Nút: class trong `components/ui/styles.ts` (`btn.primary|outline|light|ghost`). Hằng số/kiểu dùng chung **không** đặt trong file `'use client'`.
- Nút "Đặt lịch" theo dịch vụ: dùng `<BookButton serviceId=...>` — `BookingForm` tự điền sẵn qua sự kiện `BOOK_EVENT`.
- Hiệu ứng cuộn: gắn `data-reveal` (`RevealObserver` đã chạy trong `app/page.tsx`); Hero dùng `.hero-in` (không phụ thuộc JS).
- Hero phải vừa đúng 1 màn hình ở mọi kích thước — kiểm tra lại khi sửa Hero.
- Màu viền mặc định nằm trong `@layer base` — không viết lại rule `*` ngoài layer (sẽ ghi đè class `border-*`).
- Cache Components đang bật: không gọi `new Date()`/`Date.now()` khi render server; ở client chỉ đọc trong handler/effect hoặc `useSyncExternalStore`.

## 7. Trước khi báo xong
- Chạy `npm run lint` và `npm run build`, không còn lỗi.
- Đối chiếu lại với checklist §13 "Tiêu chí nghiệm thu" trong `docs/REQUIREMENTS.md` và cập nhật §12 "Việc tồn đọng".
