// Chatbot de preguntas frecuentes (sin API externa, respuestas
// predefinidas). Busca palabras clave en lo que escribe el usuario y responde
// con la coincidencia que tenga más palabras clave encontradas.
import { useState, useRef, useEffect } from 'react';
import preguntasFrecuentes from '../data/preguntasFrecuentes';
import avatarBot from '../assets/chatbot-clima.png';

const RESPUESTA_POR_DEFECTO =
    'No tengo una respuesta guardada para eso todavía. Prueba preguntando sobre: voltaje, amperaje, potencia, temperatura, humedad, el foco, el relé, el DHT11, el ACS712, o cómo exportar los datos.';

function buscarRespuesta(pregunta) {
    const textoNormalizado = pregunta.toLowerCase();
    let mejorCoincidencia = null;
    let mejorPuntaje = 0;

    preguntasFrecuentes.forEach((item) => {
        const puntaje = item.palabras.filter((palabra) => textoNormalizado.includes(palabra)).length;
        if (puntaje > mejorPuntaje) {
            mejorPuntaje = puntaje;
            mejorCoincidencia = item;
        }
    });

    return mejorCoincidencia ? mejorCoincidencia.respuesta : RESPUESTA_POR_DEFECTO;
}

function ChatBot() {
    const [abierto, setAbierto] = useState(false);
    const [mensajes, setMensajes] = useState([
        { autor: 'bot', texto: '¡Hola! Soy el asistente de la Estación de Monitoreo. Pregúntame qué es el voltaje, el amperaje, cómo funciona el foco, o de qué trata el proyecto.' }
    ]);
    const [textoInput, setTextoInput] = useState('');
    const finalDeMensajes = useRef(null);

    useEffect(() => {
        finalDeMensajes.current?.scrollIntoView({ behavior: 'smooth' });
    }, [mensajes]);

    const enviarMensaje = (evento) => {
        evento.preventDefault();
        const pregunta = textoInput.trim();
        if (!pregunta) return;

        const respuesta = buscarRespuesta(pregunta);

        setMensajes((anteriores) => [
            ...anteriores,
            { autor: 'usuario', texto: pregunta },
            { autor: 'bot', texto: respuesta }
        ]);
        setTextoInput('');
    };

    return (
        <div className="chatbot-contenedor">
            {abierto && (
                <div className="chatbot-ventana">
                    <div className="chatbot-encabezado">
                        <img src={avatarBot} alt="Asistente del clima" className="chatbot-avatar" />
                        <span>Asistente</span>
                        <button className="chatbot-cerrar" onClick={() => setAbierto(false)}>✕</button>
                    </div>
                    <div className="chatbot-mensajes">
                        {mensajes.map((mensaje, indice) => (
                            <div key={indice} className={`chatbot-mensaje chatbot-${mensaje.autor}`}>
                                {mensaje.texto}
                            </div>
                        ))}
                        <div ref={finalDeMensajes} />
                    </div>
                    <form className="chatbot-formulario" onSubmit={enviarMensaje}>
                        <input
                            type="text"
                            value={textoInput}
                            onChange={(e) => setTextoInput(e.target.value)}
                            placeholder="Escribe tu pregunta..."
                        />
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            )}
            <button
                className={`chatbot-boton-flotante ${abierto ? 'chatbot-boton-flotante--abierto' : ''}`}
                onClick={() => setAbierto(!abierto)}
                aria-label="Abrir asistente"
            >
                <img src={avatarBot} alt="Asistente" />
            </button>
        </div>
    );
}

export default ChatBot;
