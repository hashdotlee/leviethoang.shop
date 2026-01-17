"use client"

import { useEffect, useState } from "react"
import PostCard from "@/components/PostCard"
import AdSense from "@/components/AdSense"
import { useSession } from "next-auth/react"

interface Post {
  id: string
  title: string
  description: string
  price: number
  condition: string
  category: string
  images: string
  location: string | null
  createdAt: string
  user: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
  _count: {
    comments: number
    likes: number
  }
  isLiked?: boolean
}

export default function Home() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT

  useEffect(() => {
    fetchPosts()
  }, [filter])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const url = filter === "all" ? "/api/posts" : `/api/posts?category=${filter}`
      const response = await fetch(url)
      const data = await response.json()

      // Fetch likes if user is logged in
      if (session?.user) {
        const likesResponse = await fetch("/api/posts/likes")
        const likesData = await likesResponse.json()
        const likedPostIds = new Set(likesData.map((like: any) => like.postId))

        const postsWithLikes = data.map((post: Post) => ({
          ...post,
          isLiked: likedPostIds.has(post.id),
        }))

        setPosts(postsWithLikes)
      } else {
        setPosts(data)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-20">
              {adSlot ? <AdSense slot={adSlot} /> : null}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Filter Bar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg transition ${
                    filter === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setFilter("Nhật Bản")}
                  className={`px-4 py-2 rounded-lg transition ${
                    filter === "Nhật Bản"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Nhật Bản
                </button>
                <button
                  onClick={() => setFilter("Âu Mỹ")}
                  className={`px-4 py-2 rounded-lg transition ${
                    filter === "Âu Mỹ"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Âu Mỹ
                </button>
                <button
                  onClick={() => setFilter("Hàn Quốc")}
                  className={`px-4 py-2 rounded-lg transition ${
                    filter === "Hàn Quốc"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Hàn Quốc
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Đang tải...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg">Chưa có sản phẩm nào</p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} onLikeToggle={fetchPosts} />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar - Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-20">
              {adSlot ? <AdSense slot={adSlot} /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
