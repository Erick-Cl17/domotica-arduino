// Adaptado de: App.jsx (proyecto Página Informativa)
// Se reutiliza el patrón de enrutamiento con <Routes>/<Route> y el layout Header/main/Footer. 
// Se reemplazan las páginas de ejemplo por Panel e Historial.
// Se agregó <ChatBot />, estado global de unidad (°C/°F) y zona horaria, guardado en localStorage
import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import { Routes, Route } from 'react-router-dom';
import Panel from './pages/Panel';
import Historial from './pages/Historial';

const CLAVE_CONFIG = 'estacion-config';

function leerConfig() {
  try {
    return JSON.parse(window.localStorage.getItem(CLAVE_CONFIG) || 'null');
  } catch {
    return null;
  }
}

function App() {
  const [unidad, setUnidad] = useState('C');
  const [zona, setZona] = useState('America/Guayaquil');

  useEffect(() => {
    const guardada = leerConfig();
    if (guardada) {
      if (guardada.unidad) setUnidad(guardada.unidad);
      if (guardada.zona) setZona(guardada.zona);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CLAVE_CONFIG, JSON.stringify({ unidad, zona }));
  }, [unidad, zona]);

  return (
    <div className="App">
      <Header unidad={unidad} setUnidad={setUnidad} zona={zona} setZona={setZona} />
      <main>
        <Routes>
          <Route path="/" element={<Panel unidad={unidad} zona={zona} />} />
          <Route path="/historial" element={<Historial />} />
        </Routes>
      </main>
      <ChatBot />
      <Footer/>
   </div>
  )
}

export default App
