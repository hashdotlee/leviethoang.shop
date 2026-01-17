import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Bạn cần đăng nhập" },
        { status: 401 }
      )
    }

    const postId = id

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: session.user.id,
        },
      },
    })

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      })
      return NextResponse.json({ liked: false })
    } else {
      // Like
      await prisma.like.create({
        data: {
          postId,
          userId: session.user.id,
        },
      })
      return NextResponse.json({ liked: true })
    }
  } catch (error) {
    console.error("Error toggling like:", error)
    return NextResponse.json(
      { error: "Đã xảy ra lỗi" },
      { status: 500 }
    )
  }
}
