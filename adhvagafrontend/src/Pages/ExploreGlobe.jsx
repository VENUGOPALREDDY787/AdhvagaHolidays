import React, { useState, useEffect, useRef } from 'react';

// --- Configuration Data ---
const PLACES = [
  { name: "Paris", url: "https://loremflickr.com/300/400/paris,tower", desc: "The City of Light. Famous for the Eiffel Tower, the Louvre, and its cafe culture." },
  { name: "Rome", url: "https://loremflickr.com/300/400/rome,colosseum", desc: "The Eternal City. Home to the Colosseum, the Pantheon, and the Vatican." },
  { name: "Tokyo", url: "https://loremflickr.com/300/400/tokyo,city", desc: "A dazzling mix of neon skyscrapers, historic temples, and incredible food." },
  { name: "London", url: "https://loremflickr.com/300/400/london,bridge", desc: "Historic capital featuring Big Ben, the Tower of London, and red buses." },
  { name: "New York", url: "https://loremflickr.com/300/400/newyork,statue", desc: "The city that never sleeps. Times Square, Central Park, and Broadway." },
  { name: "Dubai", url: "https://loremflickr.com/300/400/dubai,skyscraper", desc: "A city of future. Known for the Burj Khalifa and luxury shopping." },
  { name: "Sydney", url: "https://loremflickr.com/300/400/sydney,opera", desc: "Famous for its stunning Opera House and the Sydney Harbour Bridge." },
  { name: "Bali", url: "https://loremflickr.com/300/400/bali,nature", desc: "A tropical paradise of beaches, temples, and rice terraces." },
  { name: "Cairo", url: "https://loremflickr.com/300/400/cairo,pyramid", desc: "The gateway to the Great Pyramids of Giza and the Sphinx." },
  { name: "Santorini", url: "https://loremflickr.com/300/400/santorini", desc: "Beautiful white-washed houses on volcanic cliffs overlooking the blue sea." }
];

const TOTAL_CARDS = 40;
const RADIUS = 400;

export default function TouristGlobe() {
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
        targetRot.current.y += 0.1;
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
    // Don't open modal if we were dragging
    if (isClickDrag.current) return;
    
    setSelectedPlace(place);
    isPaused.current = true;
  };

  const closeModal = () => {
    setSelectedPlace(null);
    isPaused.current = false;
  };

  return (
    <div 
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

          const x = RADIUS * Math.cos(theta) * Math.sin(phi);
          const y = RADIUS * Math.sin(theta) * Math.sin(phi);
          const z = RADIUS * Math.cos(phi);

          const rotY = (theta * 180) / Math.PI;
          const rotX = (phi * 180) / Math.PI - 90;

          return (
            <div
              key={i}
              style={{
                ...styles.card,
                transform: `rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(${RADIUS}px)`,
              }}
              onClick={(e) => handleCardClick({ ...place, img: imgUrl }, e)}
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
          style={{...styles.modalOverlay, ...(selectedPlace ? styles.modalOverlayActive : {})}}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div style={{...styles.modalContent, ...(selectedPlace ? styles.modalContentActive : {})}}>
            <button style={styles.closeBtn} onClick={closeModal}>×</button>
            <img src={selectedPlace.img} alt={selectedPlace.name} style={styles.modalImg} />
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
    backgroundColor: '#111',
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
    backgroundColor: '#333',
    borderRadius: '8px',
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
    left: '-60px',
    top: '-80px',
    cursor: 'pointer',
    transition: 'filter 0.2s',
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.3s ease',
  },
  modalOverlayActive: {
    opacity: 1,
    pointerEvents: 'all',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '300px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    transform: 'scale(0.9)',
    transition: 'transform 0.3s ease',
    position: 'relative',
  },
  modalContentActive: {
    transform: 'scale(1)',
  },
  modalImg: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    backgroundColor: '#ddd',
  },
  modalBody: {
    padding: '20px',
    color: '#333',
  },
  modalTitle: {
    margin: '0 0 10px 0',
    fontSize: '24px',
  },
  modalDesc: {
    margin: 0,
    fontSize: '14px',
    lineHeight: 1.5,
    color: '#666',
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '30px',
    height: '30px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
