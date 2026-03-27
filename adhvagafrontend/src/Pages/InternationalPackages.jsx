import CinematicInternational from "./CinematicInternational";
import SEOHead from "../Components/SEO/SEOHead";
import { SEO_METADATA, generateBreadcrumbSchema } from "../utils/seoHelpers";

function International() {
    const metadata = SEO_METADATA.international;
    const breadcrumbs = [
        { name: "Home", url: "/home" },
        { name: "International Holidays", url: "/international" }
    ];

    return ( <>
     <SEOHead
        title={metadata.title}
        description={metadata.description}
        keywords={metadata.keywords}
        url="/international"
        image={metadata.image}
        structuredData={generateBreadcrumbSchema(breadcrumbs)}
      />

    <main role="main" aria-label="Main content" style={{ margin: 0, padding: 0 }}>
    <CinematicInternational/>
    </main>
    </> );
}

export default International;