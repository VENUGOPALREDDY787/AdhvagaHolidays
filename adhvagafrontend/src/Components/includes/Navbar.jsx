import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";
import logo from "../../assets/unnamed.jpg";
import StaggeredMenu from "./StaggeredMenu";
import "./Navbar.css";

function Navbar() {
  const { settings } = useSettings();
  const location = useLocation();
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollYRef.current;

      if (currentScrollY <= 100) {
        setNavHidden(false);
      } else {
        // Hide when scrolling down, reveal when scrolling up.
        setNavHidden(!isScrollingUp);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };
  const normalizedPath = location.pathname.toLowerCase();
  const isPackageRoute = normalizedPath.startsWith("/packages/");
  const servicesIsActive = location.pathname.toLowerCase() === "/services";

  const navItemsBeforeServices = [
    { to: "/Home", label: "Home" },
    { to: "/About", label: "About" },
    { to: "/Domestic", label: "Domestic" },
    { to: "/International", label: "International" },
  ];

  const serviceItems = [
    { label: "Air Tickets", to: "/Services" },
    { label: "Visa Assistance", to: "/Services" },
    { label: "Travel Assistance", to: "/Services" },
    { label: "Corpraet Services", to: "/Services" },
    { label: "Coustom Services", to: "/Services" },
    { label: "Car Rentevlas", to: "/Services" },
    { label: "Domestic Holidays", to: "/Domestic" },
    { label: "International Holidays", to: "/International" },
  ];

  const staggeredMenuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/About' },
    { label: 'Domestic', ariaLabel: 'Domestic Holidays', link: '/Domestic' },
    { label: 'International', ariaLabel: 'International Holidays', link: '/International' },
    { label: 'Services', ariaLabel: 'Our services', link: '/Services' },
    { label: 'Contact', ariaLabel: 'Contact us', link: '/Support' }
  ];

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg py-2 ${isPackageRoute ? "navbar-home" : "navbar-solid"} ${navHidden && !menuOpen ? "navbar-hidden" : ""} ${menuOpen ? "menu-is-open" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-fluid navbar-container">
          {/* Left: Brand */}
          <div className="navbar-left">
            <Link className="navbar-brand-link" to="/Home" onClick={closeMenu}>
              <img src={logo} alt="Adhvaga Holidays logo" className="navbar-logo" />
              <span className="navbar-header">
                <h3>{settings.agencyName?.split(' ')[0]?.toUpperCase() || 'ADHVAGA'}</h3>
                <p>{settings.agencyName?.split(' ')[1]?.toUpperCase() || 'HOLIDAYS'}</p>
              </span>
            </Link>
          </div>

          {/* Center: Nav Links */}
          <div className="navbar-center">
            <ul className="navbar-nav">
              {navItemsBeforeServices.map((item) => (
                <li className="nav-item" key={item.to}>
                  <NavLink
                    className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
                    to={item.to}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              <li className={`nav-item services-nav-item ${servicesOpen ? "services-open" : ""}`}>
                <button
                  type="button"
                  className={`nav-link services-trigger ${servicesIsActive ? "active-link" : ""}`}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((prev) => !prev)}
                >
                  Services
                  <span className="services-caret" aria-hidden="true"></span>
                </button>

                <ul className="services-dropdown" aria-label="Services submenu">
                  {serviceItems.map((item) => (
                    <li key={`${item.label}-${item.to}`}>
                      <NavLink
                        className="services-dropdown-link"
                        to={item.to}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

            </ul>
          </div>

          {/* Right: CTA + Mobile menu toggle */}
          <div className="navbar-right">
            <Link to="/Support" className="navbar-support-cta" onClick={closeMenu}>
              Support
            </Link>
            <button
              type="button"
              className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="menu-line"></span>
              <span className="menu-line"></span>
              <span className="menu-line"></span>
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <button
          type="button"
          className="navbar-backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        ></button>
      )}

      <StaggeredMenu
        position="right"
        items={staggeredMenuItems}
        isOpenProp={menuOpen}
        setIsOpenProp={setMenuOpen}
        onItemClick={closeMenu}
        colors={['#1a1a1a', '#ce9c2b']}
        accentColor="#ce9c2b"
      />
    </>
  );
}

export default Navbar;
