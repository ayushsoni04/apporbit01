import Link from "next/link";

const NAV_LINKS = [
  { label: "Blog", href: "#blog" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#pricing" },
  { label: "Features", href: "#features" },
] as const;

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#eee] bg-white">
      <div className="mx-auto flex h-[86px] max-w-[1512px] items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-[27px] font-medium leading-none tracking-[-1.27px] text-[#353638]"
        >
          nebulla.ai
        </Link>
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-lg text-[#353638] transition-colors hover:text-[#1e293b]"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/login"
            className="text-lg font-medium text-[#3b82f6] transition-colors hover:text-[#2563eb]"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-lg border border-[#3b82f6] bg-[#3b82f6] px-6 py-2.5 text-lg font-medium text-white shadow-[inset_0_-4px_10px_4px_rgba(255,255,255,0.29)] transition-colors hover:bg-[#2563eb]"
          >
            Get Started free
          </Link>
        </nav>
      </div>
    </header>
  );
}
