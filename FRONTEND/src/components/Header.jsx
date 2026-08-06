// Reutilizado y adaptado de: Header.jsx (proyecto Página Informativa)
// Se conserva la misma estructura <nav className="header"> con <Link>, solo cambian las rutas del menú.
import { Link } from 'react-router-dom';

function Header() {
  return (
      <nav className="header">
        <Link to="/">Panel</Link>
        <Link to="/historial">Historial</Link>
      </nav>
  );
}

export default Header
