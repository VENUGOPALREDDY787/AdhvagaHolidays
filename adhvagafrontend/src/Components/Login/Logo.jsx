import React from "react";
import "./Logo.css";

const Logo = ({ className = "", size = "md" }) => {
  const sizeMap = {
    sm: "logo-sm",
    md: "logo-md",
    lg: "logo-lg",
    xl: "logo-xl",
  };

  return (
    <div className={`logo-container ${sizeMap[size]} ${className}`}>
      {/* Dashed Circle */}
      <svg
        viewBox="0 0 100 100"
        className="logo-orbit"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        {/* Airplane Icon */}
        <g transform="translate(95, 50) rotate(90)">
          <path
            d="M-4,-4 L4,0 L-4,4 L-2,0 Z"
            fill="currentColor"
            transform="scale(1.5)"
          />
        </g>
      </svg>

      {/* Brand Text */}
      <div className="logo-text">
        <span className="logo-title">ADHVAGA</span>
        <span className="logo-subtitle">HOLIDAYS INC</span>
      </div>
    </div>
  );
};

export default Logo;
