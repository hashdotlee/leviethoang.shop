"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { FiHeart, FiMessageCircle, FiMapPin } from "react-icons/fi"
import { FaHeart } from "react-icons/fa"
import AdSense from "@/components/AdSense"
import PostCard from "@/components/PostCard"

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
}

interface Comment {
  id: string
  content: string
  createdAt: string
  user: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: session } = useSession()
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [similarPosts, setSimilarPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [submittingComment, setSubmittingComment] = useState(false)
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT

  useEffect(() => {
    fetchPost()
    fetchComments()
    fetchSimilarPosts()
  }, [params.id])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`)
      const data = await response.json()
      setPost(data)
      setLikesCount(data._count.likes)

      if (session?.user) {
        const likeResponse = await fetch(`/api/posts/${params.id}/like-status`)
        const likeData = await likeResponse.json()
        setIsLiked(likeData.isLiked)
      }
    } catch (error) {
      console.error("Error fetching post:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}/comments`)
      const data = await response.json()
      setComments(data)
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const fetchSimilarPosts = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}/similar`)
      const data = await response.json()
      setSimilarPosts(data)
    } catch (error) {
      console.error("Error fetching similar posts:", error)
    }
  }

  const handleLike = async () => {
    if (!session) {
      router.push("/login")
      return
    }

    try {
      const response = await fetch(`/api/posts/${params.id}/like`, {
        method: "POST",
      })

      if (response.ok) {
        const newIsLiked = !isLiked
        setIsLiked(newIsLiked)
        setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1)
      }
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      router.push("/login")
      return
    }

    if (!newComment.trim()) return

    setSubmittingComment(true)
    try {
      const response = await fetch(`/api/posts/${params.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      })

      if (response.ok) {
        setNewComment("")
        fetchComments()
        fetchPost() // Refresh to update comment count
      }
    } catch (error) {
      console.error("Error posting comment:", error)
    } finally {
      setSubmittingComment(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Không tìm thấy bài đăng</p>
      </div>
    )
  }

  const images = post.images ? JSON.parse(post.images) : []

  return (
    <div className="min-h-screen bg-gray-50">
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
            {/* Post Detail */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              {/* Images */}
              {images.length > 0 && (
                <div className="relative h-96 bg-gray-200">
                  <img
                    src={images[0]}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {post.condition}
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                    <p className="text-3xl font-bold text-blue-600 mb-4">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(post.price)}
                    </p>
                  </div>
                </div>

                {post.location && (
                  <div className="flex items-center text-gray-600 mb-4">
                    <FiMapPin className="mr-2" />
                    <span>{post.location}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h2 className="text-lg font-semibold mb-2">Mô tả</h2>
                  <p className="text-gray-700 whitespace-pre-wrap">{post.description}</p>
                </div>

                {/* User Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      {post.user.image ? (
                        <img src={post.user.image} alt={post.user.name || ""} className="w-full h-full rounded-full" />
                      ) : (
                        <span className="text-lg font-medium text-gray-600">
                          {(post.user.name || post.user.email || "U")[0].toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{post.user.name || "User"}</p>
                      <p className="text-sm text-gray-500" suppressHydrationWarning>
                        {formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                          locale: vi,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <button
                      onClick={handleLike}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition"
                    >
                      {isLiked ? (
                        <FaHeart className="text-red-500 text-xl" />
                      ) : (
                        <FiHeart className="text-xl" />
                      )}
                      <span className="font-medium">{likesCount}</span>
                    </button>

                    <div className="flex items-center space-x-2 text-gray-600">
                      <FiMessageCircle className="text-xl" />
                      <span className="font-medium">{post._count.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Bình luận ({comments.length})</h2>

              {/* Comment Form */}
              {session ? (
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Viết bình luận..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={submittingComment || !newComment.trim()}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {submittingComment ? "Đang gửi..." : "Gửi bình luận"}
                  </button>
                </form>
              ) : (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600">
                    Vui lòng{" "}
                    <button
                      onClick={() => router.push("/login")}
                      className="text-blue-600 hover:underline"
                    >
                      đăng nhập
                    </button>{" "}
                    để bình luận
                  </p>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      {comment.user.image ? (
                        <img src={comment.user.image} alt={comment.user.name || ""} className="w-full h-full rounded-full" />
                      ) : (
                        <span className="text-sm font-medium text-gray-600">
                          {(comment.user.name || comment.user.email || "U")[0].toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="font-medium text-gray-900 text-sm">
                          {comment.user.name || "User"}
                        </p>
                        <p className="text-gray-700 mt-1">{comment.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 ml-3" suppressHydrationWarning>
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                          locale: vi,
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {comments.length === 0 && (
                  <p className="text-center text-gray-500">Chưa có bình luận nào</p>
                )}
              </div>
            </div>

            {/* Similar Posts */}
            {similarPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Sản phẩm tương tự</h2>
                <div className="space-y-6">
                  {similarPosts.map((similarPost) => (
                    <PostCard key={similarPost.id} post={similarPost} />
                  ))}
                </div>
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
