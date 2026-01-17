"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { FiHeart, FiMessageCircle, FiEye } from "react-icons/fi"
import { FaHeart } from "react-icons/fa"
import Link from "next/link"

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

interface PostCardProps {
  post: Post
  onLikeToggle?: (postId: string, isLiked: boolean) => void
}

export default function PostCard({ post, onLikeToggle }: PostCardProps) {
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [likesCount, setLikesCount] = useState(post._count.likes)

  const images = post.images ? JSON.parse(post.images) : []
  const mainImage = images[0] || "https://via.placeholder.com/400x300?text=No+Image"

  const handleLike = async () => {
    if (!session) {
      alert("Vui lòng đăng nhập để thích bài viết")
      return
    }

    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: "POST",
      })

      if (response.ok) {
        const newIsLiked = !isLiked
        setIsLiked(newIsLiked)
        setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1)
        onLikeToggle?.(post.id, newIsLiked)
      }
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <Link href={`/posts/${post.id}`}>
        <div className="relative h-64 bg-gray-200">
          <img
            src={mainImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Link href={`/posts/${post.id}`}>
            <h2 className="text-xl font-semibold hover:text-blue-600 transition">
              {post.title}
            </h2>
          </Link>
        </div>

        <p className="text-2xl font-bold text-blue-600 mb-2">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(post.price)}
        </p>

        <p className="text-gray-600 mb-3 line-clamp-2">{post.description}</p>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="bg-gray-100 px-2 py-1 rounded">{post.condition}</span>
          {post.location && (
            <>
              <span className="mx-2">•</span>
              <span>{post.location}</span>
            </>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              {post.user.image ? (
                <img src={post.user.image} alt={post.user.name || ""} className="w-full h-full rounded-full" />
              ) : (
                <span className="text-sm font-medium text-gray-600">
                  {(post.user.name || post.user.email || "U")[0].toUpperCase()}
                </span>
              )}
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{post.user.name || "User"}</p>
              <p className="text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                  locale: vi,
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition"
            >
              {isLiked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FiHeart />
              )}
              <span>{likesCount}</span>
            </button>

            <Link
              href={`/posts/${post.id}`}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition"
            >
              <FiMessageCircle />
              <span>{post._count.comments}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
