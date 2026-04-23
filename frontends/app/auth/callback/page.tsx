"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { setStoredToken } from "@/lib/auth";

function CallbackContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");
    if (error) {
      setStatus("error");
      return;
    }
    if (token) {
      setStoredToken(token);
      setStatus("ok");
      window.location.href = "/dashboard";
      return;
    }
    setStatus("error");
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-lg text-[#848181]">Signing you in…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6">
        <p className="text-lg text-[#171717]">Something went wrong. Please try again.</p>
        <Link
          href="/login"
          className="rounded-lg border border-[#3b82f6] bg-[#3b82f6] px-6 py-2.5 text-lg font-medium text-white transition-colors hover:bg-[#2563eb]"
        >
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <p className="text-lg text-[#848181]">Redirecting…</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <p className="text-lg text-[#848181]">Signing you in…</p>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
