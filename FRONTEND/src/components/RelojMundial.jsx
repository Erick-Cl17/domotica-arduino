// Reloj mundial con segundos y selector de zona horaria.
import { useEffect, useState } from 'react';
import { ZONAS_HORARIAS, horaEnZona, fechaEnZona } from '../lib/clima';

function RelojMundial({ zona, onCambiarZona }) {
    const [ahora, setAhora] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setAhora(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="reloj">
            <div className="reloj-hora">{horaEnZona(ahora, zona)}</div>
            <div className="reloj-meta">
                <span className="reloj-fecha">{fechaEnZona(ahora, zona)}</span>
                <select className="reloj-select" value={zona} onChange={(e) => onCambiarZona(e.target.value)} aria-label="Zona horaria">
                    {ZONAS_HORARIAS.map((z) => (<option key={z.id} value={z.id}>{z.nombre}</option>))}
                </select>
            </div>
        </div>
    );
}

export default RelojMundial
