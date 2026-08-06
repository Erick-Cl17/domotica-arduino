// Componente reutilizable para mostrar carga/errores
function EstadoCarga({ cargando, error, children }) {
    if (cargando) return <p className="estado-carga">Cargando datos...</p>;
    if (error) return <p className="estado-error">⚠️ {error}</p>;
    return children;
}

export default EstadoCarga;
