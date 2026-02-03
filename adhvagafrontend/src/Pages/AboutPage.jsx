import Hero from "../Components/About/Hero";
import Milestones from "../Components/About/Milestones";
import Story from '../Components/About/Story'
import Values from "../Components/About/Values";
import Team from "../Components/About/Team";
import AboutUs from "../Components/About/AboutUs";
import Mission from "../Components/About/Mission";
import Services from "../Components/About/Services";
import SEOHead from "../Components/SEO/SEOHead";
import SEOBreadcrumb from "../Components/SEO/SEOBreadcrumb";
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
        <Hero/>
        
        <AboutUs/>
        <Mission/>
        <Services/>
        <Values/>
        <Story/>
        <Milestones/>
        
        
        <Team/>
        </main>
        </> );
}

export default AboutPage;