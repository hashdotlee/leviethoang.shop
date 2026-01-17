"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function CreatePostPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [mode, setMode] = useState<"form" | "text">("form")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "Đã qua sử dụng",
    category: "Nhật Bản",
    location: "",
    images: "",
  })

  const [textInput, setTextInput] = useState("")

  if (!session) {
    router.push("/login")
    return null
  }

  const handleGenerateFromText = () => {
    // Simple text parsing logic - in production, you could use AI/LLM
    const lines = textInput.split("\n").filter(line => line.trim())

    if (lines.length > 0) {
      setFormData({
        title: lines[0] || "",
        description: textInput,
        price: "",
        condition: "Đã qua sử dụng",
        category: textInput.toLowerCase().includes("nhật") ? "Nhật Bản" : "Âu Mỹ",
        location: "",
        images: "",
      })
      setMode("form")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          images: formData.images ? formData.images.split(",").map(s => s.trim()) : [],
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || "Đã xảy ra lỗi")
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Đăng bán sản phẩm</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setMode("form")}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === "form"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Nhập form
          </button>
          <button
            onClick={() => setMode("text")}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === "text"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Nhập text tự động
          </button>
        </div>

        {mode === "text" ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả sản phẩm (tự động tạo form)
              </label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ví dụ: Áo khoác bomber Nhật Bản&#10;Size M, màu đen&#10;Tình trạng rất tốt..."
              />
            </div>
            <button
              onClick={handleGenerateFromText}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Tạo form từ text
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Giá (VNĐ) <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  type="number"
                  required
                  min="0"
                  step="1000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                  Tình trạng <span className="text-red-500">*</span>
                </label>
                <select
                  id="condition"
                  required
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Mới">Mới</option>
                  <option value="Đã qua sử dụng">Đã qua sử dụng</option>
                  <option value="Cũ">Cũ</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Nguồn gốc <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Nhật Bản">Nhật Bản</option>
                  <option value="Âu Mỹ">Âu Mỹ</option>
                  <option value="Hàn Quốc">Hàn Quốc</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Địa điểm
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="VD: Hà Nội, TP.HCM"
                />
              </div>
            </div>

            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                URL hình ảnh (cách nhau bởi dấu phẩy)
              </label>
              <input
                id="images"
                type="text"
                value={formData.images}
                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
            >
              {loading ? "Đang đăng..." : "Đăng bán"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
