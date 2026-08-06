// Adaptado de: pantalla.jsx (proyecto Calculadora)
// Mismo patrón "componente controlado por prop valor" usado para la pantalla de la calculadora; aquí se reutiliza como indicador tipo odómetro para cada variable del sensor (temperatura, humedad, etc.).
function Indicador({ etiqueta, valor, unidad }) {
    return (
        <div className="indicador">
            <span className="indicador-etiqueta">{etiqueta}</span>
            <span className="indicador-valor">{valor}{unidad}</span>
        </div>
    );
}
export default Indicador
