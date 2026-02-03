/**
 * SEO Breadcrumb Component - Structured navigation with schema
 * Implements BreadcrumbList schema for search engine crawling
 */

import { Helmet } from "react-helmet-async";
import { generateBreadcrumbSchema } from "../../utils/seoHelpers";
import { Link } from "react-router-dom";

export default function SEOBreadcrumb({ breadcrumbs = [] }) {
  if (!breadcrumbs.length) return null;

  const schema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="breadcrumb-container">
        <ol className="breadcrumb-list">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="breadcrumb-item">
              {crumb.url ? (
                <>
                  <Link to={crumb.url}>{crumb.name}</Link>
                  {index < breadcrumbs.length - 1 && <span aria-hidden="true"> / </span>}
                </>
              ) : (
                <>
                  <span>{crumb.name}</span>
                  {index < breadcrumbs.length - 1 && <span aria-hidden="true"> / </span>}
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
