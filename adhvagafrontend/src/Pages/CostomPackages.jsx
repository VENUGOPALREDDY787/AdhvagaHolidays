import CustomTourForm from "../Components/CustomTour/CustomTourForm";
import SEOHead from "../Components/SEO/SEOHead";
import { SEO_METADATA, generateBreadcrumbSchema } from "../utils/seoHelpers";

function CostomPackages() {
    const metadata = SEO_METADATA.customPackages;
    const breadcrumbs = [
        { name: "Home", url: "/home" },
        { name: "Custom Packages", url: "/coustom" }
    ];

    return ( <>
    <SEOHead
        title={metadata.title}
        description={metadata.description}
        keywords={metadata.keywords}
        url="/coustom"
        image={metadata.image}
        structuredData={generateBreadcrumbSchema(breadcrumbs)}
    />
    <main role="main" aria-label="Main content">
    <CustomTourForm/>
    </main>
    </> );
}

export default CostomPackages;