import "./Features.css";
const FEATURE_DATA = [
  {
    title: "Customize Your Trip",
    icon: "✈️",
    link: "Check Status",
  },
  {
    title: "Featured Packages",
    icon: "💰",
    link: "Claim Refund",
  },
];
function Features() {
    return ( <>
    <div className="container">
        <div className="row">
          <div className="features-container">
      {FEATURE_DATA.map((feature, i) => (
        <div key={i} className="feature-card">
          <div className="feature-left">
            <div className="feature-icon">
              {feature.icon}
            </div>

            <div>
              <h3 className="feature-title">{feature.title}</h3>
            </div>
          </div>

          <div className="feature-arrow">
            <svg
              className="arrow-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
        </div>
    </div>
    </> );
}

export default Features;