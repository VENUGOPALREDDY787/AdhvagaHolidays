import { Link } from "react-router-dom";

const routeItems = [
  { label: "Home", to: "/Home", key: "home" },
  { label: "About", to: "/About", key: "about" },
  { label: "Domestic", to: "/Domestic", key: "domestic" },
  { label: "International", to: "/International", key: "international" },
  { label: "Services", to: "/Services", key: "services" },
];

export function CinematicHeader({ activeKey }) {
  return null;
}

export function CinematicSideDots({ dots }) {
  return (
    <nav className="cine-dot-nav" aria-label="Section navigation">
      {dots.map((dot, index) => (
        <a
          key={dot.id}
          className={`cine-dot ${index === 0 ? "active" : ""}`}
          href={`#${dot.id}`}
          title={dot.label}
          aria-label={dot.label}
        />
      ))}
    </nav>
  );
}

export function CinematicRightTab({ label = "Explore" }) {
  return (
    <div className="cine-right-tab" aria-hidden="true">
      <button type="button">{label}</button>
    </div>
  );
}

export function CinematicCursor() {
  return <div className="cine-cursor" aria-hidden="true" />;
}
