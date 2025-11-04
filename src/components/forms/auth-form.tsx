"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await signIn("email", { email, redirect: true, callbackUrl: "/account" });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-charcoal/10 bg-cream p-6">
      <h1 className="font-display text-3xl text-charcoal">Connexion</h1>
      <p className="text-sm text-charcoal/70">Recevez un lien sécurisé par email.</p>
      <label className="block text-sm text-charcoal">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-charcoal/10 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        />
      </label>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Envoi..." : "Recevoir un lien"}
      </Button>
    </form>
  );
};

export default AuthForm;
