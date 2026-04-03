const rawApiUrl = (import.meta.env.VITE_API_URL || "").trim();

function normalizeBaseUrl(url) {
	if (!url) return "";

	// Handle values like :8080
	if (/^:\d+$/.test(url)) {
		return `http://localhost${url}`;
	}

	// Handle localhost without protocol
	if (/^localhost(?::\d+)?$/.test(url)) {
		return `http://${url}`;
	}

	// Handle protocol-relative URL
	if (url.startsWith("//")) {
		return `${window.location.protocol}${url}`;
	}

	// Keep relative values so Vite proxy/same-origin can be used
	if (url.startsWith("/")) {
		return url.replace(/\/+$/, "");
	}

	// If no scheme is provided, assume https for deployed hosts
	if (!/^https?:\/\//i.test(url)) {
		return `https://${url}`.replace(/\/+$/, "");
	}

	return url.replace(/\/+$/, "");
}

const normalizedApiUrl = normalizeBaseUrl(rawApiUrl);

// Default to same-origin API path when VITE_API_URL is not provided.
export const BASE_URL = normalizedApiUrl;