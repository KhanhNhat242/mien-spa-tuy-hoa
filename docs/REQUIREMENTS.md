# Tài liệu yêu cầu — Website demo Miên Spa Tuy Hòa

> **Nguồn sự thật (single source of truth)** cho mọi nội dung, dữ liệu và phạm vi của dự án.
> Mọi code, nội dung, thiết kế thêm vào dự án **phải khớp với tài liệu này**. Nếu cần thay đổi → sửa tài liệu này trước, rồi mới sửa code.
>
> Tổng hợp từ: (1) Phiếu Dev 64 do sale ghi, (2) tài liệu "Miên Spa Tuy Hòa.pdf" (nội dung sẵn có), (3) ảnh bảng giá + logo + ảnh/video trong `public/images/`.
> Cập nhật lần cuối: 12/11/2026.

---

## 0. Thông tin phiếu

| Mục | Giá trị |
|---|---|
| Phiếu | PHIẾU DEV 64 — STT 64 |
| Mã DN | DN011 |
| Ngày giao hồ sơ | 08/11/2026 |
| Sale phụ trách | Quang Thuận |
| Ngành | Spa / Thẩm mỹ / Làm đẹp |
| Ngôn ngữ website | **Tiếng Việt** (chỉ 1 ngôn ngữ) |
| Website hiện tại | Không có |
| Mục tiêu website | **Đặt lịch / nhận tư vấn** |
| Chức năng bắt buộc | **Đặt lịch** |
| Hạn giao demo | Chưa có — sale sẽ ghi |
| Màu chủ đạo / web tham khảo | Khách không cung cấp → dev tự đề xuất theo logo (xem §5) |
| Lưu ý / điều cần tránh | Khách "không biết" → áp dụng các nguyên tắc an toàn ở §9 |

Dev cần điền lại vào phiếu: Dev phụ trách, Trạng thái demo, Link demo, Trạng thái gửi sale.

---

## 1. Thương hiệu

- **Tên hiển thị:** Miên Spa (tên đầy đủ: Miên Spa Tuy Hòa)
- **Slogan (có trên logo):** *"Nơi Tạo Nguồn Cảm Xúc"*
- **Logo:** `public/images/main-logo.jpg` — bông lúa cong thành vòng tròn + bàn tay nâng đỡ, màu nâu đất trên nền trắng. Không được đổi màu, kéo méo, cắt xén logo. Khi đặt lên nền tối cần phiên bản sáng/viền phù hợp hoặc đặt trong khối nền sáng.
- **Định vị:** địa điểm chăm sóc cơ thể và thư giãn cho khách tại Tuy Hòa và khu vực lân cận.
- **Câu chữ marketing có sẵn trên ấn phẩm của spa (được phép dùng):** "Nuông chiều bản thân – Tận hưởng trọn vẹn", "Cuối tuần là để yêu bản thân!", "Đi Phú Yên hãy đến Miên".

### Phong cách (theo tài liệu khách)
- Thư thái, gần gũi thiên nhiên, nhẹ nhàng, tinh tế.
- Bố cục **thoáng**, dùng **hình ảnh không gian thực tế**, màu **dịu mắt**, nội dung **dễ theo dõi**.

---

## 2. Thông tin liên hệ & hoạt động

| Mục | Giá trị dùng trên demo | Trạng thái |
|---|---|---|
| Địa chỉ | **21 Điện Biên Phủ, Phường Tuy Hòa, Đắk Lắk** | ⚠ Cần xác nhận (xem §10) |
| Hotline / Zalo | **0847 177 968** (link: `tel:0847177968`, `https://zalo.me/0847177968`) | ⚠ Cần xác nhận trước khi công bố |
| Facebook | https://www.facebook.com/mienspa | ⚠ Cần xác nhận đúng fanpage chính thức |
| Google Maps | https://maps.app.goo.gl/YjJXGN9mLf2oLAtw9 | Dùng link này cho nút "Chỉ đường" |
| Giờ mở cửa | **09:00 – 21:00, Thứ Hai – Chủ Nhật** | ⚠ Mâu thuẫn nguồn (xem §10) |
| Khu vực phục vụ | Tuy Hòa và các khu vực lân cận | |
| Người liên hệ | (trống) | Không hiển thị |

**Hình thức đặt lịch (theo tài liệu khách):** gọi hotline, nhắn Fanpage/Zalo, hoặc gửi biểu mẫu đặt lịch trên website. **Spa xác nhận lại thời gian và dịch vụ trước khi khách đến** → website không được hứa "đặt lịch thành công/đã giữ chỗ", chỉ được nói "đã gửi yêu cầu, spa sẽ liên hệ xác nhận".

