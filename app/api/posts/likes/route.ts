import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json([])
    }

    const likes = await prisma.like.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        postId: true,
      },
    })

    return NextResponse.json(likes)
  } catch (error) {
    console.error("Error fetching likes:", error)
    return NextResponse.json(
      { error: "Đã xảy ra lỗi" },
      { status: 500 }
    )
  }
}
