// Indicador de conexión con el backend.
// Reutiliza el hook useSensorData ya creado en vez de duplicar lógica de fetch/polling.
import useSensorData from '../hooks/useSensorData';

function ConnectionStatus() {
    const { conectado, cargando } = useSensorData();

    if (cargando) return null;

    return (
        <div className={`conexion-estado ${conectado ? 'conectado' : 'desconectado'}`}>
            <span className="conexion-punto"></span>
            {conectado ? 'Backend conectado' : 'Sin conexión con el backend'}
        </div>
    );
}

export default ConnectionStatus;
