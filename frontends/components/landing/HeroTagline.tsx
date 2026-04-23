const BULLET_ICON =
  "https://www.figma.com/api/mcp/asset/6c8a2797-1c7f-452f-8747-071d5dfe36ed";

export function HeroTagline() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <p className="text-center text-xl text-[#171717]">
        The Easiest Way to Launch Your Shopify App
      </p>
      <img src={BULLET_ICON} alt="" className="h-[4.4px] w-[4.4px] shrink-0" />
      <p className="text-center text-xl text-[#171717]">No Code Needed</p>
    </div>
  );
}
