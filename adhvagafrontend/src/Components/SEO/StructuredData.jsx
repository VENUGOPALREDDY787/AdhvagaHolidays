/**
 * Structured Data Component - Injects JSON-LD schemas into document head
 * Supports Organization, TravelAgency, LocalBusiness, and Service schemas
 */

import { Helmet } from "react-helmet-async";

export default function StructuredData({ schemas = [] }) {
  if (!schemas || schemas.length === 0) return null;

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
