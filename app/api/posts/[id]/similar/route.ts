import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // First get the current post to know its category
    const currentPost = await prisma.post.findUnique({
      where: { id },
      select: { category: true },
    })

    if (!currentPost) {
      return NextResponse.json([])
    }

    // Find similar posts (same category, different id)
    const similarPosts = await prisma.post.findMany({
      where: {
        category: currentPost.category,
        id: { not: id },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    })

    return NextResponse.json(similarPosts)
  } catch (error) {
    console.error("Error fetching similar posts:", error)
    return NextResponse.json(
      { error: "Đã xảy ra lỗi" },
      { status: 500 }
    )
  }
}
