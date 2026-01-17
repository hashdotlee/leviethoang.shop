# Hướng dẫn Setup Google AdSense

## Bước 1: Đăng ký Google AdSense

1. Truy cập https://www.google.com/adsense/
2. Đăng nhập với tài khoản Google
3. Nhập thông tin website của bạn
4. Điền thông tin cá nhân và thanh toán

## Bước 2: Lấy Publisher ID

1. Đăng nhập vào AdSense: https://www.google.com/adsense/
2. Vào **Account** → **Account information**
3. Copy **Publisher ID** (có dạng `ca-pub-1234567890123456`)

## Bước 3: Cấu hình trong project

### 3.1. Cập nhật Environment Variables

Thêm vào file `.env`:

```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-YOUR-ACTUAL-ID-HERE"
```

**Lưu ý:** Thay `ca-pub-YOUR-ACTUAL-ID-HERE` bằng Publisher ID thực của bạn.

### 3.2. Cập nhật file ads.txt

Mở file `public/ads.txt` và thay đổi:

```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Thành:

```
google.com, pub-YOUR-ACTUAL-ID, DIRECT, f08c47fec0942fa0
```

Ví dụ: Nếu Publisher ID của bạn là `ca-pub-1234567890123456`, thì:

```
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
```

### 3.3. Thêm Meta Tag (Tùy chọn)

Nếu Google yêu cầu verify bằng meta tag, mở `app/layout.tsx` và uncomment phần sau:

```typescript
export const metadata: Metadata = {
  title: "2Hand Market - Mua bán đồ secondhand Nhật, Âu",
  description: "Nền tảng mua bán đồ secondhand Nhật Bản và Âu Mỹ",
  other: {
    'google-adsense-account': 'ca-pub-YOUR-ACTUAL-ID',
  },
};
```

## Bước 4: Deploy lên Production

### 4.1. Deploy lên Vercel

```bash
# Push code lên GitHub
git add .
git commit -m "Add Google AdSense integration"
git push

# Deploy lên Vercel
vercel --prod
```

### 4.2. Thêm Environment Variable trên Vercel

1. Vào Vercel Dashboard → Chọn project
2. Vào **Settings** → **Environment Variables**
3. Thêm biến mới:
   - **Name**: `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
   - **Value**: `ca-pub-YOUR-ACTUAL-ID`
   - **Environments**: Production, Preview, Development
4. Nhấn **Save**
5. Redeploy project

## Bước 5: Verify trên Google AdSense

### 5.1. Xác minh trang web

1. Đăng nhập vào AdSense
2. Vào **Sites** → **Add site**
3. Nhập domain của bạn (ví dụ: `yourdomain.vercel.app`)
4. Google sẽ kiểm tra:
   - ✅ Mã AdSense đã được thêm vào website
   - ✅ File `ads.txt` có đúng định dạng
   - ✅ Website đã được deploy

### 5.2. Các phương thức verify

Google AdSense có thể yêu cầu verify bằng một trong các cách sau:

#### A. Mã AdSense (Đã cài đặt)

- Mã script đã được thêm vào `app/layout.tsx`
- Google sẽ tự động phát hiện sau khi deploy

#### B. File ads.txt (Đã cài đặt)

- File đã được tạo tại `public/ads.txt`
- Kiểm tra bằng cách truy cập: `https://yourdomain.com/ads.txt`
- Nội dung phải hiển thị đúng Publisher ID của bạn

#### C. Meta tag (Tùy chọn)

Nếu Google cung cấp mã meta tag, thêm vào `app/layout.tsx`:

```typescript
other: {
  'google-adsense-account': 'ca-pub-YOUR-ACTUAL-ID',
}
```

### 5.3. Kiểm tra trạng thái

1. Vào AdSense Dashboard
2. Kiểm tra **Sites** → Trạng thái website
3. Đợi Google review (có thể mất vài giờ đến vài ngày)

## Bước 6: Tạo Ad Units

Sau khi website được approve:

1. Vào AdSense Dashboard → **Ads** → **By ad unit**
2. Nhấn **New ad unit**
3. Chọn loại quảng cáo:
   - **Display ads**: Quảng cáo hiển thị thông thường
   - **In-feed ads**: Quảng cáo trong feed
   - **In-article ads**: Quảng cáo trong bài viết
4. Copy **Ad slot ID** (có dạng `1234567890`)
5. Sử dụng trong component:

```tsx
<AdSense slot="1234567890" format="auto" />
```

## Bước 7: Kiểm tra Ads đang hiển thị

### Development (localhost)

- Ads thường không hiển thị trên localhost
- Sẽ thấy placeholder hoặc blank space

### Production

1. Truy cập website production
2. Mở Developer Tools → Console
3. Kiểm tra không có lỗi AdSense
4. Ads sẽ hiển thị sau vài phút

**Lưu ý:**
- Ads có thể mất 10-30 phút mới hiển thị sau khi deploy
- Không click quá nhiều vào ads của chính bạn (vi phạm chính sách Google)

## Troubleshooting

### 1. Ads không hiển thị

- ✅ Kiểm tra `NEXT_PUBLIC_ADSENSE_CLIENT_ID` đã đúng chưa
- ✅ Kiểm tra file `ads.txt` có accessible không: `yourdomain.com/ads.txt`
- ✅ Đợi 10-30 phút sau khi deploy
- ✅ Xóa cache browser và reload

### 2. Console hiển thị lỗi

```
AdSense: Tag not found
```

→ Kiểm tra lại Publisher ID trong `.env`

```
AdSense: No inventory available
```

→ Website chưa được approve hoặc chưa có ad inventory

### 3. Website chưa được approve

- Đảm bảo website có đủ nội dung (ít nhất 20-30 posts)
- Nội dung phải tuân thủ [Google AdSense Program Policies](https://support.google.com/adsense/answer/48182)
- Chờ Google review (1-3 ngày)

## Resources

- [Google AdSense Help Center](https://support.google.com/adsense/)
- [AdSense Program Policies](https://support.google.com/adsense/answer/48182)
- [ads.txt Guide](https://support.google.com/adsense/answer/7532444)
