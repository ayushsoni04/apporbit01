import Link from "next/link";
import { LoginForm } from "@/components/auth";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { error: urlError } = await searchParams;
  const message =
    urlError === "google_auth_failed"
      ? "Google sign-in failed. Please try again."
      : urlError === "missing_code"
        ? "Missing authorization. Please try again."
        : undefined;

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
            href="/signup"
            className="rounded-lg border border-[#3b82f6] bg-[#3b82f6] px-6 py-2.5 text-lg font-medium text-white shadow-[inset_0_-4px_10px_4px_rgba(255,255,255,0.29)] transition-colors hover:bg-[#2563eb]"
          >
            Sign up
          </Link>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh-86px)] flex-col items-center justify-center px-6 py-12">
        <LoginForm initialError={message} />
      </main>
    </div>
  );
}
