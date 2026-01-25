import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/unnamed.jpg";
import "./Navbar.css";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-2 border-bottom">
        <div className="container-fluid">
          <img src={logo} alt="no image" className="navbar-logo ms-5" />

          <span className="navbar-header ms-3 mt-2">
            <h3>ADHVAGA</h3>
            <p>HOILDAYS</p>
          </span>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
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