---

## 3. Dịch vụ

### 3.1. 5 dịch vụ chính (bắt buộc làm nổi bật — theo phiếu & tài liệu khách)

| # | Dịch vụ | Map sang bảng giá |
|---|---|---|
| 1 | Gội đầu dưỡng sinh | Gội An Lạc dưỡng sinh 75' — 149k (và các gói gội khác) |
| 2 | Massage body thư giãn | Massage Việt Nam Nữ/Nam |
| 3 | Massage đá nóng | Liệu pháp Đá Nóng Nữ/Nam |
| 4 | Massage Thái | Massage body Thái 75' — 449k |
| 5 | Chăm sóc & thư giãn vùng cổ – vai – gáy | Trị liệu đầu cổ vai gáy cơ bản / chuyên sâu |

Mỗi dịch vụ chính trên website phải thể hiện: **tên, mô tả ngắn, thời lượng, giá, nút "Đặt lịch"** (nút đặt lịch phải điền sẵn dịch vụ đó vào form).

### 3.2. Bảng giá chính thức

> Nguồn: ảnh `public/images/Miên Spa Tuy Hòa/hinhAnh/BangGia/721042731_...jpg` (bảng giá **mới nhất**, địa chỉ ghi "Phường Tuy Hòa, Đắk Lắk").
> Ảnh `574584762_...jpg` là **menu cũ**, giá khác → **KHÔNG dùng**.
> Giá hiển thị dạng `149.000đ` hoặc `149k` — thống nhất một kiểu trên toàn site (khuyến nghị `149.000đ`).

**Steam, Sauna**
| Dịch vụ | Thời gian | Giá |
|---|---|---|
| Xông khô đá muối | 30' | 50k |

**Gội đầu**
| Dịch vụ | Thời gian | Giá |
|---|---|---|
| Gội nhanh em bé | 20' | 29k |
| Gội An Nhiên | 40' | 49k |
| Gội Thảo Mộc thư giãn | 50' | 89k |
| Gội An Lạc dưỡng sinh | 75' | 149k |

**Massage cổ vai gáy**
| Dịch vụ | Thời gian | Giá |
|---|---|---|
| Trị liệu đầu cổ vai gáy cơ bản | 30' | 149k |
| Trị liệu đầu cổ vai gáy chuyên sâu | 60' | 229k |

**Body massage**
| Dịch vụ | Thời gian | Giá |
|---|---|---|
| Massage Việt Nam – Nữ | 60' / 90' | 249k / 339k |
| Massage Việt Nam – Nam | 60' / 90' | 329k / 429k |
| Liệu pháp Đá Nóng – Nữ | 70' / 90' | 299k / 389k |
| Liệu pháp Đá Nóng – Nam | 70' / 90' | 369k / 469k |
| Massage body Thái | 75' | 449k |
| Thư giãn bà bầu | 60' | 250k |
| Bài Massage Thải Độc Hàn Khí Giải Rượu Bia | 60' | 389k |

**Foot massage**
| Dịch vụ | Thời gian | Giá |
|---|---|---|
| Liệu pháp trị liệu bàn chân | 30' / 60' | 149k / 288k |

**Combo**
| Combo | Thời gian | Giá | Gồm |
|---|---|---|---|
| Combo Thư Giãn | 75' | 288k | Ngâm chân thảo dược · Trị liệu cổ vai gáy · Gội đầu An Nhiên |
| Combo Dưỡng Sinh | 90' | 339k | Xông hơi đá muối · Massage trị liệu toàn thân · Gội đầu thư giãn |
| Combo Khỏe Đẹp Toàn Diện | 90' | 349k | Ngâm chân thảo dược · Chăm sóc da mặt chuyên sâu · Gội đầu An Lạc dưỡng sinh |
| **Combo Chuyên Sâu** ⭐ | 120' | 599k | Ngâm chân thảo dược · Xông hơi đá muối · Massage đá nóng trị liệu toàn thân · Gội đầu An Lạc dưỡng sinh |

Combo Chuyên Sâu đang được spa quảng bá là *"Trải nghiệm VVIP cuối tuần"* → được làm nổi bật. Mô tả 4 bước (lấy từ poster của spa, được phép dùng):
1. **Ngâm chân thảo dược** — Thư giãn, kích thích huyệt đạo, lưu thông khí huyết.
2. **Xông hơi đá muối** — Đào thải độc tố qua tuyến mồ hôi, thanh lọc cơ thể.
3. **Massage đá nóng trị liệu toàn thân** — Giãn cơ sâu, giảm đau nhức, lưu thông khí huyết, cân bằng năng lượng.
4. **Gội đầu An Lạc dưỡng sinh** — Đánh thức giác quan, tóc sạch mềm mượt, thư giãn tinh thần.

