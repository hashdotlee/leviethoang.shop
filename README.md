# 2Hand Market - Marketplace đồ Secondhand Nhật & Âu

Website marketplace cho mua bán đồ secondhand Nhật Bản và Âu Mỹ.

## Tính năng

- ✅ Đăng ký / Đăng nhập người dùng
- ✅ Đăng bài bán sản phẩm (form thủ công hoặc tự động từ text)
- ✅ Feed hiển thị sản phẩm theo kiểu Facebook
- ✅ Lọc sản phẩm theo nguồn gốc (Nhật Bản, Âu Mỹ, Hàn Quốc)
- ✅ Like bài đăng
- ✅ Bình luận trên mỗi bài
- ✅ Gợi ý sản phẩm tương tự
- ✅ Quảng cáo Google AdSense (2 bên sidebar)
- ✅ Thiết kế đơn giản, tập trung vào sản phẩm

## Tech Stack

- **Framework**: Next.js 16 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **UI Icons**: React Icons
- **Hosting**: Vercel

## Setup Supabase

1. Tạo project mới trên [Supabase](https://supabase.com)
2. Vào **Project Settings** → **Database** → **Connection string**
3. Copy **Connection pooling** URL (Transaction mode - port 6543)
4. Copy **Direct connection** URL (Session mode - port 5432)
5. Paste vào file `.env`:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

## Cài đặt Local

```bash
# Clone repository
git clone <your-repo-url>
cd leviethoang.shop

# Install dependencies
npm install

# Copy .env.example to .env and fill in your Supabase credentials
cp .env.example .env

# Setup database
npx prisma generate
npx prisma migrate dev

# Run development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## Deploy lên Vercel

### Deploy qua Vercel Dashboard

1. Push code lên GitHub
2. Import project vào [Vercel](https://vercel.com)
3. Thêm Environment Variables trong Vercel:
   - `DATABASE_URL` (Connection pooling URL từ Supabase)
   - `DIRECT_URL` (Direct connection URL từ Supabase)
   - `NEXTAUTH_SECRET` (generate: `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (URL của Vercel deployment)
4. Deploy!

### Deploy qua CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add DATABASE_URL
vercel env add DIRECT_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL

# Deploy to production
vercel --prod
```

### Chạy migrations trên Production

```bash
# Set production database URL
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

## Cấu trúc dự án

```
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth endpoints
│   │   ├── posts/        # Post CRUD & interactions
│   │   └── register/     # User registration
│   ├── posts/            # Post pages
│   │   ├── [id]/         # Post detail page
│   │   └── create/       # Create post page
│   ├── login/            # Login page
│   ├── register/         # Register page
│   └── page.tsx          # Homepage (feed)
├── components/           # React components
│   ├── AdSense.tsx       # Google AdSense component
│   ├── Navbar.tsx        # Navigation bar
│   ├── PostCard.tsx      # Post card component
│   └── Providers.tsx     # NextAuth provider
├── lib/                  # Utilities
│   ├── auth.ts           # NextAuth configuration
│   └── prisma.ts         # Prisma client
├── prisma/              # Database schema & migrations
│   ├── migrations/       # Database migrations
│   └── schema.prisma     # Database schema
└── types/               # TypeScript types
```

## Database Schema

```prisma
- User (id, name, email, password)
- Post (id, title, description, price, condition, category, images, location)
- Comment (id, content, postId, userId)
- Like (id, postId, userId)
```

## Tích hợp Google AdSense

1. Đăng ký [Google AdSense](https://www.google.com/adsense/)
2. Lấy mã publisher ID
3. Cập nhật component `components/AdSense.tsx` với mã AdSense của bạn

## Scripts

```bash
npm run dev          # Chạy development server
npm run build        # Build cho production
npm start            # Chạy production server
npm run lint         # Lint code
```

## License

MIT
