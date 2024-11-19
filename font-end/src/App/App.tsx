//import tools
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

//import style
import './App.css';

//import icons and logos
import CroissantLogo from '../util/logoCroissant.png';
import Cart from '../util/cart.png';
import LoginIcon from '../util/login-icon.png';

//import components
import ProductPage from '../Products/ProductPage/ProductPage';
import ProductList from '../Products/ProductList/ProductList';
import LoginPage from '../Authentication/LoginPage/LoginPage';
import NewProduct from '../Products/NewProduct/NewProduct';
import NewUser from '../Users/NewUser/NewUser';

function App() {
  return (
    <Router>
      <div className="App">

        <nav className="bg-amber-300 flex flex-row ">
          <Link to="/" className="flex p-8"> <img className="px-4" src={CroissantLogo} alt="logo"/><h1 className='hover:py-2'>NotChocolatine</h1></Link>
          <div className="flex absolute right-0">
          <Link to="/about" className="p-8 hover:py-10">Who Are We?</Link>
            <Link to="/login" className="p-8 hover:py-10"><img src={LoginIcon} alt='LoginIcon'/></Link>
            <Link to="/cart" className="p-8 hover:py-10 relative inset-y-0 right-0"><img src={Cart} alt='Cart'/></Link>
          </div>
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