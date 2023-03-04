import './App.css';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";


import Contato from './components/Contato';
import Home from './components/Home';
import Dashboard from './components/Dashboard';


function App() {


  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contato">Contato</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
