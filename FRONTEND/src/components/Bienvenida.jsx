// Adaptado de: Saludo.jsx (proyecto Calculadora)
// Mismo patrón de componente con prop "nombre", reutilizado como encabezado de bienvenida del panel.
function Bienvenida({ nombre }) {
    return <h2>Hola {nombre}, este es el panel de la Estación de Monitoreo</h2>
}

export default Bienvenida
