import type { ButtonHTMLAttributes } from "react";


export type ConvertMyStoreButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ConvertMyStoreButton({
  className = "",
  children = "Convert My Store",
  type = "button",
  ...props
}: ConvertMyStoreButtonProps) {
  return (
    <button
      type={type}
      className={`flex h-16 items-center gap-2.5 rounded-2xl border border-[#3b82f6] bg-[#3b82f6] px-8 py-2.5 text-lg font-medium text-white shadow-[inset_0_-4px_10px_4px_rgba(255,255,255,0.29)] transition-colors hover:bg-[#2563eb] ${className}`}
      {...props}
    >
      {children}
      <span className="relative z-10 flex size-5 shrink-0 items-center justify-center">
        <img
          src="/tag.png"
          alt=""
          width={20}
          height={20}
          decoding="async"
          className="h-5 w-5 object-contain"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </span>
    </button>
  );
}
