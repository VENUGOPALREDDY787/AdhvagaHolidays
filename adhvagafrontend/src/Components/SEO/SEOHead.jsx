/**
 * SEO Head Component - Unified meta tag management
 * Uses react-helmet-async for production-grade head management
 */

import { Helmet } from "react-helmet-async";
import { generateOGTags, generateTwitterTags, getCanonicalUrl } from "../../utils/seoHelpers";

export default function SEOHead({
  title,
  description,
  keywords = "",
  url = "",
  image = "",
  type = "website",
  structuredData = null
}) {
  const canonicalUrl = url ? getCanonicalUrl(url) : "";
  const ogTags = generateOGTags({ title, description, url: canonicalUrl, image });
  const twitterTags = generateTwitterTags({ title, description, image });

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="theme-color" content="#1a1a1a" />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={ogTags["og:title"]} />
      <meta property="og:description" content={ogTags["og:description"]} />
      {ogTags["og:url"] && <meta property="og:url" content={ogTags["og:url"]} />}
      {ogTags["og:image"] && <meta property="og:image" content={ogTags["og:image"]} />}
      <meta property="og:site_name" content="Adhvaga Holidays" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterTags["twitter:card"]} />
      <meta name="twitter:title" content={twitterTags["twitter:title"]} />
      <meta name="twitter:description" content={twitterTags["twitter:description"]} />
      {twitterTags["twitter:image"] && (
        <meta name="twitter:image" content={twitterTags["twitter:image"]} />
      )}
      <meta name="twitter:site" content="@adhvagaholidays" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="30 days" />
      <meta name="author" content="Adhvaga Holidays" />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}
