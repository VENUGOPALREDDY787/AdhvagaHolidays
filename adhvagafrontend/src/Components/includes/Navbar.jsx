import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../Login/LoginModal";
import logo from "../../assets/unnamed.jpg";
import "./Navbar.css";
function Navbar() {
  const [showLogin, setShowLogin] =useState(false);
  return (<>
    <nav className="navbar navbar-expand-lg bg-body-tertiary py-2  border-bottom">
      <div className="container-fluid">
        <img src={logo} alt="no image" className="navbar-logo ms-5" />
        <span className="navbar-header ms-3 mt-2">
          <h3>ADHVAGA</h3>
          <p>HOILDAYS</p>
        </span>

        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <form class="d-flex ms-auto" role="search">
            <ul class="navbar-nav ">
              <li className="nav-item nav-hover">
                <Link class="nav-link" to="/Home">
                  Home
                </Link>
              </li>
              <li className="nav-item ms-5 nav-hover">
                <Link class="nav-link" to="/About">
                  About us
                </Link>
              </li>
              <li className="nav-item ms-5 nav-hover">
                <Link class="nav-link" to="/Packages">
                  Tour Packages
                </Link>
              </li>
               <li className="nav-item ms-5 nav-hover">
                <Link class="nav-link" to="/Coustom">
                  Coustum Packages
                </Link>
              </li>
              <li className="nav-item me-5 ms-5 nav-hover">
                <Link class="nav-link" to="/Blogs">
                  Blogs
                </Link>
              </li>
              <li class="nav-item ms-5">
                <Link class="nav-link active" aria-current="page" to="/Support">
                  <button type="button" class="btn btn-success btns btn-sm">
                    <i class="fa-solid fa-phone"></i>&nbsp;Support&nbsp;
                    <i class="fa-solid fa-angle-down"></i>
                  </button>
                </Link>
              </li>
              <li class="nav-item me-5">
                <a class="nav-link" href="#">
                  <button type="button" class="btn btn-danger btn-sm" onClick={() => setShowLogin(!showLogin)}>Login/Signup</button>
                 
                </a>
              </li>
              
            </ul>
          </form>
        </div>
      </div>
    </nav>
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}</>
  );
}

export default Navbar;
