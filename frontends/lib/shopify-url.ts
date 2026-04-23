export type ShopifyStoreInfo = {
  storeName: string;
  storeHost: string;
  isValid: boolean;
};

/**
 * Parse a Shopify store URL and return display name and host for API calls.
 * Supports: https://store.myshopify.com, https://www.store.myshopify.com, custom domains
 */
export function parseShopifyStoreUrl(input: string): ShopifyStoreInfo {
  const trimmed = input.trim();
  if (!trimmed) return { storeName: "", storeHost: "", isValid: false };

  try {
    let url: URL;
    if (!/^https?:\/\//i.test(trimmed)) {
      url = new URL(`https://${trimmed}`);
    } else {
      url = new URL(trimmed);
    }
    const host = url.hostname.toLowerCase().replace(/^www\./, "");

    // myshopify.com subdomain → store name is the subdomain; host is full host for API
    if (host.endsWith(".myshopify.com")) {
      const sub = host.slice(0, -".myshopify.com".length);
      const name = sub || "store";
      return { storeName: formatStoreName(name), storeHost: host, isValid: true };
    }

    // Custom domain: we need to try products.json; host is the custom domain
    const name = host.split(".")[0] || "store";
    return { storeName: formatStoreName(name), storeHost: host, isValid: true };
  } catch {
    return { storeName: "", storeHost: "", isValid: false };
  }
}

function formatStoreName(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim() || "Your Store";
}
