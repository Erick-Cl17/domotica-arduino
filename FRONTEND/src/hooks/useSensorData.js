// Hook personalizado 
// Encapsula la potencia calculada por el backend y el estado de conexión, con polling automático cada 5 segundos. 
// Se usa en los componentes nuevos (PotenciaCard, ConnectionStatus) sin tocar el estado que Panel.jsx ya maneja por su cuenta.
import { useState, useEffect } from 'react';
import { obtenerPotenciaActual, verificarConexionBackend } from '../services/domoticApi';

function useSensorData(intervaloMs = 5000) {
    const [potenciaData, setPotenciaData] = useState(null);
    const [conectado, setConectado] = useState(true);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let activo = true;

        const actualizar = async () => {
            try {
                const [datosPotencia, estaConectado] = await Promise.all([
                    obtenerPotenciaActual(),
                    verificarConexionBackend()
                ]);
                if (!activo) return;
                setPotenciaData(datosPotencia);
                setConectado(estaConectado);
                setError(null);
            } catch (err) {
                if (!activo) return;
                setConectado(false);
                setError(err.message);
            } finally {
                if (activo) setCargando(false);
            }
        };

        actualizar();
        const intervalo = setInterval(actualizar, intervaloMs);
        return () => {
            activo = false;
            clearInterval(intervalo);
        };
    }, [intervaloMs]);

    return { potenciaData, conectado, cargando, error };
}

export default useSensorData;
