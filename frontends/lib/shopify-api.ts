const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type ShopifyVariant = {
  id: number;
  title: string;
  price: string;
  compareAtPrice: string | null;
};

export type ShopifyProduct = {
  id: number;
  title: string;
  bodyHtml: string | null;
  vendor: string | null;
  productType: string | null;
  price: string | null;
  compareAtPrice: string | null;
  image: string | null;
  images: string[] | null;
  variants: ShopifyVariant[];
};

export async function fetchStoreProducts(
  storeHost: string,
  token: string
): Promise<{ products: ShopifyProduct[] }> {
  const params = new URLSearchParams({ store: storeHost });
  const res = await fetch(`${API_BASE}/api/shopify/products?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Could not load store products");
  }
  return res.json();
}
