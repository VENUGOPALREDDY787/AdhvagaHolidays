import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";
import logo from "../../assets/unnamed.jpg";
import "./Navbar.css";

function Navbar() {
  const { settings } = useSettings();
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setScrolled(true);
      } else {
        // Scrolling up
        setScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav className={`navbar navbar-expand-lg bg-body-tertiary py-2 border-bottom ${scrolled ? 'navbar-hidden' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container-fluid">
          <img src={logo} alt="Adhvaga Holidays logo" className="navbar-logo ms-5" />

          <span className="navbar-header ms-3 mt-2">
            <h3>{settings.agencyName?.split(' ')[0]?.toUpperCase() || 'ADHVAGA'}</h3>
            <p>{settings.agencyName?.split(' ')[1]?.toUpperCase() || 'HOLIDAYS'}</p>
          </span>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMobileMenu}
            aria-controls="navbarNavDropdown"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNavDropdown">
            <form className="d-flex ms-auto" role="search">
              <ul className="navbar-nav">
                <li className="nav-item nav-hover">
                  <Link className="nav-link" to="/Home">
                    Home
                  </Link>
                </li>

                <li className="nav-item ms-5 nav-hover">
                  <Link className="nav-link" to="/About">
                    About Us
                  </Link>
                </li>

                <li className="nav-item ms-5 nav-hover">
                  <Link className="nav-link" to="/Domestic">
                    Domestic Holidays
                  </Link>
                </li>

                <li className="nav-item ms-5 nav-hover">
                  <Link className="nav-link" to="/International">
                    International Holidays
                  </Link>
                </li>

                <li className="nav-item dropdown me-5 ms-5 nav-hover">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/Services"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Services
                  </Link>

                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/Services">Air Tickets</Link></li>
                    <li><Link className="dropdown-item" to="/Domestic">Domestic Holidays</Link></li>
                    <li><Link className="dropdown-item" to="/International">International Holidays</Link></li>
                    <li><Link className="dropdown-item" to="/Services">Visa Assistance</Link></li>
                    <li><Link className="dropdown-item" to="/Services">Travel Insurance</Link></li>
                    <li><Link className="dropdown-item" to="/Services">Corporate Services</Link></li>
                    <li><Link className="dropdown-item" to="/Coustom">Custom Services</Link></li>
                    <li><Link className="dropdown-item" to="/Services">Car Rentals</Link></li>
                    <li><Link className="dropdown-item" to="/terms">Terms &amp; Conditions</Link></li>
                  </ul>
                </li>

                <li className="nav-item ms-5">
                  <Link className="nav-link active" to="/Support">
                    <button type="button" className="btn btn-success btns btn-sm">
                      <i className="fa-solid fa-phone"></i>&nbsp;Support&nbsp;
                      <i className="fa-solid fa-angle-down"></i>
                    </button>
                  </Link>
                </li>

            

              </ul>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
