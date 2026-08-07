// Control del foco contra el backend 
// A diferencia del botón ON/OFF que ya existe en Panel.jsx (que solo cambiaba un estado local en React)
// Este componente sí persiste el estado en la base de datos a través de GET/PATCH /api/dispositivos/foco. 
// Reutiliza el componente Boton ya existente, mismo patrón "valor + darClick"// Se agregó un estado de "cargando" mientras se obtiene el estado del foco desde la base de datos.
import { useState, useEffect } from 'react';
import Boton from './Boton';
import { obtenerEstadoFoco, cambiarEstadoFoco } from '../services/domoticApi';

function DeviceControl() {
    const [estado, setEstado] = useState(false);
    const [cargando, setCargando] = useState(true);

    const cargarEstado = async () => {
        try {
            const foco = await obtenerEstadoFoco();
            setEstado(Boolean(foco.estado));
        } catch (error) {
            console.error('Error al cargar el estado del foco:', error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => { cargarEstado(); }, []);

    // Función manejadora para el botón, que llama a la API para cambiar el estado del foco y actualiza el estado local
    const manejarCambio = async (valorBoton) => {
        const nuevoEstado = valorBoton === 'Prender foco';
        try {
            const foco = await cambiarEstadoFoco(nuevoEstado);
            setEstado(Boolean(foco.estado));
        } catch (error) {
            console.error('Error al cambiar el estado del foco:', error);
        }
    };

    if (cargando) return <p>Cargando estado del foco...</p>;
    
    return (
        <div className={`foco-panel ${estado ? 'foco-panel--on' : 'foco-panel--off'}`}>
            <span className="foco-bombilla">💡</span>
            <div className="foco-texto">
                <span className="foco-titulo">Foco (base de datos)</span>
                <strong>{estado ? 'Prendido' : 'Apagado'}</strong>
            </div>
//            <Boton valor={estado ? 'Apagar foco' : 'Prender foco'} darClick={manejarCambio} />
        </div>
    );
}
// Se comenta el botón de control del foco porque ya existe un botón ON/OFF en Panel.jsx que controla el estado local, y este componente persiste el estado en la base de datos.
export default DeviceControl;