import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Bắt đầu seed database...')

  // Xóa dữ liệu cũ (nếu có)
  await prisma.like.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Đã xóa dữ liệu cũ')

  // Tạo mật khẩu hash cho users
  const hashedPassword = await hash('password123', 10)

  // Tạo users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        password: hashedPassword,
        image: 'https://i.pravatar.cc/150?u=nguyenvana',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        password: hashedPassword,
        image: 'https://i.pravatar.cc/150?u=tranthib',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Lê Văn C',
        email: 'levanc@example.com',
        password: hashedPassword,
        image: 'https://i.pravatar.cc/150?u=levanc',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Phạm Thị D',
        email: 'phamthid@example.com',
        password: hashedPassword,
        image: 'https://i.pravatar.cc/150?u=phamthid',
      },
    }),
  ])

  console.log(`✅ Đã tạo ${users.length} users`)

  // Tạo posts (đồ secondhand)
  const posts = await Promise.all([
    // Đồ Nhật
    prisma.post.create({
      data: {
        title: 'Áo thun Uniqlo Nhật size M',
        description: 'Áo thun Uniqlo chính hãng từ Nhật, màu đen, chất liệu cotton 100%, mặc rất thoải mái. Tình trạng 95% như mới, không phai màu, không giãn cổ.',
        price: 150000,
        condition: 'Đã qua sử dụng - Như mới',
        category: 'Đồ Nhật',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400',
        ]),
        location: 'Quận 1, TP.HCM',
        userId: users[0].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Túi xách Muji Nhật - màu be',
        description: 'Túi xách vải canvas Muji chính hãng, size lớn, có thể đựng laptop 13 inch. Chất liệu bền đẹp, có nhiều ngăn nhỏ tiện lợi.',
        price: 280000,
        condition: 'Đã qua sử dụng',
        category: 'Đồ Nhật',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400',
        ]),
        location: 'Quận 3, TP.HCM',
        userId: users[1].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Bát đĩa sứ Nhật hoa văn truyền thống',
        description: 'Set bát đĩa sứ Nhật Bản, họa tiết hoa văn truyền thống rất đẹp. Gồm 4 bát, 4 đĩa, 4 đôi đũa. Không sứt mẻ, còn rất mới.',
        price: 450000,
        condition: 'Như mới',
        category: 'Đồ Nhật',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400',
        ]),
        location: 'Quận 7, TP.HCM',
        userId: users[2].id,
      },
    }),

    // Đồ Âu
    prisma.post.create({
      data: {
        title: 'Áo sơ mi Zara size L - hàng Châu Âu',
        description: 'Áo sơ mi Zara chính hãng từ Châu Âu, form dáng đẹp, chất liệu cao cấp. Màu trắng basic, dễ phối đồ. Chỉ mặc vài lần.',
        price: 320000,
        condition: 'Đã qua sử dụng - Như mới',
        category: 'Đồ Âu',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400',
        ]),
        location: 'Quận Bình Thạnh, TP.HCM',
        userId: users[0].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Giày thể thao Adidas Originals',
        description: 'Giày Adidas Originals chính hãng, size 42, màu trắng đen cổ điển. Mua tại store Châu Âu, có bill. Tình trạng đẹp 90%.',
        price: 1200000,
        condition: 'Đã qua sử dụng',
        category: 'Đồ Âu',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
        ]),
        location: 'Quận 10, TP.HCM',
        userId: users[3].id,
      },
    }),

    // Thời trang
    prisma.post.create({
      data: {
        title: 'Váy hoa vintage style Hàn Quốc',
        description: 'Váy hoa nhẹ nhàng, phong cách vintage Hàn Quốc, rất xinh và nữ tính. Size S-M, phù hợp cao 1m55-1m65. Chất vải mềm mại, thoáng mát.',
        price: 180000,
        condition: 'Như mới',
        category: 'Thời trang',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
        ]),
        location: 'Hà Nội',
        userId: users[1].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Áo khoác jean nam thương hiệu Levi\'s',
        description: 'Áo khoác jean Levi\'s chính hãng, màu xanh đậm, size XL. Chất liệu denim cao cấp, bền đẹp. Hơi oversized, phong cách Hàn Quốc.',
        price: 650000,
        condition: 'Đã qua sử dụng',
        category: 'Thời trang',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400',
        ]),
        location: 'Đà Nẵng',
        userId: users[2].id,
      },
    }),

    // Đồ điện tử
    prisma.post.create({
      data: {
        title: 'iPhone 12 Pro 128GB - Đẹp như mới',
        description: 'iPhone 12 Pro màu xanh dương, bộ nhớ 128GB. Pin 89%, máy đẹp 98%, không trầy xước. Fullbox, còn sạc cáp zin. Bảo hành 6 tháng tại cửa hàng.',
        price: 12500000,
        condition: 'Đã qua sử dụng - Như mới',
        category: 'Đồ điện tử',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400',
          'https://images.unsplash.com/photo-1603891117606-257c141f2f65?w=400',
        ]),
        location: 'Quận 1, TP.HCM',
        userId: users[3].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'MacBook Air M1 2020 - 256GB',
        description: 'MacBook Air M1 chip, RAM 8GB, SSD 256GB. Máy đẹp long lanh, pin 100%, cycle count chỉ 45. Fullbox kèm sạc zin. Bảo hành Apple còn 3 tháng.',
        price: 18000000,
        condition: 'Như mới',
        category: 'Đồ điện tử',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        ]),
        location: 'Quận 2, TP.HCM',
        userId: users[0].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Tai nghe Sony WH-1000XM4 - Chống ồn',
        description: 'Tai nghe Sony WH-1000XM4 chống ồn chủ động hàng đầu. Âm thanh cực đỉnh, pin 30h, có ANC và Ambient mode. Fullbox, bảo hành chính hãng 10 tháng.',
        price: 5200000,
        condition: 'Đã qua sử dụng',
        category: 'Đồ điện tử',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
        ]),
        location: 'Hà Nội',
        userId: users[1].id,
      },
    }),

    // Đồ gia dụng / khác
    prisma.post.create({
      data: {
        title: 'Bàn làm việc gỗ tự nhiên - 1m2',
        description: 'Bàn làm việc gỗ tự nhiên, kích thước 120x60cm, cao 75cm. Chất liệu gỗ sồi cao cấp, thiết kế tối giản, hiện đại. Tình trạng 95%.',
        price: 1800000,
        condition: 'Đã qua sử dụng - Như mới',
        category: 'Đồ gia dụng',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400',
        ]),
        location: 'Quận Tân Bình, TP.HCM',
        userId: users[2].id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Sách "Sapiens" - Lược sử loài người',
        description: 'Sách Sapiens của Yuval Noah Harari, bản tiếng Việt. Tình trạng còn mới 99%, chưa gấp góc, chưa highlight. Một trong những cuốn sách hay nhất về lịch sử nhân loại.',
        price: 95000,
        condition: 'Như mới',
        category: 'Sách',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        ]),
        location: 'Hà Nội',
        userId: users[3].id,
      },
    }),
  ])

  console.log(`✅ Đã tạo ${posts.length} posts`)

  // Tạo comments
  const comments = await Promise.all([
    prisma.comment.create({
      data: {
        content: 'Áo còn không bạn? Mình muốn mua ạ!',
        postId: posts[0].id,
        userId: users[1].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Còn hàng nhé bạn, inbox mình nha!',
        postId: posts[0].id,
        userId: users[0].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Túi có thể ship về Hà Nội không ạ?',
        postId: posts[1].id,
        userId: users[2].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Giày này đi rất thoải mái, đáng giá!',
        postId: posts[4].id,
        userId: users[0].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Pin còn khoẻ không bạn? Có test pin không?',
        postId: posts[7].id,
        userId: users[2].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Pin 89% bạn nha, có hình test pin luôn!',
        postId: posts[7].id,
        userId: users[3].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'MacBook này quá đỉnh với giá này!',
        postId: posts[8].id,
        userId: users[1].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Sách còn không bạn? Mình ở gần, có thể gặp trực tiếp',
        postId: posts[11].id,
        userId: users[0].id,
      },
    }),
  ])

  console.log(`✅ Đã tạo ${comments.length} comments`)

  // Tạo likes
  const likes = await Promise.all([
    // Likes for post 0 (Áo Uniqlo)
    prisma.like.create({
      data: {
        postId: posts[0].id,
        userId: users[1].id,
      },
    }),
    prisma.like.create({
      data: {
        postId: posts[0].id,
        userId: users[2].id,
      },
    }),
    // Likes for post 1 (Túi Muji)
    prisma.like.create({
      data: {
        postId: posts[1].id,
        userId: users[0].id,
      },
    }),
    prisma.like.create({
      data: {
        postId: posts[1].id,
        userId: users[3].id,
      },
    }),
    // Likes for iPhone
    prisma.like.create({
      data: {
        postId: posts[7].id,
        userId: users[0].id,
      },
    }),
    prisma.like.create({
      data: {
        postId: posts[7].id,
        userId: users[1].id,
      },
    }),
    prisma.like.create({
      data: {
        postId: posts[7].id,
        userId: users[2].id,
      },
    }),
    // Likes for MacBook
    prisma.like.create({
      data: {
        postId: posts[8].id,
        userId: users[1].id,
      },
    }),
    prisma.like.create({
      data: {
        postId: posts[8].id,
        userId: users[2].id,
      },
    }),
    prisma.like.create({
      data: {
        postId: posts[8].id,
        userId: users[3].id,
      },
    }),
    // Random likes for other posts
    prisma.like.create({
      data: {
        postId: posts[2].id,
        userId: users[0].id,
      },
    }),
    prisma.like.create({
      data: {
        postId: posts[5].id,
        userId: users[2].id,
      },
    }),
    prisma.like.create({
      data: {
        postId: posts[9].id,
        userId: users[0].id,
      },
    }),
  ])

  console.log(`✅ Đã tạo ${likes.length} likes`)

  console.log('')
  console.log('🎉 Seed database hoàn tất!')
  console.log(`📊 Tổng kết:`)
  console.log(`   - Users: ${users.length}`)
  console.log(`   - Posts: ${posts.length}`)
  console.log(`   - Comments: ${comments.length}`)
  console.log(`   - Likes: ${likes.length}`)
  console.log('')
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
