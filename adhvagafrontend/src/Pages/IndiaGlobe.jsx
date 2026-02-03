import React, { useState, useEffect, useRef } from 'react';

// --- Indian Tourist Places Data ---
const PLACES = [
  { name: "Taj Mahal", url: "https://loremflickr.com/300/400/tajmahal,agra", desc: "Agra. An immense mausoleum of white marble, built by Shah Jahan in memory of his favorite wife." },
  { name: "Varanasi Ghats", url: "https://loremflickr.com/300/400/varanasi,ganga", desc: "The spiritual capital of India. Famous for the Ganga Aarti and the ancient ghats along the river." },
  { name: "Kerala Backwaters", url: "https://loremflickr.com/300/400/kerala,boat", desc: "Alleppey. A network of brackish lagoons and lakes, best experienced via a traditional houseboat." },
  { name: "Hawa Mahal", url: "https://loremflickr.com/300/400/jaipur,palace", desc: "Jaipur. The 'Palace of Winds', a unique pink sandstone structure designed for royal ladies to observe the street." },
  { name: "Pangong Lake", url: "https://loremflickr.com/300/400/ladakh,lake", desc: "Ladakh. A breathtaking endorheic lake in the Himalayas that changes colors from blue to green to red." },
  { name: "Goa Beaches", url: "https://loremflickr.com/300/400/goa,beach", desc: "Known for its golden sandy beaches, Portuguese heritage, and vibrant nightlife." },
  { name: "Golden Temple", url: "https://loremflickr.com/300/400/goldentemple,amritsar", desc: "Amritsar. The holiest Gurdwara of Sikhism, famous for its gilded dome and community kitchen (Langar)." },
  { name: "Hampi Ruins", url: "https://loremflickr.com/300/400/hampi,temple", desc: "Karnataka. A UNESCO World Heritage site featuring the spectacular ruins of the medieval Vijayanagara Empire." },
  { name: "Gateway of India", url: "https://loremflickr.com/300/400/mumbai,gateway", desc: "Mumbai. An arch-monument built in the 20th century, serving as the city's top tourist attraction." },
  { name: "Mysore Palace", url: "https://loremflickr.com/300/400/mysore,palace", desc: "Karnataka. A historical palace known for its Indo-Saracenic architecture and grand Dussehra celebrations." },
  { name: "Rishikesh", url: "https://loremflickr.com/300/400/rishikesh,bridge", desc: "The Yoga Capital of the World, situated beside the Ganges River in the foothills of the Himalayas." },
  { name: "Victoria Memorial", url: "https://loremflickr.com/300/400/kolkata,memorial", desc: "Kolkata. A large marble building dedicated to the memory of Queen Victoria, now a museum." }
];

const TOTAL_CARDS = 35;
const RADIUS = 400;

export default function IndiaGlobe() {
  const sceneRef = useRef(null);
  const globeRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  
  // Animation refs
  const isDragging = useRef(false);
  const isClickDrag = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0 });
  const targetRot = useRef({ x: 0, y: 0 });
  const isPaused = useRef(false);

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      // Auto rotation (only if not dragging and modal not open)
      if (!isDragging.current && !isPaused.current) {
        targetRot.current.y += 0.15; // Slightly faster auto-rotation
      }

      // Smooth interpolation
      currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.05;
      currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.05;

      if (globeRef.current) {
        globeRef.current.style.transform = `rotateX(${currentRot.current.x}deg) rotateY(${currentRot.current.y}deg)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    isClickDrag.current = false;
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    // If moved more than 5 pixels, consider it a drag
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      isClickDrag.current = true;
    }

    targetRot.current.y += deltaX * 0.5;
    targetRot.current.x -= deltaY * 0.5;

    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleCardClick = (place, e) => {
    e.stopPropagation();
    // Ignore if it was a drag
    if (isClickDrag.current) return;
    
    const imgUrl = `${place.url}?random=${Math.random()}`;
    setSelectedPlace({ ...place, fullImg: imgUrl });
    isPaused.current = true;
  };

  const closeModal = () => {
    setSelectedPlace(null);
    isPaused.current = false;
  };

  return (
    <div 
      ref={sceneRef}
      style={styles.scene}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div ref={globeRef} style={styles.globe}>
        {Array.from({ length: TOTAL_CARDS }).map((_, i) => {
          const place = PLACES[i % PLACES.length];
          const imgUrl = `${place.url}?random=${i}`;

          // Fibonacci Sphere Algorithm
          const phi = Math.acos(-1 + (2 * i) / TOTAL_CARDS);
          const theta = Math.sqrt(TOTAL_CARDS * Math.PI) * phi;

          const rotY = (theta * 180) / Math.PI;
          const rotX = (phi * 180) / Math.PI - 90;

          return (
            <div
              key={i}
              style={{
                ...styles.card,
                transform: `rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(${RADIUS}px)`,
              }}
              onClick={(e) => handleCardClick(place, e)}
            >
              <img 
                src={imgUrl} 
                alt={place.name} 
                style={styles.cardImage}
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      {/* Modal Popup */}
      {selectedPlace && (
        <div 
          style={{...styles.modalOverlay, opacity: 1, pointerEvents: 'all'}}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div style={{...styles.modalContent, transform: 'scale(1)'}}>
            <button style={styles.closeBtn} onClick={closeModal}>×</button>
            <img src={selectedPlace.fullImg} alt={selectedPlace.name} style={styles.modalImg} />
            <div style={styles.modalBody}>
              <h2 style={styles.modalTitle}>{selectedPlace.name}</h2>
              <p style={styles.modalDesc}>{selectedPlace.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Styles ---
const styles = {
  scene: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#050505',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'grab',
    transformStyle: 'preserve-3d',
    perspective: '1200px',
    overflow: 'hidden',
  },
  globe: {
    position: 'relative',
    width: 0,
    height: 0,
    transformStyle: 'preserve-3d',
  },
  card: {
    position: 'absolute',
    width: '120px',
    height: '160px',
    background: '#222',
    border: '1px solid #444',
    borderRadius: '8px',
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
    left: '-60px',
    top: '-80px',
    cursor: 'pointer',
    transition: 'transform 0.1s, filter 0.2s, box-shadow 0.2s',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    pointerEvents: 'none',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.3s ease',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '320px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
    transform: 'scale(0.9)',
    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    position: 'relative',
  },
  modalImg: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    backgroundColor: '#eee',
  },
  modalBody: {
    padding: '24px',
    textAlign: 'center',
    color: '#333',
  },
  modalTitle: {
    margin: '0 0 10px 0',
    fontSize: '22px',
    color: '#d35400',
    fontWeight: 700,
  },
  modalDesc: {
    margin: 0,
    fontSize: '14px',
    lineHeight: 1.6,
    color: '#555',
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '32px',
    height: '32px',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  },
};
