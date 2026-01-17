"use client"

import { useEffect } from "react"

interface AdSenseProps {
  slot?: string
  format?: string
  style?: React.CSSProperties
}

// Replace with your AdSense Publisher ID
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXXXXXXXX"

export default function AdSense({
  slot = "auto",
  format = "auto",
  style = { display: "block" }
}: AdSenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && ADSENSE_CLIENT_ID !== "ca-pub-XXXXXXXXXXXXXXXX") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error("AdSense error:", err)
    }
  }, [])

  // Show placeholder if AdSense not configured
  if (ADSENSE_CLIENT_ID === "ca-pub-XXXXXXXXXXXXXXXX") {
    return (
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center">
        <div className="text-gray-400 text-sm mb-2">Quảng cáo</div>
        <div className="bg-gray-200 h-64 flex items-center justify-center">
          <p className="text-gray-500 text-sm">
            Configure NEXT_PUBLIC_ADSENSE_CLIENT_ID
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="adsense-container">
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
