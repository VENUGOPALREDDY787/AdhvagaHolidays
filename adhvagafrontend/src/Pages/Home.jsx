import HomePage from "../Components/Home/homepage";
import BlogsPage from "../Components/Blogs/BlogsPage";
import SEOHead from "../Components/SEO/SEOHead";
import StructuredData from "../Components/SEO/StructuredData";
import { SEO_METADATA, generateOrganizationSchema, generateTravelAgencySchema } from "../utils/seoHelpers";

function Home() {
    const metadata = SEO_METADATA.home;
    const organizationSchema = generateOrganizationSchema();
    const travelAgencySchema = generateTravelAgencySchema();

    return ( 
    <>
   <SEOHead
        title={metadata.title}
        description={metadata.description}
        keywords={metadata.keywords}
        url="/home"
        image={metadata.image}
        structuredData={[organizationSchema, travelAgencySchema]}
      />
   <main role="main" aria-label="Main content">
   <HomePage/>
   <BlogsPage/>
   </main>
    </> );
}

export default Home;