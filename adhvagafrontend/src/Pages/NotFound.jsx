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
    <div className="not-found-container">
      <main className="not-found-main">
        {/* Background Layer */}
        <div className="not-found-bg"></div>

        {/* Content Layer */}
        <div className="not-found-content">
          <div className="not-found-title-wrapper">
            {/* Massive 404 */}
            <h1 className="not-found-title">
              404
            </h1>
            {/* Overlapping Signature */}
            <div className="not-found-signature-wrapper">
              <span className="not-found-signature">
                Lost in the Wild
              </span>
            </div>
          </div>

          {/* Descriptive Text */}
          <div className="not-found-desc-wrapper">
            <p className="not-found-desc">
              It seems you've wandered off the map. <br className="hidden-mobile" /> Let us guide you back to civilization.
            </p>
            <div className="not-found-btn-wrapper">
              <Link
                to="/"
                className="not-found-btn"
              >
                <span>Return to Basecamp</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor"
      ></div>
    </div>
  );
};

export default NotFound;
