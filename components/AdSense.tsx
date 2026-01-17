"use client"

interface AdSenseProps {
  slot?: string
  format?: string
}

export default function AdSense({ slot = "auto", format = "auto" }: AdSenseProps) {
  // In production, replace this with actual Google AdSense code
  // Example:
  // useEffect(() => {
  //   try {
  //     (window.adsbygoogle = window.adsbygoogle || []).push({});
  //   } catch (err) {
  //     console.error('AdSense error:', err);
  //   }
  // }, []);

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center">
      <div className="text-gray-400 text-sm mb-2">Quảng cáo</div>
      <div className="bg-gray-200 h-64 flex items-center justify-center">
        <p className="text-gray-500">Google AdSense</p>
      </div>
      {/*
      Uncomment and configure for production:
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
      */}
    </div>
  )
}
