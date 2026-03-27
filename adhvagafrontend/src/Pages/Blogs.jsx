import BlogsPage from "../Components/Blogs/BlogsPage";
import SEOHead from "../Components/SEO/SEOHead";
import { SEO_METADATA, generateBreadcrumbSchema } from "../utils/seoHelpers";

function Blogs() {
    const metadata = SEO_METADATA.blogs;
    const breadcrumbs = [
        { name: "Home", url: "/home" },
        { name: "Blogs", url: "/blogs" }
    ];

    return ( <>
    <SEOHead
        title={metadata.title}
        description={metadata.description}
        keywords={metadata.keywords}
        url="/blogs"
        image={metadata.image}
        structuredData={generateBreadcrumbSchema(breadcrumbs)}
    />
    <main role="main" aria-label="Main content">
    <BlogsPage/>
    </main>
    </> );
}

export default Blogs;