import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from '../Products/ProductList/ProductList';
import './App.css';
import CroissantLogo from '../util/logoCroissant.png';
import Cart from '../util/cart.png';
import ProductPage from '../Products/ProductPage/ProductPage';
import LoginPage from '../Authentication/LoginPage/LoginPage';
import NewProduct from '../Products/NewProduct/NewProduct';
import NewUser from '../Users/NewUser/NewUser';

function App() {
  return (
    <Router>
      <div className="App">

        <nav className="bg-amber-300 flex-row">
          <Link to="/" className="flex p-8 hover:px-10"> <img src={CroissantLogo} alt="logo" /></Link>
          <Link to="/about" className="flex p-8 hover:px-10">Who Are We?</Link>
          <Link to="/cart" className="flex p-8 hover:px-10"><img src={Cart} alt='Cart' />  </Link>
          <Link to="/login" className="flex p-8 hover:px-10">Login</Link>
        </nav>

        <div>
          <h1>Le temps du dev je fous ça là</h1>
          <a href="/products/new">Add New Product</a><br />
          <a href="/login">Login</a> <br />
          <a href="/users/new">Add New User</a>
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