**Dịch vụ lẻ**
| Dịch vụ | Thời gian | Giá |
|---|---|---|
| Giác hơi | — | 50k |
| Chườm đá nóng | — | 50k |
| Đắp thuốc Bắc giảm đau mỏi vai gáy | — | 69k |
| Châm cứu không kim | — | 79k |
| Ủ huyết yến trắng da | — | 89k |
| Massage mặt & đầu | 30' | 149k |
| Trị liệu vùng thắt lưng | 30' | 149k |
| Chăm sóc da mặt nâng cơ tự nhiên | 45' | 120k |

---

## 4. Khách hàng mục tiêu & điểm mạnh (USP)

**Khách hàng mục tiêu**
- Nữ giới 20–45 tuổi (khách nam vẫn phục vụ — bảng giá có giá riêng cho Nam).
- Người có nhu cầu chăm sóc, cải thiện, phục hồi cơ thể/làn da và thư giãn.
- Khách quan tâm đến làm đẹp, chăm sóc sức khỏe và ngoại hình.
- Thu nhập trung bình khá trở lên, ưu tiên chất lượng dịch vụ.
- Khách du lịch đến Tuy Hòa / Phú Yên (theo ảnh "Đi Phú Yên hãy đến Miên").

**USP (dùng làm khối "Vì sao chọn Miên")**
1. Không gian và trải nghiệm chăm sóc chuyên nghiệp.
2. Liệu trình được tư vấn theo tình trạng của từng khách.
3. Chú trọng chất lượng dịch vụ và trải nghiệm khách hàng.
4. Tư vấn tận tình, hỗ trợ khách trong suốt quá trình sử dụng dịch vụ.

---

## 5. Định hướng thiết kế (dev đề xuất — khách không chỉ định màu)

Màu rút ra từ logo, menu giấy kraft và poster của spa:

| Token | Mã màu | Dùng cho |
|---|---|---|
| `brand` (nâu logo) | `#63381A` | Tiêu đề, nút chính, logo, icon |
| `brand-soft` | `#8A5A3B` | Hover, chữ phụ đậm |
| `cream` (nền) | `#FAF6EF` | Nền chính |
| `sand` (viền/khối) | `#EFE8DC` | Viền, nền khối phụ (đã có trong `globals.css`) |
| `sage` (xanh lá) | `#4F6B3A` | Điểm nhấn thiên nhiên, badge, giá nổi bật |
| `ink` (chữ) | `#2B2118` | Chữ nội dung |

- Font **bắt buộc hỗ trợ tiếng Việt** (subset `vietnamese`). Đề xuất: tiêu đề serif thanh lịch (VD: *Playfair Display* / *Cormorant Garamond*), nội dung sans dễ đọc (VD: *Be Vietnam Pro*). Geist hiện tại **không có** subset tiếng Việt → phải thay.
- Ảnh thật của spa là chủ đạo; hoạ tiết lá/bông lúa nhẹ làm trang trí (đã có class `.deco-float`).
- Hiệu ứng nhẹ nhàng, chậm (đã có hệ thống `data-reveal` trong `globals.css`); luôn tôn trọng `prefers-reduced-motion`.
- Mobile-first: đa số khách vào từ Facebook/Zalo trên điện thoại.

### 5.1. Ngôn ngữ thiết kế (chốt 12/11/2026)

