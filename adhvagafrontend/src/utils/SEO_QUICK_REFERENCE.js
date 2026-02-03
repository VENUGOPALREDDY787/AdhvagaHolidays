/**
 * Quick Reference: How to Add SEO to New Pages
 * 
 * This guide shows how to implement SEO on any new page you create
 */

// ========================================
// STEP 1: Import Required Components
// ========================================

import SEOHead from "../Components/SEO/SEOHead";
import { generateBreadcrumbSchema } from "../utils/seoHelpers";

// ========================================
// STEP 2: Define Metadata (Option A: Inline)
// ========================================

function MyNewPage() {
  const metadata = {
    title: "My Page Title | Adhvaga Holidays",
    description: "Concise description of the page (150-160 chars)",
    keywords: "keyword1, keyword2, keyword3",
    url: "/my-page",
    image: "https://adhvagaholidays.com/og-image.jpg",
    h1: "Main Page Heading"
  };

  const breadcrumbs = [
    { name: "Home", url: "/home" },
    { name: "My Page", url: "/my-page" }
  ];

  // ========================================
  // STEP 3: Add SEOHead Component
  // ========================================

  return (
    <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
        keywords={metadata.keywords}
        url={metadata.url}
        image={metadata.image}
        structuredData={generateBreadcrumbSchema(breadcrumbs)}
      />

      {/* Use proper semantic HTML */}
      <main role="main" aria-label="Main content">
        <section aria-label="Hero section">
          {/* Use the exact H1 from metadata */}
          <h1>{metadata.h1}</h1>
          <p>Your content here...</p>
        </section>
      </main>
    </>
  );
}

// ========================================
// STEP 2: Define Metadata (Option B: From seoHelpers.js)
// ========================================

// Add to src/utils/seoHelpers.js:

export const SEO_METADATA = {
  // ... existing entries ...
  myPage: {
    title: "My Page Title | Adhvaga Holidays",
    description: "Concise description",
    h1: "Main Page Heading",
    keywords: "keyword1, keyword2, keyword3",
    url: "https://adhvagaholidays.com/my-page",
    image: "https://adhvagaholidays.com/og-my-page.jpg"
  }
};

// Then import in your component:
import { SEO_METADATA } from "../utils/seoHelpers";

function MyNewPage() {
  const metadata = SEO_METADATA.myPage;
  // ... rest of component
}

// ========================================
// ADDING STRUCTURED DATA
// ========================================

// For services:
import { generateServiceSchema } from "../utils/seoHelpers";

const serviceSchema = generateServiceSchema({
  name: "Service Name",
  description: "Service description"
});

<SEOHead structuredData={serviceSchema} />

// For destinations/products:
import { generateDestinationSchema } from "../utils/seoHelpers";

const destinationSchema = generateDestinationSchema({
  name: "Destination Name",
  description: "Description",
  image: "image-url",
  url: "/destination",
  city: "City Name"
});

// ========================================
// IMAGE ALT TEXT BEST PRACTICES
// ========================================

import { generateDestinationAlt } from "../utils/seoHelpers";

// For package images:
<img 
  src={image} 
  alt={generateDestinationAlt("Goa", "domestic holiday package")}
  loading="lazy"
/>
// Result: "Goa domestic holiday package from India - Adhvaga Holidays"

// For general images:
import { generateAltText } from "../utils/seoHelpers";

<img 
  src={logo} 
  alt={generateAltText("Company Logo")}
/>
// Result: "Company Logo - Adhvaga Holidays"

// ========================================
// SEMANTIC HTML CHECKLIST
// ========================================

// ✅ DO:
<main role="main" aria-label="Main content">
  <section aria-label="Hero section">
    <h1>Page Title</h1>
    <article>
      <h2>Section Title</h2>
      <h3>Subsection</h3>
    </article>
  </section>
</main>

// ❌ DON'T:
<div>
  <div>
    <h1>Title</h1>
    <h3>Skipped h2!</h3> {/* Bad: skips heading level */}
  </div>
</div>

// ========================================
// ACCESSIBILITY ATTRIBUTES
// ========================================

// For decorative elements:
<div aria-hidden="true">Decorative</div>

// For icons:
<icon aria-label="Icon description" />

// For navigation:
<nav role="navigation" aria-label="Main navigation">

// For main content:
<main role="main" aria-label="Main content">

// For footer:
<footer role="contentinfo" aria-label="Footer">

// ========================================
// UPDATING SITEMAP
// ========================================

// Add your new page to public/sitemap.xml:

<url>
  <loc>https://adhvagaholidays.com/my-page</loc>
  <lastmod>2026-01-29</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>

// ========================================
// TESTING YOUR SEO
// ========================================

// 1. Run dev server:
npm run dev

// 2. Open browser and check:
// - Page title in browser tab
// - View page source (Ctrl+U) to see meta tags
// - Use Chrome DevTools > Lighthouse > SEO audit
// - Check https://search.google.com/test/rich-results

// 3. Validate structured data:
// - Copy your JSON-LD
// - Paste at https://validator.schema.org/

// ========================================
// COMMON MISTAKES TO AVOID
// ========================================

// ❌ Multiple H1 tags on one page
// ❌ Missing alt text on images
// ❌ Generic alt text like "image" or "photo"
// ❌ Empty href in links
// ❌ Missing aria-labels on navigation
// ❌ Skipping heading levels (h1 → h3)
// ❌ Not using semantic HTML
// ❌ Missing canonical URLs
// ❌ Duplicate titles across pages
// ❌ Meta descriptions over 160 characters

// ========================================
// SEO BEST PRACTICES
// ========================================

// ✅ Title: 50-60 characters
// ✅ Description: 150-160 characters
// ✅ One H1 per page (use metadata.h1)
// ✅ Proper heading hierarchy (h1 → h2 → h3)
// ✅ Descriptive alt text with keywords
// ✅ Internal links with descriptive anchor text
// ✅ Semantic HTML (header, nav, main, article, footer)
// ✅ ARIA labels for accessibility
// ✅ Lazy loading images
// ✅ Canonical URLs
// ✅ Structured data (JSON-LD)
// ✅ Mobile-responsive
// ✅ Fast loading times

export default {};
