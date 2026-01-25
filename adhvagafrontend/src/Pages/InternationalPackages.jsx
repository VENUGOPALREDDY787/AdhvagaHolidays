import PackagesSection from "../Components/Packages/InternationalPackages";
function International() {
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
            'linear-gradient(120deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url("/pexels-dominikagregus-672532 copy.jpg") center/cover',
        }}
      >
        <div style={{ maxWidth: '900px' }}>
          <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.9rem' }}>
            See the World
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', margin: '0.5rem 0 1rem', fontWeight: 900 }}>
            Signature International Holidays
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, margin: '0 auto', maxWidth: '700px', color: 'rgba(255,255,255,0.9)' }}>
            Luxe city breaks, island escapes, alpine adventures, and cultural circuits—crafted end-to-end with visas, stays, and guides sorted.
          </p>
        </div>
      </section>
    <PackagesSection/>
    </> );
}

export default International;