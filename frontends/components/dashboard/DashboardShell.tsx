"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchMe, getStoredToken, logout, type User } from "@/lib/auth";
import { fetchStoreProducts, type ShopifyProduct } from "@/lib/shopify-api";
import { parseShopifyStoreUrl } from "@/lib/shopify-url";
import { AppPreviewScreen } from "@/components/dashboard/AppPreviewScreen";
import { PhoneMockup } from "@/components/landing/PhoneMockup";

const CAL_BOOKING_URL = process.env.NEXT_PUBLIC_CAL_BOOKING_URL || "";

export function DashboardShell({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [storeUrl, setStoreUrl] = useState("");
  const [storeName, setStoreName] = useState<string | null>(null);
  const [storeProducts, setStoreProducts] = useState<ShopifyProduct[]>([]);
  const [urlError, setUrlError] = useState("");
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      router.replace("/login");
      return;
    }
    fetchMe(token)
      .then((u) => {
        if (u) setUser(u);
        else router.replace("/login");
      })
      .catch(() => router.replace("/login"))
      .finally(() => setChecking(false));
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const handlePreviewStore = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError("");
    const { storeName: name, storeHost, isValid } = parseShopifyStoreUrl(storeUrl);
    if (!isValid || !name || !storeHost) {
      setUrlError("Enter a valid Shopify store URL (e.g. mystore.myshopify.com)");
      return;
    }
    const token = getStoredToken();
    if (!token) return;
    setProductsLoading(true);
    try {
      const { products } = await fetchStoreProducts(storeHost, token);
      setStoreName(name);
      setStoreProducts(products);
    } catch (err) {
      setUrlError(err instanceof Error ? err.message : "Could not load store products");
      setStoreName(null);
      setStoreProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-lg text-[#848181]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" data-name="Dashboard">
      {/* Top bar — matches Figma: h-[86px], border #f5f5f5 */}
      <header className="border-b border-[#f5f5f5] bg-white">
        <div className="mx-auto flex h-[86px] max-w-[1512px] items-center justify-between px-6">
          <Link
            href="/"
            className="font-display text-[27.3px] font-medium leading-none tracking-[-1.27px] text-[#353638]"
          >
            nebulla.ai
          </Link>
          <nav className="flex items-center gap-6">
            <span className="text-lg text-[#353638]">
              {user?.name || user?.email || "Account"}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-[#3b82f6] bg-[#3b82f6] px-6 py-2.5 text-lg font-medium text-white shadow-[inset_0_-4px_10px_4px_rgba(255,255,255,0.29)] transition-colors hover:bg-[#2563eb]"
            >
              Log out
            </button>
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Left sidebar — Figma: w-[543px], border-r #f5f5f5, 3 cards #f3f3f3 */}
        <aside className="w-full max-w-[543px] shrink-0 border-r border-[#f5f5f5] bg-white p-5">
          <div className="flex flex-col gap-[19px]">
            {/* Shopify store URL → app preview */}
            <div className="w-full rounded-lg bg-[#f3f3f3] p-5">
              <h3 className="font-display text-base font-medium text-[#353638]">
                Preview your store&apos;s app
              </h3>
              <p className="mt-1 text-sm text-[#848181]">
                Enter your Shopify store URL to see how the app will look.
              </p>
              <form onSubmit={handlePreviewStore} className="mt-4 flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="e.g. mystore.myshopify.com or https://mystore.com"
                  value={storeUrl}
                  onChange={(e) => {
                    setStoreUrl(e.target.value);
                    setUrlError("");
                  }}
                  className="h-12 w-full rounded-lg border border-[#e5e5e5] bg-white px-4 text-[#171717] placeholder:text-[#848181] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-0"
                />
                {urlError && (
                  <p className="text-sm text-red-600" role="alert">
                    {urlError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={productsLoading}
                  className="h-12 rounded-lg border border-[#3b82f6] bg-[#3b82f6] px-4 text-base font-medium text-white shadow-[inset_0_-4px_10px_4px_rgba(255,255,255,0.29)] transition-colors hover:bg-[#2563eb] disabled:opacity-60"
                >
                  {productsLoading ? "Loading…" : "Preview app"}
                </button>
              </form>
              {storeName && (
                <p className="mt-3 text-sm text-[#353638]">
                  Showing preview for <strong>{storeName}</strong>
                  {storeProducts.length > 0 && ` (${storeProducts.length} products)`}
                </p>
              )}
            </div>

            {/* Cal.com booking CTA */}
            <div className="w-full rounded-lg bg-[#f3f3f3] p-5">
              <h3 className="font-display text-base font-medium text-[#353638]">
                Need help launching?
              </h3>
              <p className="mt-1 text-sm text-[#848181]">
                Book a quick call with our team to get your store set up.
              </p>
              {CAL_BOOKING_URL ? (
                <a
                  href={CAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-lg border border-[#3b82f6] bg-[#3b82f6] px-4 text-base font-medium text-white shadow-[inset_0_-4px_10px_4px_rgba(255,255,255,0.29)] transition-colors hover:bg-[#2563eb]"
                >
                  Book a Call
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-lg border border-[#cbd5e1] bg-[#cbd5e1] px-4 text-base font-medium text-white"
                >
                  Add NEXT_PUBLIC_CAL_BOOKING_URL
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Main content — phone mockup centered */}
        <main className="flex min-h-[calc(100vh-86px)] flex-1 items-center justify-center overflow-hidden bg-white">
          {children ?? (
            <div className="flex items-center justify-center">
              <PhoneMockup>
                {storeName ? (
                  <AppPreviewScreen
                    storeName={storeName}
                    products={storeProducts}
                  />
                ) : undefined}
              </PhoneMockup>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
