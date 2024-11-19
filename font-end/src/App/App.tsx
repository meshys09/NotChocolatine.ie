import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from '../Products/ProductList/ProductList';
import './App.css';
import CroissantLogo from '../util/logoCroissant.png';
import ProductPage from '../Products/ProductPage/ProductPage';
import LoginPage from '../Authentication/LoginPage/LoginPage';
import NewProduct from '../Products/NewProduct/NewProduct';
import NewUser from '../Users/NewUser/NewUser';

function App() {
  return (
    <Router>
      <div className="App">

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="nav-link"> <img src={CroissantLogo} alt="logo" /> </Link>
          <Link to="/about" className="nav-link">Who Are We?</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </nav>

        <div>
          <h1>Le temps du dev je fous ça là</h1>
          <a href="/products/new">Add New Product</a><br />
          <a href="/login">Login</a> <br />
          <a href="/users/new">Add New</a>
        </div>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/about" element={<div>About Us</div>} />
          <Route path="/cart" element={<div>Cart Page</div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/products/new" element={<NewProduct />} />
          <Route path="/users/new" element={<NewUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;