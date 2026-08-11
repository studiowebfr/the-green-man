import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { MentionsLegales } from './pages/MentionsLegales';
import { Confidentialite } from './pages/Confidentialite';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/confidentialite" element={<Confidentialite />} />
    </Routes>
  );
}

export default App;
