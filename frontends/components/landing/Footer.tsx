import Link from "next/link";

const USE_LINKS = [
  { label: "Sign In", href: "/login" },
  { label: "Blog", href: "#blog" },
  { label: "Support", href: "#support" },
  { label: "Hire an Expert", href: "#hire-expert" },
] as const;

const LEGAL_LINKS = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "GDPR & CPRA", href: "/legal/gdpr-cpra" },
] as const;

const MORE_LINKS = [
  { label: "X (Twitter)", href: "https://x.com", external: true },
  { label: "Instagram", href: "https://instagram.com", external: true },
  { label: "Linkedin", href: "https://linkedin.com", external: true },
  { label: "FAQs", href: "#faqs" },
] as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string; external?: boolean }[];
}) {
  return (
    <nav className="flex w-[142px] shrink-0 flex-col gap-10 tracking-[-0.62px]" aria-label={title}>
      <p className="text-xl font-medium leading-none text-[#6e6e73]">{title}</p>
      <ul className="flex flex-col gap-6 text-xl font-normal leading-[25px] text-[#171717]">
        {links.map(({ label, href, external }) => (
          <li key={label}>
            {external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#353638]"
              >
                {label}
              </a>
            ) : (
              <Link href={href} className="transition-colors hover:text-[#353638]">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-white w-[90%] mx-auto mt-10">
      <div className="mx-auto flex max-w-[1512px] flex-col gap-12 px-6 py-16 lg:flex-row lg:items-start lg:gap-24 xl:gap-[120px] 2xl:gap-[160px]">
        <Link
          href="/"
          className="font-display shrink-0 text-xs font-medium leading-[1.05] tracking-[-2px] text-black lg:text-[30px]"
        >
          <span className="font-normal">nebulla</span>
          <span className="font-normal">.ai</span>
        </Link>

        <div className="flex flex-1 flex-col gap-12 sm:flex-row sm:flex-wrap sm:items-start lg:gap-16 xl:gap-20 2xl:gap-24">
          <FooterColumn title="Use" links={USE_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
          <FooterColumn title="More" links={MORE_LINKS} />

          <p className="text-xl font-normal leading-[25px] tracking-[-0.62px] text-[#6e6e73] sm:ml-auto sm:self-start lg:ml-0 xl:ml-auto">
            2026 © All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