| Mức | Style | Áp dụng ở đâu | Cách thể hiện |
|---|---|---|---|
| Chính | **Nature Distilled** | Toàn trang | Tông đất ấm + nền kem, bóng mềm ánh nâu, chuyển động chậm ease-out, lớp **giấy kraft rất nhẹ** (grain ≤ 8%) chỉ trên nền `sand` và khối nâu Combo |
| Chính | **Organic Biophilic** | Toàn trang | Bo góc 16–24px; hình khối hữu cơ lấy từ **kiến trúc thật** của spa: khung ảnh vòm (bức tường vòm) qua `ArchFrame`; một đường cong sóng duy nhất ở mép footer. *(Rà soát ui-taste 12/11/2026: bỏ blob, góc lá ngẫu nhiên, sóng ở mọi section, bông lúa/lá trôi nổi — trang trí không mang thông tin.)* |
| Nền tảng | **Accessible & Ethical** | Form, menu, nút nổi, mọi phần tử bấm được | Focus ring 3px rõ, skip link, vùng chạm ≥ 44px, chữ nội dung ≥ 16px, input 16px (tránh iOS tự zoom), tương phản ≥ 4.5:1, tôn trọng reduced motion |
| Bổ trợ | **Micro-interactions** | Form đặt lịch, nút nổi, tab, nút | Phản hồi nhấn 80–100ms, viền nháy nhẹ khi form được điền sẵn + dòng thông báo "Đã chọn…", spinner khi gửi, dấu tích "pop" khi thành công, lỗi hiện mờ dần ngay dưới trường |
| Bổ trợ | **Bento Box Grid** | Dịch vụ nổi bật, Combo | Lưới kích thước khác nhau (ô lớn = Gội đầu dưỡng sinh / Combo Chuyên Sâu), hover phóng 1.02. **Không** dùng cho bảng giá (giữ tab + bảng thường) |
| Mượn một phần | **Scroll storytelling nhẹ** | Quy trình 5 bước, 4 bước Combo Chuyên Sâu | Các bước hiện lần lượt khi cuộn, đường nối "vẽ dần"; không parallax, không morphing |

**Màu:** chỉ dùng 6 token ở bảng trên — không lấy Terracotta/Warm Clay (Nature Distilled), Forest Green/Sky Blue (Organic Biophilic). **Chỉ light mode.**

**Chống AI-slop (bắt buộc):** không eyebrow lặp lại tiêu đề; tiêu đề section căn trái kiểu menu giấy (H2 + mô tả ngắn + đường kẻ mảnh); không lưới thẻ icon–tiêu đề–mô tả giống hệt nhau; không đánh số khi không có thứ tự thật; không huy hiệu nổi trang trí trên ảnh; không lặp cùng một câu ở nhiều chỗ; chỉ có ý nghĩa mới dùng icon.

**Tránh:** Parallax Storytelling (nặng, kém trên mobile), Anti-Polish/Raw, E-Ink/Paper (chỉ mượn chất giấy), Vintage Analog (film grain/VHS), Biomimetic/Organic 2.0 (neon, morphing), Exaggerated Minimalism (không hợp form), Soft UI Evolution (chỉ mượn bóng mềm cho card).

---

## 6. Cấu trúc trang (demo = 1 trang landing, điều hướng bằng anchor)

Thứ tự section:

