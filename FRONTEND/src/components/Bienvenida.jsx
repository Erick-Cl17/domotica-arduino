// Adaptado de: Saludo.jsx (proyecto Calculadora)
// Mismo patrón de componente con prop "nombre", reutilizado como encabezado de bienvenida del panel.
function Bienvenida({ nombre }) {
    return (
        <div className="bienvenida">
            <h1>Estación de Monitoreo</h1>
            <p>Hola, <strong>{nombre}</strong> 👋 — bienvenido a tu panel de sensores</p>
        </div>
    );
}

export default Bienvenida
