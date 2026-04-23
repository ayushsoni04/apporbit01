import Link from "next/link";
import { SignupForm } from "@/components/auth";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#eee] bg-white">
        <div className="mx-auto flex h-[86px] max-w-[1512px] items-center justify-between px-6">
          <Link
            href="/"
            className="font-display text-[27px] font-medium leading-none tracking-[-1.27px] text-[#353638]"
          >
            nebulla.ai
          </Link>
          <Link
            href="/login"
            className="text-lg font-medium text-[#3b82f6] transition-colors hover:text-[#2563eb]"
          >
            Log in
          </Link>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh-86px)] flex-col items-center justify-center px-6 py-12">
        <SignupForm />
      </main>
    </div>
  );
}
