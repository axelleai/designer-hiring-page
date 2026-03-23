import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DesignerDetail from './pages/DesignerDetail';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/designer/:id" element={<DesignerDetail />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}

export default App;
