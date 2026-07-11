import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FlyersSplash.css";

const STORAGE_KEY = "admin_flyers";

const FlyersSplash = ({ duration = 4000, onDone }) => {
  const [flyers] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return list.filter((f) => f && f.url && f.active !== false);
    } catch {
      return [];
    }
  });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!flyers.length) {
      onDone?.();
      return;
    }

    const timer = setTimeout(() => {
      if (index < flyers.length - 1) {
        setIndex((i) => i + 1);
      } else {
        setIndex(0); // loop back to first flyer
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [flyers, index, duration, onDone]);

  if (!flyers.length) return null;

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
