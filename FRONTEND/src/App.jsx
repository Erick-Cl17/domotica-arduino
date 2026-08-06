// Adaptado de: App.jsx (proyecto Página Informativa)
// Se reutiliza textualmente el patrón de enrutamiento con <Routes>/<Route> y el layout Header/main/Footer. 
// Se reemplazan las páginas de ejemplo por Panel e Historial.
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom';
import Panel from './pages/Panel';
import Historial from './pages/Historial';

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Panel />} />
          <Route path="/historial" element={<Historial />} />
        </Routes>
      </main>
      <Footer/>
   </div>
  )
}

export default App
