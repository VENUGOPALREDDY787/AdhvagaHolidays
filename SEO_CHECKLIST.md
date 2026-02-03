# ✅ SEO Implementation Checklist - Adhvaga Holidays

## 🎯 Quick Verification Guide

Use this checklist to verify SEO implementation on any page.

---

## 📋 Page-Level Verification

### For Each Page, Check:

#### 1. Meta Tags
- [ ] Unique `<title>` (50-60 characters)
- [ ] Unique `<meta description>` (150-160 characters)
- [ ] Keywords meta tag present
- [ ] Canonical URL set correctly
- [ ] Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] Twitter Card tags
- [ ] Robots meta (index, follow)

**How to Check:**
1. Open page in browser
2. Right-click → View Page Source (Ctrl+U)
3. Search for `<title>`, `<meta name="description"`, `<meta property="og:`

#### 2. Heading Structure
- [ ] Exactly one `<h1>` per page
- [ ] H1 text matches SEO metadata
- [ ] Proper hierarchy: h1 → h2 → h3 (no skips)
- [ ] Headings are descriptive and contain keywords

**How to Check:**
- Use browser extension "HeadingsMap"
- Or use DevTools: `$$('h1, h2, h3, h4, h5, h6')`

#### 3. Structured Data
- [ ] JSON-LD script present in `<head>`
- [ ] Correct schema type (@type)
- [ ] Valid JSON syntax
- [ ] Required properties included

**How to Check:**
- View Page Source → search for `application/ld+json`
- Copy JSON-LD content
- Validate at: https://validator.schema.org/
- Test at: https://search.google.com/test/rich-results

#### 4. Semantic HTML
- [ ] `<main role="main">` wrapper
- [ ] `<section>` with aria-label
- [ ] `<article>` for content cards
- [ ] `<nav role="navigation">`
- [ ] `<footer role="contentinfo">`

**How to Check:**
- DevTools → Elements tab
- Look for semantic tags instead of generic `<div>`

#### 5. Images
- [ ] All images have `alt` attribute
- [ ] Alt text is descriptive (not "image" or empty)
- [ ] `loading="lazy"` on non-critical images
- [ ] Alt text includes relevant keywords

**How to Check:**
- DevTools → Run: `$$('img:not([alt])')` (should return [])
- Lighthouse → Accessibility → "Image elements have [alt] attributes"

#### 6. Links
- [ ] Internal links use descriptive anchor text
- [ ] No broken links
- [ ] Links to important pages from homepage

**How to Check:**
- Lighthouse → SEO → "Links have descriptive text"
- Use "Check My Links" browser extension

---

## 🔍 Technical SEO Files

### robots.txt
- [ ] File exists at `/robots.txt`
- [ ] Allows crawlers: `User-agent: *` / `Allow: /`
- [ ] Blocks admin: `Disallow: /admin/`
- [ ] Links to sitemap: `Sitemap: https://adhvagaholidays.com/sitemap.xml`

**How to Check:**
- Visit: `http://localhost:5173/robots.txt`
- Or: Check `public/robots.txt` file

### sitemap.xml
- [ ] File exists at `/sitemap.xml`
- [ ] Valid XML format
- [ ] All important pages listed
- [ ] Priority and changefreq set appropriately
- [ ] lastmod dates are current

**How to Check:**
- Visit: `http://localhost:5173/sitemap.xml`
- Validate at: https://www.xml-sitemaps.com/validate-xml-sitemap.html

---

## 🧪 Testing Tools

### 1. Google Lighthouse (Chrome DevTools)
```
1. Open page in Chrome
2. F12 → Lighthouse tab
3. Select "SEO" category
4. Click "Generate report"
5. Target Score: 90+
```

**Common Issues:**
- Missing meta description → Add to SEOHead
- Multiple h1 tags → Check component structure
- Links not crawlable → Use React Router `<Link>`

### 2. Google Rich Results Test
```
1. Go to: https://search.google.com/test/rich-results
2. Enter page URL or paste HTML
3. Check for errors/warnings
4. Preview how it appears in search
```

### 3. Schema Markup Validator
```
1. Go to: https://validator.schema.org/
2. Copy JSON-LD from page source
3. Paste and validate
4. Fix any errors
```

### 4. Facebook Sharing Debugger
```
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter page URL
3. Check Open Graph tags
4. Preview how link appears when shared
```

### 5. Twitter Card Validator
```
1. Go to: https://cards-dev.twitter.com/validator
2. Enter page URL
3. Check Twitter Card tags
4. Preview card appearance
```

---

## 📊 Performance Checklist

### Core Web Vitals
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] First Input Delay (FID) < 100ms
- [ ] Cumulative Layout Shift (CLS) < 0.1

**How to Check:**
- Lighthouse → Performance
- Google PageSpeed Insights: https://pagespeed.web.dev/

### Image Optimization
- [ ] Images are compressed (WebP format ideal)
- [ ] Lazy loading implemented
- [ ] Critical images loaded eagerly
- [ ] Proper image dimensions specified

---

## 🌐 Browser Testing

### Test On:
- [ ] Chrome (Desktop)
- [ ] Firefox (Desktop)
- [ ] Safari (Desktop/Mobile)
- [ ] Edge (Desktop)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

### Check:
- [ ] Meta tags render correctly
- [ ] H1 visible and styled
- [ ] Images load with alt text
- [ ] Navigation works
- [ ] Mobile responsive