1. **Header** (sticky): logo, menu anchor theo thứ tự trang (Giới thiệu · Dịch vụ · Combo · Bảng giá · Video · Liên hệ — bỏ "Không gian" vì section đã gỡ, thêm Combo & Video theo yêu cầu khách 12/11/2026), nút **"Đặt lịch"** nổi bật. Mobile: menu hamburger. **Trong phạm vi Hero**: ẩn nút gọi điện + "Đặt lịch" (không focus được — `inert`), menu dồn sát phải; **cuộn qua Hero**: hai nút hiện lại, menu trượt về giữa (animation `max-width` + `flex-grow`, tôn trọng reduced-motion). Nút menu mobile luôn hiện. **Mobile/tablet (< lg)**: header chỉ có logo + nút menu (bỏ nút "Đặt lịch" cạnh logo vì đã có trong menu và thanh liên hệ dưới); mở menu → **khoá cuộn trang** (mở lại khi đóng menu, Esc, hoặc khi màn hình lên desktop).
2. **Hero** (bố cục theo ảnh mẫu khách gửi 12/11/2026, bản 2): nền cream trơn. Trái: tiêu đề serif lớn 3 dòng ("Miên Spa" + slogan), 1 câu định vị (+ tagline từ sm), CTA chính **Đặt lịch ngay** + nút tròn có vòng viền gọi hotline (vị trí nút "play" của mẫu; mobile chỉ hiện vòng tròn, có aria-label). Phải: ảnh **`public/images/hero-img.jpg`** (→ `assets/images/hero-img.webp`, `IMG.heroImg`) trong khung bo cong lớn không đều, cặp ngôi sao phía trên-trái khung (đã bỏ dải băng giấy theo yêu cầu khách). Không dùng cành hoa khô của mẫu (quy tắc chống trang trí trôi nổi §5.1). Không số liệu, không ảnh oval/huy hiệu cũ. Vừa đúng 1 màn hình (mobile: khung ảnh co giãn lấp phần còn lại, chừa chỗ thanh liên hệ dưới). Ảnh Hero nổi bồng bềnh như trên mặt nước (`.water-float`: nhấp nhô + nghiêng nhẹ + trôi ngang 7s, tắt khi reduced-motion). Tiêu đề "Miên Spa / Nơi Tạo Nguồn Cảm Xúc" có hiệu ứng **VariableProximity** (React Bits, chuyển sang TS ở `components/ui/VariableProximity.tsx`, bọc bởi `HeroTitle`): chữ đậm dần (`wght` 400 → 900 của Playfair Display biến thiên) khi con trỏ/ngón tay lại gần, bán kính 140px; vị trí xuống dòng được "đóng băng" nên chữ đậm lên không làm nhảy dòng; trình đọc màn hình đọc nhãn đầy đủ (sr-only). **Chiều cao**: = 1 màn hình (trừ header) ở mobile/tablet/laptop; desktop lớn bị giới hạn (lg tối đa 880px, ≥1536px rộng tối đa 800px — yêu cầu khách 12/11/2026) để Hero không kéo cao theo màn hình mà lộ section kế tiếp như các section khác.
3. **Giới thiệu** (bố cục theo ảnh mẫu khách gửi 12/11/2026, đảo bên): **trái là cụm 4 ảnh** so le 2 cột (cao–thấp / thấp–cao, bo góc lớn không đều), mỗi ảnh ứng với 1 ý "Điều Miên chú trọng" (§4, `USPS` ↔ `ABOUT_TILES` cùng thứ tự); **hover/focus (chạm trên mobile) vào ảnh → lớp phủ màu token trượt lên + tiêu đề & mô tả ý đó hiện lần lượt**. **Phải**: tiêu đề "Cuối Tuần Là Để Yêu Bản Thân!", đoạn giới thiệu (§1), nút Đặt lịch ngay, "Liệu trình lý tưởng dành cho" dạng thẻ viên thuốc (thẻ "Người mỏi cổ, đau vai, căng gáy" tô sage — nhóm khách chính của dịch vụ cổ vai gáy).
4. **Dịch vụ nổi bật**: 5 dịch vụ chính (§3.1), bố cục băng chuyền theo ảnh mẫu khách gửi 12/11/2026 (`ServiceCarousel`): tiêu đề căn giữa; **thẻ giữa** chia đôi — trái là giá (lớn) + thời lượng, tên, mô tả, nút Đặt lịch; phải là ảnh. **Thẻ hai bên chỉ có ảnh**, nhỏ dần (2 thẻ mỗi bên). Desktop: section ghim (sticky) khi cuộn, mỗi ~55svh cuộn đưa dịch vụ tiếp theo vào giữa có animation; chấm điều hướng + bấm thẻ bên để nhảy tới. Mobile/tablet: dải thẻ vuốt ngang (scroll-snap), mỗi thẻ đủ ảnh + mô tả.
5. **Combo** (bố cục theo ảnh mẫu khách gửi 12/11/2026): tiêu đề **1 dòng** "Combo" (mảnh) "trọn gói" (đậm) **căn giữa**; 4 hàng so le zig-zag sát nhau (ảnh tỉ lệ 5:4 để gần bằng chiều cao thẻ), mỗi hàng = thẻ màu đậm (tên lớn bên trái; thời lượng, thành phần, giá căn phải; nút đặt) + ảnh thật lớn đổi bên, chồng 1 cột lên thẻ. Combo Chuyên Sâu ở hàng đầu, thẻ nâu `brand` + nhãn "Trải nghiệm VVIP cuối tuần" + 4 bước đánh số; các combo khác thẻ `sage`. **Hover** (chỉ thiết bị có chuột): mặc định **ẩn ảnh minh hoạ** (desktop), thẻ **giữ màu gốc** và **rộng full khung nội dung** (hover → thu về 3/4 có animation để nhường chỗ cho ảnh), ẩn khối chi tiết (thời lượng, thành phần, giá) kèm gợi ý "Di chuột để xem chi tiết"; khi rê chuột/focus bàn phím vào hàng → ảnh **trượt vào từ phía của nó** (ảnh phải trượt từ phải, ảnh trái từ trái), chi tiết trượt vào lần lượt. Màn cảm ứng luôn hiện ảnh + chi tiết (không có hover).
6. **Bảng giá đầy đủ** (bố cục theo ảnh mẫu "price list" khách gửi 12/11/2026): tiêu đề section **"Bảng giá"** ở đầu (`SectionHeading`), rồi **thanh tab 5 nhóm** theo §3.2 (tab Dịch vụ lẻ kèm khoảng giá), bên dưới là khung chia đôi — trái là **ảnh riêng của từng nhóm** (`PRICE_PANELS` trong `lib/images.ts`), **giữ nguyên màu gốc — không chữ, không lớp phủ** (mobile là dải ảnh ngang); phải là trang menu nền `sand` giấy kraft: logo + tên spa ở đầu, **chỉ hiển thị nhóm của tab đang chọn**: tiêu đề nhóm in hoa + đường kẻ, dòng "tên ····· giá" + ghi chú nhỏ (thời lượng / thành phần combo) — mobile: **giá cùng hàng với tên** (không chấm dẫn), ghi chú ở dòng dưới, thanh địa chỉ · hotline cuối trang. Bấm vào dòng = điền sẵn dịch vụ vào form. Ảnh tab "Cổ vai gáy & Foot" = kỹ thuật viên massage chân, tab "Dịch vụ lẻ" = kỹ thuật viên xếp khăn (ảnh chụp thật, không chữ — thay ảnh cũ bị mờ, 12/11/2026). (Banner Phiếu Quà Tặng đã được gỡ khỏi section này — 12/11/2026.)
7. **Quy trình trải nghiệm** (tài liệu khách yêu cầu làm rõ): Đặt lịch → Spa gọi xác nhận → Đón tiếp & tư vấn theo tình trạng → Trải nghiệm liệu trình → Thư giãn, dùng trà sau liệu trình. Bố cục theo ảnh mẫu infographic khách gửi 12/11/2026 (`ProcessPath`): desktop ≥ xl là đường chấm uốn lượn nối 5 vòng tròn icon so le, cạnh mỗi vòng là "BƯỚC 0x" + tiêu đề + mô tả, cuối đường có mũi tên; < xl là dòng thời gian dọc. **Hover (chạm trên cảm ứng)** vào 1 bước → đường liền chạy dọc đường chấm tới đúng bước đó + vòng ngoài icon bước đó hiện viền màu `brand` (vòng hở); mặc định không viền màu, không tiến trình.
   - **Video thực tế** (thêm 12/11/2026, ngay sau Quy trình, `components/sections/Videos.tsx` + `VideoGallery.tsx`): 7 video dọc 9:16 trong `public/images/Miên Spa Tuy Hòa/video` (`SPA_VIDEOS` trong `lib/images.ts`, poster = khung hình trích từ video, không có chữ in sẵn). Desktop: **hàng 1 bốn video, hàng 2 ba video căn giữa**; mobile cuộn ngang. Hover (chuột) → phát xem trước không tiếng 6s (chỉ tải khi hover); bấm → popup `<dialog>` phát video lớn (**không có nút đóng/trước/sau** — theo yêu cầu khách 12/11/2026; chuyển video bằng phím ← →, đóng bằng Esc hoặc bấm ra nền), lớp chữ phủ kéo tới tận đáy video (không hở dải), trả focus về thẻ. Nền `ink` (tối) để giữ nhịp xen kẽ nền giữa Quy trình (sand) và Liên hệ (cream). Tiêu đề video mô tả đúng nội dung đã xem — không bịa.
