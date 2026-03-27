import CinematicAbout from "./CinematicAbout";
import SEOHead from "../Components/SEO/SEOHead";
import { SEO_METADATA, generateBreadcrumbSchema } from "../utils/seoHelpers";

function AboutPage() {
    const metadata = SEO_METADATA.about;
    const breadcrumbs = [
        { name: "Home", url: "/home" },
        { name: "About Us", url: "/about" }
    ];

    return ( <>
        <SEOHead
            title={metadata.title}
            description={metadata.description}
            keywords={metadata.keywords}
            url="/about"
            image={metadata.image}
            structuredData={generateBreadcrumbSchema(breadcrumbs)}
        />
        
        <main role="main" aria-label="Main content">
        <CinematicAbout/>
        </main>
        </> );
}

export default AboutPage;