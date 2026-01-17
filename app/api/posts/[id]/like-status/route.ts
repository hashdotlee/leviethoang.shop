import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ isLiked: false })
    }

    const like = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: id,
          userId: session.user.id,
        },
      },
    })

    return NextResponse.json({ isLiked: !!like })
  } catch (error) {
    console.error("Error checking like status:", error)
    return NextResponse.json(
      { error: "Đã xảy ra lỗi" },
      { status: 500 }
    )
  }
}
