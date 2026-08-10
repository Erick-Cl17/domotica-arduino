// Combo box de selección múltiple para elegir qué sensores
// se muestran en la tabla del historial (temperatura, humedad, voltaje, amperaje).
import { useState, useRef, useEffect } from 'react';

export const SENSORES = [
    { clave: 'temperatura', etiqueta: 'Temperatura' },
    { clave: 'humedad', etiqueta: 'Humedad' },
    { clave: 'voltaje', etiqueta: 'Voltaje' },
    { clave: 'amperaje', etiqueta: 'Amperaje' },
];

function FiltroSensores({ seleccionados, onCambiar }) {
    const [abierto, setAbierto] = useState(false);
    const contenedor = useRef(null);

    useEffect(() => {
        const alClickFuera = (e) => {
            if (contenedor.current && !contenedor.current.contains(e.target)) setAbierto(false);
        };
        document.addEventListener('mousedown', alClickFuera);
        return () => document.removeEventListener('mousedown', alClickFuera);
    }, []);

    const alternar = (clave) => {
        onCambiar(
            seleccionados.includes(clave)
                ? seleccionados.filter((c) => c !== clave)
                : SENSORES.filter((s) => seleccionados.includes(s.clave) || s.clave === clave).map((s) => s.clave)
        );
    };

    const texto =
        seleccionados.length === 0
            ? 'Ningún sensor'
            : seleccionados.length === SENSORES.length
                ? 'Todos los sensores'
                : SENSORES.filter((s) => seleccionados.includes(s.clave)).map((s) => s.etiqueta).join(', ');

    return (
        <div className="filtro-sensores" ref={contenedor}>
            <span className="filtro-sensores-titulo">Sensores</span>
            <button
                type="button"
                className={`filtro-sensores-boton ${abierto ? 'abierto' : ''}`}
                onClick={() => setAbierto((v) => !v)}
                aria-expanded={abierto}
            >
                <span>{texto}</span>
                <span className="filtro-sensores-flecha">▾</span>
            </button>

            {abierto && (
                <div className="filtro-sensores-menu">
                    {SENSORES.map((s) => (
                        <label key={s.clave} className="filtro-sensores-opcion">
                            <input
                                type="checkbox"
                                checked={seleccionados.includes(s.clave)}
                                onChange={() => alternar(s.clave)}
                            />
                            <span>{s.etiqueta}</span>
                        </label>
                    ))}
                    <div className="filtro-sensores-acciones">
                        <button type="button" onClick={() => onCambiar(SENSORES.map((s) => s.clave))}>Todos</button>
                        <button type="button" onClick={() => onCambiar([])}>Ninguno</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FiltroSensores;