8. **Không gian**: gallery ảnh thật (`hinhAnh/`), có lightbox (đã có class `.lightbox-fade`); có thể chèn 1 video (`video/`).
9. **Khách hàng tại Miên**: ảnh khách (`hinhAnhKhachHang/`) dạng gallery — **không bịa lời nhận xét/tên/số sao**.
10. **Đặt lịch** (form — §7).
11. **Liên hệ**: địa chỉ, hotline, giờ mở cửa, Facebook, nút "Chỉ đường" (Google Maps), bản đồ nhúng nếu có.
12. **Footer**: logo, slogan, thông tin liên hệ, link Facebook, bản quyền.
13. **Nút nổi** (mọi màn hình, đặc biệt mobile): Gọi điện, Zalo, Messenger/Facebook.

---

## 7. Chức năng Đặt lịch (bắt buộc)

**Trường form**
| Trường | Bắt buộc | Ràng buộc |
|---|---|---|
| Họ tên | ✔ | 2–60 ký tự |
| Số điện thoại | ✔ | SĐT Việt Nam 10 số, bắt đầu bằng 0 (`^0\d{9}$`, cho phép nhập có khoảng trắng/dấu chấm rồi chuẩn hoá) |
| Dịch vụ / Combo | ✔ | Chọn từ danh sách lấy từ dữ liệu bảng giá (§3.2) — không gõ tay danh sách riêng |
| Phiên bản (Nam/Nữ, thời lượng) | Khi dịch vụ có nhiều mức | Lấy từ dữ liệu |
| Ngày | ✔ | Không chọn ngày quá khứ |
| Giờ | ✔ | Trong giờ mở cửa; giờ bắt đầu + thời lượng dịch vụ không vượt giờ đóng cửa |
| Số người | ✖ | 1–10, mặc định 1 |
| Ghi chú | ✖ | ≤ 500 ký tự (tình trạng cơ thể, yêu cầu riêng…) |

