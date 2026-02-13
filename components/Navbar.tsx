"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { FiPlusCircle, FiUser, FiLogOut } from "react-icons/fi"

export default function Navbar() {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            2Hand Market
          </Link>

          <div className="flex items-center space-x-4">
            {!mounted || status === "loading" ? (
              <div className="h-10 w-40" />
            ) : session ? (
              <>
                <Link
                  href="/posts/create"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <FiPlusCircle />
                  <span>Đăng bán</span>
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">{session.user?.name || session.user?.email}</span>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                  >
                    <FiLogOut />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
