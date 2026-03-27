import StitchServicesExperience from "./StitchServicesExperience";
import SEOHead from "../Components/SEO/SEOHead";
import ChatWidget from "../Components/ChatWidget";
import { SEO_METADATA, generateBreadcrumbSchema } from "../utils/seoHelpers";

export default function ServicesPage() {
  const metadata = SEO_METADATA.services;
  const breadcrumbs = [
    { name: "Home", url: "/home" },
    { name: "Services", url: "/services" },
  ];

  return (
    <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
        keywords={metadata.keywords}
        url="/services"
        image={metadata.image}
        structuredData={generateBreadcrumbSchema(breadcrumbs)}
      />

      <main role="main" aria-label="Main content">
        <StitchServicesExperience />
      </main>

      <ChatWidget />
    </>
  );
}