import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import './ContactLanyard.css';

export default function ContactLanyard() {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleClick = () => {
    navigate('/Support');
  };

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="lanyard-wrapper"
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
          {/* Lanyard Strap */}
          <div className="lanyard-strap">
            <div className="lanyard-stripe"></div>
          </div>
          
          {/* Clip */}
          <div className="lanyard-clip"></div>
          
          {/* Badge Card */}
          <motion.div
            className="lanyard-badge"
            onClick={handleClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            animate={{
              rotateZ: isHovered ? [0, -3, 3, -2, 2, 0] : 0,
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 0.4 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="badge-header">
              <span className="badge-label">CONTACT US</span>
            </div>
            
            <div className="badge-content">
              <div className="badge-icon">
                <Phone size={24} />
              </div>
              <div className="badge-text">
                <span className="badge-title">Get in Touch</span>
                <span className="badge-subtitle">24/7 Support</span>
              </div>
            </div>
            
            <div className="badge-footer">
              <MessageCircle size={14} />
              <span>Click to connect</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
