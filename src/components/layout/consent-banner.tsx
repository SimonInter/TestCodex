"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type ConsentBannerProps = {
  storageKey?: string;
};

const ConsentBanner = ({ storageKey = "consent:analytics" }: ConsentBannerProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const consent = window.localStorage.getItem(storageKey);
    setVisible(!consent);
  }, [storageKey]);

  if (!visible) return null;

  const handle = (value: string) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, value);
    document.cookie = `${storageKey}=${value};path=/;max-age=31536000`;
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-4 bottom-6 z-50 rounded-2xl bg-charcoal p-4 text-cream shadow-soft">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm">
          Nous utilisons des cookies pour mesurer l'audience et améliorer l'expérience. Vous pouvez
          gérer vos préférences à tout moment.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handle("false")}>
            Refuser
          </Button>
          <Button onClick={() => handle("true")}>Accepter</Button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