---

## 🚀 Pre-Launch Checklist

### Before Going Live:

#### 1. Content Review
- [ ] All pages have unique titles
- [ ] All pages have unique descriptions
- [ ] No Lorem Ipsum or placeholder text
- [ ] All links work (no 404s)
- [ ] Contact information is accurate

#### 2. Technical Review
- [ ] robots.txt allows important pages
- [ ] sitemap.xml includes all pages
- [ ] Canonical URLs point to correct domains
- [ ] HTTPS enabled (not http://)
- [ ] No console errors
- [ ] No 404 errors

#### 3. SEO Configuration
- [ ] Google Search Console set up
- [ ] Sitemap submitted to GSC
- [ ] Google Analytics installed
- [ ] Bing Webmaster Tools set up
- [ ] Social media meta tags verified

#### 4. Schema Validation
- [ ] All structured data validated
- [ ] No JSON-LD syntax errors
- [ ] Required properties included
- [ ] Images referenced in schemas exist

#### 5. Accessibility
- [ ] ARIA labels present
- [ ] Alt text on all images
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG 2.1

---

## 📈 Post-Launch Monitoring

### Week 1
- [ ] Submit sitemap to Google Search Console
- [ ] Request indexing for key pages
- [ ] Monitor crawl errors
- [ ] Check mobile usability issues

### Month 1
- [ ] Track keyword rankings
- [ ] Monitor organic traffic in GA4
- [ ] Analyze bounce rate per page
- [ ] Check for broken links
- [ ] Review search queries in GSC

### Ongoing
- [ ] Update sitemap when adding pages
- [ ] Monitor Core Web Vitals
- [ ] Fix any coverage issues
- [ ] Update meta tags based on performance
- [ ] Add new structured data types

---

## 🛠️ Common Issues & Fixes

### Issue: Multiple H1 tags detected
**Fix:** Check all imported components - only ONE component should render an H1.

### Issue: Missing meta description
**Fix:** Ensure `<SEOHead description={...} />` is added to page component.

### Issue: Structured data errors
**Fix:** Validate JSON-LD at schema.org/validator and fix missing required properties.

### Issue: Images without alt text
**Fix:** Add `alt` attribute or use `generateDestinationAlt()` helper.

### Issue: Page not in sitemap
**Fix:** Add URL entry to `public/sitemap.xml`.

### Issue: Robots.txt blocking page
**Fix:** Check `Disallow` rules in `public/robots.txt`.

### Issue: Duplicate titles
**Fix:** Ensure each page has unique title in `SEO_METADATA`.

### Issue: Low Lighthouse SEO score
**Fix:** Run audit, address each issue listed in report.

---

## 🎓 SEO Best Practices Summary

### Title Tags
- ✅ 50-60 characters
- ✅ Include primary keyword
- ✅ Include brand name
- ✅ Unique per page
- ❌ Don't keyword stuff
- ❌ Don't use ALL CAPS

### Meta Descriptions
- ✅ 150-160 characters
- ✅ Include call-to-action
- ✅ Include relevant keywords
- ✅ Unique per page
- ❌ Don't duplicate title
- ❌ Don't be generic

### Headings
- ✅ One H1 per page
- ✅ H1 = page topic
- ✅ Use H2 for main sections
- ✅ Use H3 for subsections
- ❌ Don't skip levels
- ❌ Don't use for styling only

### Images
- ✅ Descriptive, keyword-rich alt text
- ✅ Lazy load non-critical images
- ✅ Compress to reduce file size
- ✅ Use modern formats (WebP)
- ❌ Don't leave alt empty
- ❌ Don't use generic text ("image", "photo")

### Links
- ✅ Descriptive anchor text
- ✅ Internal linking strategy
- ✅ Link to related content
- ❌ Don't use "click here"
- ❌ Don't link to 404 pages

### Structured Data
- ✅ Use relevant schema types
- ✅ Include all required properties
- ✅ Keep data accurate
- ✅ Validate before launch
- ❌ Don't add invisible data
- ❌ Don't mark up content not on page

---

## ✅ Quick Daily Checklist

When adding a new page:

1. [ ] Import `SEOHead` component
2. [ ] Define metadata (title, description, keywords, h1)
3. [ ] Add breadcrumb navigation
4. [ ] Wrap content in `<main role="main">`
5. [ ] Use one `<h1>` matching metadata.h1
6. [ ] Add structured data (breadcrumb minimum)
7. [ ] Use semantic HTML (section, article)
8. [ ] Add descriptive alt text to images
9. [ ] Add page to sitemap.xml
10. [ ] Test with Lighthouse (score 90+)

---

## 📞 Need Help?

**Reference Files:**
- Metadata: `src/utils/seoHelpers.js`
- Quick Guide: `src/utils/SEO_QUICK_REFERENCE.js`
- Implementation Doc: `SEO_IMPLEMENTATION.md`

**Validation Tools:**
- Schema: https://validator.schema.org/
- Rich Results: https://search.google.com/test/rich-results
- Lighthouse: Chrome DevTools → Lighthouse tab

**Documentation:**
- Schema.org: https://schema.org/
- Google Search Central: https://developers.google.com/search
- React Helmet Async: https://github.com/staylor/react-helmet-async

---

**Last Updated:** January 29, 2026  
**Status:** ✅ Production Ready
