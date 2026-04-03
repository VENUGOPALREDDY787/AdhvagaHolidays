const rawApiUrl = (import.meta.env.VITE_API_URL || "").trim();

function normalizeBaseUrl(url) {
  if (!url) return "";

  // If no protocol, assume https (for production)
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  // Remove trailing slashes
  return url.replace(/\/+$/, "");
}

export const BASE_URL = normalizeBaseUrl(rawApiUrl);