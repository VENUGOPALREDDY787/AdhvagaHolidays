import CinematicDomestic from "./CinematicDomestic";
import SEOHead from "../Components/SEO/SEOHead";
import { SEO_METADATA, generateBreadcrumbSchema } from "../utils/seoHelpers";

function Domestic() {
    const metadata = SEO_METADATA.domestic;
    const breadcrumbs = [
        { name: "Home", url: "/home" },
        { name: "Domestic Holidays", url: "/domestic" }
    ];

    return ( <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
        keywords={metadata.keywords}
        url="/domestic"
        image={metadata.image}
        structuredData={generateBreadcrumbSchema(breadcrumbs)}
      />

      <main role="main" aria-label="Main content">
      <CinematicDomestic/>
      </main>
    </>)
}
export default Domestic;