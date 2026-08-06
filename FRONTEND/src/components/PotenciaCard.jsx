// Muestra la potencia eléctrica (Voltaje x Amperaje) calculada en el backend, y la fecha/hora de la última medición
// Reutiliza el componente Indicador ya existente y el hook useSensorData ya creado.
import Indicador from './Indicador';
import useSensorData from '../hooks/useSensorData';

function PotenciaCard() {
    const { potenciaData, cargando, error } = useSensorData();

    if (cargando) return <p>Calculando potencia...</p>;
    if (error) return <p className="estado-error">⚠️ No se pudo calcular la potencia</p>;

    const fechaUltima = potenciaData?.created_at
        ? new Date(potenciaData.created_at).toLocaleString()
        : '—';

    return (
        <div className="panel-grid">
            <Indicador etiqueta="🔌 Potencia" valor={potenciaData?.potencia ?? 0} unidad=" W" />
            <div className="indicador">
                <span className="indicador-etiqueta">Última medición</span>
                <span className="indicador-valor" style={{ fontSize: '1.1rem' }}>{fechaUltima}</span>
            </div>
        </div>
    );
}

export default PotenciaCard;
