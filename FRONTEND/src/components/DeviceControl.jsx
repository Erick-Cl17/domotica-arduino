// Control del foco contra el backend 
// A diferencia del botón ON/OFF que ya existe en Panel.jsx (que solo cambiaba un estado local en React)
// Este componente sí persiste el estado en la base de datos a través de GET/PATCH /api/dispositivos/foco. 
// Reutiliza el componente Boton ya existente, mismo patrón "valor + darClick".
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

    useEffect(() => {
        cargarEstado();
    }, []);

    // mismo patrón "recibe valor del Boton" que ya usa Panel.jsx en manejarEstado
    const manejarCambio = async (valorBoton) => {
        const nuevoEstado = valorBoton === 'ON';
        try {
            const foco = await cambiarEstadoFoco(nuevoEstado);
            setEstado(Boolean(foco.estado));
        } catch (error) {
            console.error('Error al cambiar el estado del foco:', error);
        }
    };

    if (cargando) return <p>Cargando estado del foco...</p>;

    return (
        <div className="control-foco">
            <p>Foco (guardado en base de datos): {estado ? 'Encendido 💡' : 'Apagado'}</p>
            <Boton valor={estado ? 'OFF' : 'ON'} darClick={manejarCambio} />
        </div>
    );
}

export default DeviceControl;
