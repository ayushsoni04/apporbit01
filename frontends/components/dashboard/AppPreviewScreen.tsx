"use client";

import { useState } from "react";
import type { ShopifyProduct } from "@/lib/shopify-api";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h3" />
    </svg>
  );
}
function ShopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}
function AccountIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

type Props = {
  storeName: string;
  products: ShopifyProduct[];
};

/**
 * Apple-style mobile app preview: list + product detail with full info.
 */
function filterProductsBySearch(products: ShopifyProduct[], query: string): ShopifyProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      (p.vendor?.toLowerCase().includes(q) ?? false) ||
      (p.productType?.toLowerCase().includes(q) ?? false)
  );
}

export function AppPreviewScreen({ storeName, products }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = filterProductsBySearch(products, searchQuery);
  const isSearching = searchQuery.trim().length > 0;

  if (selectedProduct) {
    return (
      <ProductDetailScreen
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col bg-[#fafafa] text-[#1d1d1f]">
      {/* Status bar */}
      <div className="flex h-11 shrink-0 items-center justify-between bg-[#fafafa] px-6 pt-3 text-[11px] font-medium text-[#1d1d1f]">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span className="font-semibold">100%</span>
          <div className="h-2.5 w-6 rounded-sm border border-[#1d1d1f] bg-transparent">
            <div className="ml-0.5 mt-0.5 h-1.5 w-4 rounded-[2px] bg-[#1d1d1f]" />
          </div>
        </div>
      </div>

      {/* Store header: logo + search + cart */}
      <header className="shrink-0 border-b border-[#eee] bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-[18px] font-bold tracking-tight text-[#1d1d1f] truncate">
            {storeName}
          </h1>
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f5] text-[#1d1d1f]">
              <SearchIcon className="h-4 w-4" />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f5] text-[#1d1d1f]">
              <CartIcon className="h-4 w-4" />
            </span>
          </div>
        </div>
        <label className="mt-2 flex items-center gap-2 rounded-full bg-[#f5f5f5] px-4 py-2.5 text-[13px]">
          <SearchIcon className="h-4 w-4 shrink-0 text-[#6e6e73]" />
          <input
            type="search"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[#1d1d1f] placeholder:text-[#6e6e73] focus:outline-none"
            aria-label="Search products"
          />
          {searchQuery.length > 0 && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="shrink-0 rounded-full p-1 text-[#6e6e73] active:bg-[#e5e5e5]"
              aria-label="Clear search"
            >
              <span className="text-[14px] leading-none">×</span>
            </button>
          )}
        </label>
      </header>

      <div className="flex-1 overflow-y-auto pb-20">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <p className="text-[15px] font-medium text-[#1d1d1f]">No products yet</p>
            <p className="mt-1 text-[13px] text-[#6e6e73]">
              This store has no products, or they couldn&apos;t be loaded.
            </p>
          </div>
        ) : isSearching ? (
          /* Search results view */
          <section className="px-4 pt-4">
            <h2 className="text-[16px] font-semibold text-[#1d1d1f]">
              {filteredProducts.length > 0
                ? `Results for "${searchQuery.trim()}"`
                : "No results"}
            </h2>
            {filteredProducts.length > 0 ? (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPress={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-[14px] text-[#6e6e73]">
                No products match &quot;{searchQuery.trim()}&quot;. Try a different search.
              </p>
            )}
          </section>
        ) : (
          <>
            {/* Promo banner */}
            <div className="mx-4 mt-3 overflow-hidden rounded-xl bg-linear-to-r from-[#1d1d1f] to-[#3d3d3f] px-4 py-3 text-white">
              <p className="text-[12px] font-medium uppercase tracking-wider text-white/80">Offer</p>
              <p className="mt-0.5 text-[15px] font-semibold">Free shipping on orders over $50</p>
              <p className="mt-0.5 text-[12px] text-white/70">Use code SHIP50 at checkout</p>
            </div>

            {/* Category pills */}
            <div className="mt-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide">
              {["All", "New", "Sale", "Bestsellers"].map((cat) => (
                <span
                  key={cat}
                  className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-medium ${
                    cat === "All" ? "bg-[#1d1d1f] text-white" : "bg-white text-[#1d1d1f] border border-[#e5e5e5]"
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Section: New arrivals */}
            {products.length > 0 && (
              <section className="mt-4">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-[16px] font-semibold text-[#1d1d1f]">New arrivals</h2>
                  <span className="text-[13px] text-[#0071e3] font-medium">See all</span>
                </div>
                <div className="mt-2 flex gap-3 overflow-x-auto px-4 py-2 scrollbar-hide">
                  {products.slice(0, 4).map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="w-[140px] shrink-0 text-left"
                    >
                      <div className="aspect-square w-full overflow-hidden rounded-xl bg-[#f0f0f0]">
                        {product.image ? (
                          <img src={product.image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[11px] text-[#86868b]">No image</div>
                        )}
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-[12px] font-medium text-[#1d1d1f]">{product.title}</p>
                      {product.price && (
                        <p className="mt-0.5 text-[13px] font-semibold text-[#1d1d1f]">
                          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(parseFloat(product.price))}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Section: Shop all */}
            <section className="mt-5 px-4">
              <h2 className="text-[16px] font-semibold text-[#1d1d1f]">Shop all</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPress={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Bottom nav bar — ecommerce style */}
      <nav className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-[#eee] bg-white/95 py-2 pb-safe backdrop-blur-sm">
        {[
          { label: "Home", icon: HomeIcon, active: true },
          { label: "Shop", icon: ShopIcon, active: false },
          { label: "Cart", icon: CartIcon, active: false },
          { label: "Account", icon: AccountIcon, active: false },
        ].map(({ label, icon: Icon, active }) => (
          <span
            key={label}
            className={`flex flex-col items-center gap-0.5 ${active ? "text-[#1d1d1f]" : "text-[#86868b]"}`}
          >
            <Icon className={`h-5 w-5 ${active ? "opacity-100" : "opacity-70"}`} />
            <span className="text-[10px] font-medium">{label}</span>
          </span>
        ))}
      </nav>
    </div>
  );
}

function ProductCard({
  product,
  onPress,
}: {
  product: ShopifyProduct;
  onPress: () => void;
}) {
  const price = product.price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(parseFloat(product.price))
    : null;
  const hasCompare =
    product.compareAtPrice &&
    parseFloat(product.compareAtPrice) > parseFloat(product.price || "0");
  const compareFormatted =
    hasCompare && product.compareAtPrice
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(parseFloat(product.compareAtPrice))
      : null;

  return (
    <button
      type="button"
      onClick={onPress}
      className="overflow-hidden rounded-2xl bg-white text-left shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-opacity active:opacity-90"
    >
      <div className="relative aspect-square w-full bg-[#f5f5f7]">
        {product.image ? (
          <img
            src={product.image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            sizes="(max-width: 400px) 50vw, 180px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[11px] text-[#86868b]">
            No image
          </div>
        )}
      </div>
      <div className="p-3">
        <p
          className="line-clamp-2 text-[13px] font-medium leading-snug text-[#1d1d1f]"
          title={product.title}
        >
          {product.title}
        </p>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          {price && (
            <span className="text-[14px] font-semibold text-[#1d1d1f]">
              {price}
            </span>
          )}
          {compareFormatted && (
            <span className="text-[12px] text-[#86868b] line-through">
              {compareFormatted}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function ProductDetailScreen({
  product,
  onBack,
}: {
  product: ShopifyProduct;
  onBack: () => void;
}) {
  const price = product.price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(parseFloat(product.price))
    : null;
  const hasCompare =
    product.compareAtPrice &&
    parseFloat(product.compareAtPrice) > parseFloat(product.price || "0");
  const compareFormatted =
    hasCompare && product.compareAtPrice
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(parseFloat(product.compareAtPrice))
      : null;

  const images = product.images && product.images.length > 0 ? product.images : product.image ? [product.image] : [];

  return (
    <div className="flex h-full w-full flex-col bg-[#f5f5f7] text-[#1d1d1f]">
      {/* Status bar */}
      <div className="flex h-11 shrink-0 items-center justify-between bg-[#f5f5f7] px-6 pt-3 text-[11px] font-medium text-[#1d1d1f]">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span className="font-semibold">100%</span>
          <div className="h-2.5 w-6 rounded-sm border border-[#1d1d1f] bg-transparent">
            <div className="ml-0.5 mt-0.5 h-1.5 w-4 rounded-[2px] bg-[#1d1d1f]" />
          </div>
        </div>
      </div>

      {/* Nav bar with back */}
      <nav className="flex shrink-0 items-center border-b border-[#e5e5e7] bg-white/80 px-3 py-2 backdrop-blur-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 rounded-lg py-2 pr-2 text-[15px] font-medium text-[#0071e3] active:opacity-70"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </nav>

      <div className="flex-1 overflow-y-auto">
        {/* Image gallery */}
        {images.length > 0 && (
          <div className="bg-white">
            <div className="aspect-square w-full bg-[#f5f5f7]">
              <img
                src={images[0]}
                alt=""
                className="h-full w-full object-contain"
                sizes="100vw"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto px-3 pb-3 pt-2">
                {images.slice(0, 6).map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#f5f5f7]"
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Info card */}
        <div className="mt-3 rounded-t-3xl bg-white px-5 pb-8 pt-5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
          {(product.vendor || product.productType) && (
            <p className="text-[12px] font-medium uppercase tracking-wider text-[#6e6e73]">
              {[product.vendor, product.productType].filter(Boolean).join(" · ")}
            </p>
          )}
          <h1 className="mt-1 text-[20px] font-semibold leading-tight text-[#1d1d1f]">
            {product.title}
          </h1>
          <div className="mt-3 flex items-baseline gap-2">
            {price && (
              <span className="text-[18px] font-semibold text-[#1d1d1f]">
                {price}
              </span>
            )}
            {compareFormatted && (
              <span className="text-[14px] text-[#86868b] line-through">
                {compareFormatted}
              </span>
            )}
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 1 && (
            <section className="mt-4">
              <h2 className="text-[13px] font-semibold text-[#1d1d1f]">Options</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <span
                    key={v.id}
                    className="rounded-full border border-[#d2d2d7] bg-[#f5f5f7] px-3 py-1.5 text-[13px] text-[#1d1d1f]"
                  >
                    {v.title} · {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(parseFloat(v.price))}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Description */}
          {product.bodyHtml && (
            <section className="mt-5">
              <h2 className="text-[13px] font-semibold text-[#1d1d1f]">Description</h2>
              <div
                className="product-description mt-2 text-[14px] leading-relaxed text-[#1d1d1f]"
                dangerouslySetInnerHTML={{ __html: product.bodyHtml }}
              />
            </section>
          )}

          {!product.bodyHtml && (
            <p className="mt-4 text-[14px] text-[#6e6e73]">No description provided.</p>
          )}
        </div>
      </div>
    </div>
  );
}
