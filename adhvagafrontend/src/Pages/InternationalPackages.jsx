import PackagesSection from "../Components/Packages/InternationalPackages";
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

     <section
        style={{
          position: 'relative',
          minHeight: '320px',
          display: 'grid',
          placeItems: 'center',
          padding: '4rem 1.5rem',
          margin: 0,
          color: '#fff',
          textAlign: 'center',
          overflow: 'hidden',
        }}
        aria-label="International holidays hero section"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/AQO5C05U8--9upfgLhhH3ciYF9l5utiHDgxVGDvoyv5s0bIvOLVcwAVXa79bAMTTojK_ivDnd9vIlVK6cTW81huFVlcUS_oN.mp4" type="video/mp4" />
        </video>

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(120deg, rgba(0,0,0,0.3), rgba(0,0,0,0.2))',
          zIndex: 1,
        }} aria-hidden="true"></div>

        <div style={{ maxWidth: '900px', position: 'relative', zIndex: 2 }}>
          <p style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.9rem', fontFamily: "'Lato', sans-serif" }}>
            See the World
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', margin: '0.5rem 0 1rem', fontWeight: 600, fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.05em', lineHeight: 1.3 }}>
            {metadata.h1}
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: '0 auto', maxWidth: '700px', color: 'rgba(255,255,255,0.9)', fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            Luxe city breaks, island escapes, alpine adventures, and cultural circuits—crafted end-to-end with visas, stays, and guides sorted.
          </p>
        </div>
      </section>

    <main role="main" aria-label="Main content" style={{ margin: 0, padding: 0 }}>
    <PackagesSection/>
    </main>
    </> );
}

export default International;