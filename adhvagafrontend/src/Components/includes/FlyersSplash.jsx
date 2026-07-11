import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "../../config/api";
import "./FlyersSplash.css";

const FlyersSplash = ({ duration = 4000, onDone }) => {
  const [flyers, setFlyers] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadFlyers = async () => {
      try {
        const [settingsRes, flyersRes] = await Promise.all([
          fetch(`${BASE_URL}/api/settings`),
          fetch(`${BASE_URL}/api/flyers`)
        ]);
        
        const settings = await settingsRes.json();
        
        if (settings.flyersEnabled === false) {
          if (isMounted) onDone?.();
          return;
        }

        const data = await flyersRes.json();
        const activeFlyers = Array.isArray(data) ? data.filter(f => f && f.url && f.active) : [];
        
        if (activeFlyers.length === 0) {
          if (isMounted) onDone?.();
        } else {
          if (isMounted) {
            setFlyers(activeFlyers);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error("Flyer fetch error:", err);
        if (isMounted) onDone?.();
      }
    };
    loadFlyers();

    return () => { isMounted = false; };
  }, [onDone]);

  useEffect(() => {
    if (loading || !flyers.length) return;

    const timer = setTimeout(() => {
      if (index < flyers.length - 1) {
        setIndex((i) => i + 1);
      } else {
        setIndex(0); // loop back to first flyer
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [flyers, index, duration, loading]);

  if (loading || !flyers.length) {
    return <div className="flyers-splash"><div className="flyers-splash-overlay" /></div>;
  }

  const current = flyers[index];

  const handleSkip = () => {
    onDone?.();
  };

  return (
    <motion.div
      className="flyers-splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="flyers-splash-overlay" />
      <AnimatePresence mode="wait">
        <motion.img
          key={current.url}
          src={current.url}
          alt={current.name || "flyer"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </AnimatePresence>
      <motion.button 
        className="skip-btn close-btn font-display" 
        onClick={handleSkip} 
        aria-label="Close flyers"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="material-symbols-outlined">close</span>
      </motion.button>
    </motion.div>
  );
};

export default FlyersSplash;
