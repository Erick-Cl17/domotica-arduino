// Reutilizado y adaptado de: Header.jsx (proyecto Página Informativa)
// Se conserva la misma estructura <nav className="header"> con <Link>, solo cambian las rutas del menú.
// Se agregó el logo, el reloj mundial y el selector °C/°F (props desde App.jsx).
import { Link } from 'react-router-dom';
import RelojMundial from './RelojMundial';
import logoMev from '../assets/logo-mev.png';

function Header({ unidad, setUnidad, zona, setZona }) {
  return (
      <nav className="header">
        <img src={logoMev} alt="MEV App Solutions" className="header-logo" />
        <Link to="/">Panel</Link>
        <Link to="/historial">Historial</Link>
        <RelojMundial zona={zona} onCambiarZona={setZona} />
        <div className="unidad-switch" role="group" aria-label="Unidad de temperatura">
          <button type="button" className={unidad === 'C' ? 'activo' : ''} onClick={() => setUnidad('C')}>°C</button>
          <button type="button" className={unidad === 'F' ? 'activo' : ''} onClick={() => setUnidad('F')}>°F</button>
        </div>
      </nav>
  );
}

export default Header