**Hành vi**
- Bấm "Đặt lịch" ở bất kỳ card dịch vụ nào → cuộn tới form và **điền sẵn dịch vụ**.
- Hiển thị giá tạm tính và thời lượng của dịch vụ đã chọn.
- Gửi thành công → thông báo: *"Miên Spa đã nhận yêu cầu của bạn và sẽ gọi lại để xác nhận lịch trong thời gian sớm nhất."* + gợi ý gọi/nhắn Zalo nếu cần gấp.
- Lỗi validate hiển thị ngay dưới trường, bằng tiếng Việt.
- Chống gửi trùng (disable nút khi đang gửi).
- **Backend:** chưa được chỉ định. Ở bản demo, form chỉ validate + hiển thị kết quả (không lưu dữ liệu thật). Nơi nhận dữ liệu thật (email / Google Sheet / Zalo OA / Telegram…) **phải hỏi lại sale/khách trước khi làm**.

---

## 8. Yêu cầu phi chức năng

- **Responsive:** đẹp ở 360px, 768px, 1024px, 1440px; không cuộn ngang.
- **Hiệu năng:** ảnh dùng `next/image` (có `sizes`, lazy-load ngoài màn hình đầu); video không tự tải toàn bộ khi chưa xem (`preload="none"` hoặc `metadata`). Video hiện có tới ~12MB/file → không đặt autoplay ở hero trên mobile.
- **SEO cơ bản:** `<html lang="vi">`, title/description tiếng Việt, Open Graph (ảnh + tiêu đề), dữ liệu cấu trúc `DaySpa`/`LocalBusiness` (tên, địa chỉ, SĐT, giờ mở cửa) — chỉ dùng thông tin trong tài liệu này.
- **Accessibility:** ảnh có `alt` tiếng Việt mô tả, độ tương phản chữ đạt WCAG AA, form có label, điều hướng được bằng bàn phím.
- **Chính tả tiếng Việt:** có dấu đầy đủ, viết hoa đúng tên riêng ("Miên Spa", "Tuy Hòa", "Đắk Lắk").

---

## 9. Quy tắc nội dung (điều cần tránh)

1. **Không bịa** giá, dịch vụ, thời lượng, địa chỉ, giờ, đánh giá, số liệu ("1000+ khách hàng", "10 năm kinh nghiệm"…), chứng nhận, tên nhân viên.
2. **Không quảng cáo y khoa / cam kết hiệu quả** (VD: "trị dứt điểm", "chữa bệnh", "100% hết nám"). Dùng ngôn từ thư giãn, chăm sóc, hỗ trợ.
3. **Không đưa các dịch vụ "điều trị mụn, thâm, nám; trẻ hoá, tái tạo da"** thành dịch vụ chính — các mục này nằm nhầm trong ô "Khách hàng mục tiêu" của phiếu và **không có trong bảng giá** (xem §10). Dịch vụ da mặt chỉ dùng đúng tên trong bảng giá.
4. Ảnh khách hàng chỉ dùng trong gallery, không gắn tên/lời nhận xét giả.
5. Thông tin đánh dấu ⚠ phải giữ ở **một chỗ** trong dữ liệu để sửa 1 lần khi spa xác nhận.

---

## 10. Mâu thuẫn & điểm cần xác nhận với sale/khách

