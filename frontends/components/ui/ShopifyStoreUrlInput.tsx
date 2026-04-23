import type { ChangeEventHandler, InputHTMLAttributes } from "react";

type ShopifyStoreUrlInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export function ShopifyStoreUrlInput({
  value,
  onChange,
  placeholder = "Shopify Store URL",
  ...props
}: ShopifyStoreUrlInputProps) {
  return (
    <div className="flex overflow-hidden rounded-2xl border-[1.5px] border-[#b9b9b9]">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-16 w-[242px] rounded-l-2xl border-0 border-r border-[#b9b9b9] bg-white px-6 py-5 text-base text-[#171717] placeholder:text-[#848181] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-0"
        {...props}
      />
      <div className="flex h-16 items-center rounded-r-2xl border-0 border-[#b9b9b9] bg-[#f7f7f7] px-6 py-2.5">
        <span className="text-base font-medium text-[#171717]">
          .myshopify.com
        </span>
      </div>
    </div>
  );
}
