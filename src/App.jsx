import Home from './pages/Home';
import About from './pages/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Battle from './pages/Battle';
import Pokedex from './pages/Pokedex';
import 'aos/dist/aos.css';
import AOS from 'aos';

AOS.init({
  duration: 1000,
});


export default function App() {
  return (
    <main className="bg-blue-600 min-h-screen flex relative flex-col text-white">
      <Router>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Pokedex" element={<Pokedex />} />
          <Route path="/Battle" element={<Battle />} />
        </Routes>
      </Router>
    </main>
  )
}