| # | Vấn đề | Chi tiết | Xử lý tạm trên demo |
|---|---|---|---|
| 1 | **Địa chỉ / tỉnh** | Phiếu ghi "Phú Yên"; tài liệu khách: "21 Đường Điện Biên Phủ, Tuy Hòa, Phú Yên"; menu cũ: "Phường 7, TP Tuy Hoà"; menu mới + poster: "Phường Tuy Hòa, Đắk Lắk" (theo địa giới hành chính mới sau sáp nhập tỉnh) | Dùng bản mới nhất: **21 Điện Biên Phủ, Phường Tuy Hòa, Đắk Lắk** |
| 2 | **Giờ mở cửa** | Tài liệu khách: 08:00–21:00 (ghi "tham khảo, cần xác nhận"); poster cửa tiệm: "Open daily 09:00–21:00" | Dùng **09:00–21:00 hằng ngày** |
| 3 | **Hai bảng giá khác nhau** | Menu cũ (VD Xông khô 49k, Gội nhanh 45' 59k, Thái 450k, Đá nóng Nữ 90' 389k…) khác menu mới | Dùng **menu mới** (§3.2) |
| 4 | **Ô "Khách hàng mục tiêu" bị dán lẫn** | Chứa mục 2–5 (điều trị mụn/nám, trẻ hoá da…) — thiếu mục 1, có vẻ copy nhầm từ hồ sơ khác | Bỏ qua phần dịch vụ da, chỉ giữ mô tả khách hàng |
| 5 | **Hotline** | Poster cửa ghi "08.47.17.79.68" (có vẻ in sai); phiếu + menu: 0847 177 968 | Dùng **0847 177 968**, chờ xác nhận |
| 6 | **Facebook** | Tài liệu khách: "cần xác nhận đúng fanpage" | Dùng link trong phiếu, chờ xác nhận |
| 7 | Mã/nhúng bản đồ | Chỉ có link rút gọn, chưa có toạ độ/embed | Nút "Chỉ đường" mở link; embed bổ sung sau |
| 8 | Nơi nhận dữ liệu đặt lịch | Chưa có | Demo không lưu (xem §7) |
| 9 | Hạn giao demo | Trống ("SALE GHI HẠN") | Nhắc sale |

---

## 11. Tài nguyên trong dự án

| Đường dẫn | Nội dung | Dùng cho |
|---|---|---|
| `public/images/main-logo.jpg` | Logo gốc | Header, footer, favicon/OG |
| `public/images/Miên Spa Tuy Hòa/hinhAnh/*.jpg` (15 ảnh) | Ảnh không gian / chung | Hero, Giới thiệu, Không gian |
| `.../hinhAnh/HinhAnhDichVu/` (26 ảnh) | Ảnh dịch vụ | Card dịch vụ, combo |
| `.../hinhAnh/hinhAnhKhachHang/` (24 ảnh) | Ảnh khách tại spa | Gallery "Khách hàng tại Miên" |
| `.../hinhAnh/BangGia/` (3 ảnh) | Bảng giá + poster | Chỉ làm nguồn dữ liệu, không nhúng thay cho bảng giá HTML |
| `public/images/Miên Spa Tuy Hòa/video/` (7 video mp4) | Video Facebook | Section Không gian (tùy chọn) |

Nguồn gốc trên Drive (tham khảo): logo `drive.google.com/file/d/1kWf1_iTlYNNV8VNwk6XZSF0YBme-_AcI`, thư mục ảnh `drive.google.com/drive/folders/1d2WkkJLHXFEjES8SNPz9lKlZHH1k68X1`, nội dung `docs.google.com/document/d/1sYbSFOQViXcVPpCeP8TeEUHq8KZ-FNDYYrZ3KUV6BeU`.

---

## 12. Việc tồn đọng trong code hiện tại

- [x] `app/layout.tsx`: title/description tiếng Việt, `lang="vi"` (12/11/2026).
- [x] Font Playfair Display + Be Vietnam Pro (subset vietnamese).
- [x] `globals.css`: token màu §5, bỏ dark mode.
- [x] Landing page đủ các section §6 + form đặt lịch §7 (bản demo).
- [ ] Chờ xác nhận các mục ở §10 (địa chỉ, giờ, hotline, fanpage).
- [ ] Kiểm tra nội dung video `video/FDown.vn_Tai_video_Facebook_720p (HD)_1945.mp4` đang dùng ở section Không gian.
- [ ] Nơi nhận dữ liệu đặt lịch thật (§7) — hiện chỉ mô phỏng gửi.
- [ ] Đặt `metadataBase` khi có tên miền chính thức (ảnh Open Graph cần URL tuyệt đối).

---

## 13. Tiêu chí nghiệm thu demo

- [ ] Đủ các section ở §6, đúng thứ tự, chạy tốt trên mobile và desktop.
- [ ] 5 dịch vụ chính hiển thị đúng tên, thời lượng, giá theo §3.
- [ ] Bảng giá đầy đủ khớp 100% §3.2.
- [ ] Form đặt lịch đủ trường và ràng buộc §7; nút đặt lịch ở card điền sẵn dịch vụ.
- [ ] Nút gọi / Zalo / Facebook hoạt động trên điện thoại.
- [ ] Không có nội dung vi phạm §9.
- [ ] `npm run build` và `npm run lint` không lỗi.
