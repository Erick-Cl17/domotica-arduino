// Escena visual del clima con umbrales configurables, día/noche.
import { clasificarClima, ETIQUETAS_CLIMA, formatearTemp, UMBRALES_POR_DEFECTO } from '../lib/clima';

function ClimaVisual({ temperatura, humedad, umbrales = UMBRALES_POR_DEFECTO, unidad = 'C', noche = false }) {
    const tipo = clasificarClima(temperatura, humedad, umbrales);
    const conAstro = tipo === 'sol' || tipo === 'sol-nubes';
    const conNubes = tipo !== 'sol';

    return (
        <div className={`clima-escena clima-${tipo} ${noche ? 'clima-noche' : 'clima-dia'}`}>
            <div className="clima-cielo">
                {noche && (
                    <div className="clima-estrellas">
                        {Array.from({ length: 26 }).map((_, i) => (
                            <span key={i} style={{ left: `${(i * 13) % 100}%`, top: `${(i * 29) % 70}%`, animationDelay: `${(i % 7) * 0.4}s` }} />
                        ))}
                    </div>
                )}
                {conAstro && !noche && (
                    <div className="clima-sol">
                        <div className="clima-sol-nucleo" />
                        <div className="clima-sol-rayos" />
                    </div>
                )}
                {conAstro && noche && (
                    <div className="clima-luna">
                        <div className="clima-luna-nucleo">
                            <span className="crater crater-1" />
                            <span className="crater crater-2" />
                            <span className="crater crater-3" />
                        </div>
                        <div className="clima-luna-halo" />
                    </div>
                )}
                {conNubes && (<><div className="clima-nube clima-nube-1" /><div className="clima-nube clima-nube-2" /></>)}
                {tipo === 'lluvia' && (
                    <div className="clima-lluvia">
                        {Array.from({ length: 14 }).map((_, i) => (<span key={i} style={{ left: `${(i * 7) % 100}%`, animationDelay: `${(i % 6) * 0.15}s` }} />))}
                    </div>
                )}
                {tipo === 'nieve' && (
                    <div className="clima-nieve">
                        {Array.from({ length: 18 }).map((_, i) => (<span key={i} style={{ left: `${(i * 6) % 100}%`, animationDelay: `${(i % 5) * 0.4}s` }}>❄</span>))}
                    </div>
                )}
            </div>
            <div className="clima-info">
                <span className="clima-titulo">{ETIQUETAS_CLIMA[tipo]} · {noche ? '🌙 Noche' : '☀️ Día'}</span>
                <span className="clima-temp">{formatearTemp(temperatura, unidad)}°{unidad}</span>
                <span className="clima-sub">Humedad {humedad}%</span>
            </div>
        </div>
    );
}

export default ClimaVisual
