
import DomesticPackages from "../Components/Packages/DomesticPackages";
function Domestic() {
    return ( <>
      <section
        style={{
          position: 'relative',
          minHeight: '320px',
          display: 'grid',
          placeItems: 'center',
          padding: '4rem 1.5rem',
          color: '#fff',
          textAlign: 'center',
          background:
            'linear-gradient(120deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35)), url(/c056128aaf9f2bd91f2d6a099b9fd060.jpg) center/cover',
        }}
      >
        <div style={{ maxWidth: '900px' }}>
          <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.9rem' }}>
            Explore India
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', margin: '0.5rem 0 1rem', fontWeight: 900 }}>
            Curated Domestic Holidays
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, margin: '0 auto', maxWidth: '700px', color: 'rgba(255,255,255,0.9)' }}>
            From royal forts of Rajasthan to the calm backwaters of Kerala, pick from hand-crafted getaways across India with trusted stays and seamless travel.
          </p>
        </div>
      </section>

      <DomesticPackages/>
    </>)
}
export default Domestic;