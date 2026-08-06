// Reutilizado TEXTUALMENTE de: Boton.jsx (proyecto Calculadora)
// El patrón "recibe valor + callback darClick" sirve tal cual para el botón de encendido/apagado y para los botones de filtro de historial.
function Boton ({valor, darClick}) {
    return (
    <button onClick={() => darClick(valor)}>{valor}
    </button>
    );
}
export default Boton
