import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="font-body selection:bg-primary selection:text-on-primary">
      <main className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 not-found-bg"></div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <div className="relative mb-8">
            {/* Massive 404 */}
            <h1 className="font-accent text-[22vw] leading-none text-[#d39e17] tracking-tighter opacity-90 select-none text-shadow-hero animate-float-404">
              404
            </h1>
            {/* Overlapping Signature */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-signature text-[7vw] text-white whitespace-nowrap mt-[5vw] ml-[2vw] drop-shadow-lg transform -rotate-3 animate-dance-signature">
                Lost in the Wild
              </span>
            </div>
          </div>

          {/* Descriptive Text */}
          <div className="max-w-2xl mx-auto space-y-8 mt-[-2vw]">
            <p className="font-headline text-lg md:text-2xl text-[var(--on-surface)]/80 tracking-wide font-light text-white">
              It seems you've wandered off the map. <br className="hidden md:block" /> Let us guide you back to civilization.
            </p>
            <div className="flex justify-center pt-4">
              <Link
                to="/"
                className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-bold tracking-[0.3em] text-black bg-[#d39e17] border-none rounded-none transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-2xl animate-pulse-button"
              >
                <span className="relative uppercase text-sm font-headline">Return to Basecamp</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-[#d39e17] rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{ left: "-6px", top: "-6px" }}
      ></div>
    </div>
  );
};

export default NotFound;
