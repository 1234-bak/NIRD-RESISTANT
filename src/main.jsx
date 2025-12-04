import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'; // Le Jeu
import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register'; // <--- NOUVEAU
import Dashboard from './components/Pages/Dashboard';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* <--- NOUVELLE ROUTE */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);