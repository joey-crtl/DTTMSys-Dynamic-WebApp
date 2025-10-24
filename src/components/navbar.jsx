import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }, []);

  return (
    <header>
      <div className="container">
        {/* Hamburger moved before logo */}
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <h1 className="logo">
          <img src="./img/logoo.png" alt="Travista Logo" className="logo-img" />
          Doctor Travel & Tours
        </h1>

        <nav className={menuOpen ? "open" : ""}>
          <ul>
            <li>
              <button className="nav-link" onClick={() => scrollToSection("home")}>
                Home
              </button>
            </li>
            <li>
              <Link className="nav-link" to="/international" onClick={() => setMenuOpen(false)}>
                International
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/domestic" onClick={() => setMenuOpen(false)}>
                Domestic
              </Link>
            </li>
            <li>
              <button className="nav-link" onClick={() => scrollToSection("about")}>
                About
              </button>
            </li>
            <li>
              <button className="nav-link" onClick={() => scrollToSection("contact")}>
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
