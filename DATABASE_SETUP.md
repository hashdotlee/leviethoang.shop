# Hướng dẫn Setup Database

## 📋 Yêu cầu

- Node.js 18+
- PostgreSQL database (khuyến nghị dùng Supabase hoặc Neon)
- npm hoặc yarn

## 🚀 Bước 1: Tạo Database

### Dùng Supabase (Khuyến nghị - Miễn phí)

1. Truy cập [https://supabase.com](https://supabase.com)
2. Đăng ký tài khoản miễn phí
3. Tạo project mới
4. Vào **Project Settings** → **Database**
5. Copy **Connection string** (cả Transaction mode và Session mode)

### Dùng Neon (Alternative - Cũng miễn phí)

1. Truy cập [https://neon.tech](https://neon.tech)
2. Đăng ký tài khoản
3. Tạo project mới
4. Copy connection string

## 🔧 Bước 2: Cấu hình Environment Variables

1. Mở file `.env.local` (đã được tạo sẵn)
2. Thay thế các giá trị sau:

```env
# Thay [YOUR-PASSWORD] bằng password database của bạn
# Thay [YOUR-PROJECT-REF] bằng project reference từ Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Tạo NEXTAUTH_SECRET bằng lệnh:
# openssl rand -base64 32
NEXTAUTH_SECRET="your-generated-secret-here"
```

### Ví dụ cụ thể:

```env
DATABASE_URL="postgresql://postgres:myPassword123@abc-xyz-123.supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:myPassword123@abc-xyz-123.supabase.co:5432/postgres"
NEXTAUTH_SECRET="xK8vL2mN9pQ4rS5tU6vW7xY8zA1bC2dE3fG4hI5jK6lM7nO8pQ9rS0="
NEXTAUTH_URL="http://localhost:3000"
```

## 📦 Bước 3: Cài đặt Dependencies

```bash
npm install
```

## 🗄️ Bước 4: Chạy Migration

### Option 1: Migrate và Seed (Khuyến nghị cho lần đầu)

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database với dữ liệu mẫu
npm run db:seed
```

### Option 2: Dùng Migration (Production-ready)

```bash
# Generate Prisma Client
npm run db:generate

# Chạy migration
npm run db:migrate

# Seed tự động chạy sau migrate
```

## ✅ Bước 5: Kiểm tra

Mở Prisma Studio để xem dữ liệu:

```bash
npm run db:studio
```

Truy cập: [http://localhost:5555](http://localhost:5555)

## 📊 Dữ liệu mẫu đã được tạo

Sau khi seed, database sẽ có:

- **4 Users** (email: nguyenvana@example.com, tranthib@example.com, levanc@example.com, phamthid@example.com)
  - Password cho tất cả users: `password123`
- **12 Posts** (sản phẩm secondhand):
  - 3 bài đồ Nhật (Uniqlo, Muji, đồ sứ)
  - 2 bài đồ Âu (Zara, Adidas)
  - 2 bài thời trang (váy vintage, áo khoác Levi's)
  - 3 bài điện tử (iPhone 12 Pro, MacBook Air M1, Sony WH-1000XM4)
  - 2 bài khác (bàn làm việc, sách)
- **8 Comments** trên các posts
- **13 Likes** trên các posts

## 🔄 Scripts có sẵn

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (không tạo migration)
npm run db:push

# Tạo migration mới
npm run db:migrate

# Deploy migrations (production)
npm run db:migrate:deploy

# Seed database
npm run db:seed

# Mở Prisma Studio
npm run db:studio

# Reset database (XÓA TẤT CẢ DỮ LIỆU)
npm run db:reset
```

## ⚠️ Lưu ý

1. **KHÔNG commit** file `.env.local` lên git (đã có trong .gitignore)
2. File `.env.example` là template, dùng để tham khảo
3. Để reset database và seed lại: `npm run db:reset`
4. Migration lock file đang dùng PostgreSQL provider

## 🐛 Troubleshooting

### Lỗi: "Environment variable not found"

→ Kiểm tra lại file `.env.local` có đúng format chưa

### Lỗi: "Can't reach database server"

→ Kiểm tra connection string có đúng không
→ Kiểm tra database có đang chạy không

### Lỗi: "Migration failed"

→ Thử dùng `npm run db:push` thay vì `db:migrate`
→ Hoặc reset database: `npm run db:reset`

### Lỗi khi seed: "Foreign key constraint"

→ Chạy `npm run db:reset` để xóa hết dữ liệu cũ
→ Sau đó chạy lại `npm run db:seed`

## 📚 Tài liệu tham khảo

- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next-Auth with Prisma](https://next-auth.js.org/adapters/prisma)
