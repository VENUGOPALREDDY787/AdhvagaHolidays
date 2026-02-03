
import DomesticPackages from "../Components/Packages/DomesticPackages";
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

      <section
        style={{
          position: 'relative',
          minHeight: '320px',
          display: 'grid',
          placeItems: 'center',
          padding: '4rem 1.5rem',
          color: '#fff',
          textAlign: 'center',
          overflow: 'hidden',
        }}
        aria-label="Domestic holidays hero section"
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
          <source src="/get (2).mp4" type="video/mp4" />
        </video>

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(120deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35))',
          zIndex: 1,
        }} aria-hidden="true"></div>

        <div style={{ maxWidth: '900px', position: 'relative', zIndex: 2 }}>
          <p style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.9rem', fontFamily: "'Lato', sans-serif" }}>
            Explore India
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', margin: '0.5rem 0 1rem', fontWeight: 600, fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.05em', lineHeight: 1.3 }}>
            {metadata.h1}
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: '0 auto', maxWidth: '700px', color: 'rgba(255,255,255,0.9)', fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            From royal forts of Rajasthan to the calm backwaters of Kerala, pick from hand-crafted getaways across India with trusted stays and seamless travel.
          </p>
        </div>
      </section>

      <main role="main" aria-label="Main content">
      <DomesticPackages/>
      </main>
    </>)
}
export default Domestic;