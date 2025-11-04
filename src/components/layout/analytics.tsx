"use client";

import Script from "next/script";

type AnalyticsProps = {
  consent: boolean;
};

export const Analytics = ({ consent }: AnalyticsProps) => {
  if (!consent) return null;
  return (
    <Script
      id="umami"
      src="https://analytics.example.com/script.js"
      data-website-id="00000000-0000-0000-0000-000000000000"
      strategy="lazyOnload"
    />
  );
};
