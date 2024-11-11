import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './Products/ProductList/ProductList';
import './App.css';
import CroissantLogo from './logoCroissant.png';
import ProductPage from './Products/ProductPage/ProductPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Barre de navigation */}
        <nav className="navbar">
          <Link to="/" className="nav-link"> <img src={CroissantLogo} alt="logo" /> </Link>
          <Link to="/about" className="nav-link">Who Are We?</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </nav>

        {/* Contenu des routes */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/about" element={<div>About Us</div>} />
          <Route path="/cart" element={<div>Cart Page</div>} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;