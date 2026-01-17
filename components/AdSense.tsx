"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[] | undefined;
  }
}

import { useEffect } from "react"

interface AdSenseProps {
  slot: string; // should be your numeric slot ID
  format?: string;
}

export default function AdSense({ slot, format = "auto" }: AdSenseProps) {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const scriptId = "adsbygoogle-js";
    const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

    const pushAd = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.setAttribute("data-ad-client", client);
      script.onload = pushAd;
      document.head.appendChild(script);
    } else {
      pushAd();
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block"
      style={{ display: "block" }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
