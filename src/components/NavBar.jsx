import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="btn">AminaTravel</Link>
      </div>
      <ul className="nav-list">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/about">À propos</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/reserve">Réserver</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
