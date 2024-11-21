//import tools
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

//import style
import './App.css';
import '../styles.css';

//import icons and logos
import CroissantLogo from '../util/croissant.png';
import Cart from '../util/cart.png';
import LoginIcon from '../util/person.png';

//import components
import ProductPage from '../Products/ProductPage/ProductPage';
import ProductList from '../Products/ProductList/ProductList';
import LoginPage from '../Authentication/LoginPage/LoginPage';
import NewProduct from '../Products/NewProduct/NewProduct';
import NewUser from '../Users/NewUser/NewUser';
import About from '../About/About';

function App() {
  return (
    
    <Router>
      <div className="App flex flex-col bg-slate-50 min-h-screen max-h-fit">

        <nav className="NavBar bg-orange mb-2 h-min p-2 flex items-center shadow-lg sticky top-0">
          <Link to="/" className="Home flex items-center"> <img className="-rotate-45 mx-6" src={CroissantLogo} alt="logo"/><h1 className='OurName'>NotChocolatine</h1></Link>
          <div className="Tools flex items-center absolute right-0 mr-2">
            <Link to="/about" className="About p-4">About Us</Link>
            <Link to="/cart" className="Cart p-4"><img src={Cart} alt='Cart'/></Link>
            <Link to="/login" className="Login p-4"><img src={LoginIcon} alt='LoginIcon'/></Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={ <div className='ProductList grow'><ProductList /></div>} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<div>Cart Page</div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/products/new" element={<NewProduct />} />
          <Route path="/users/new" element={<NewUser />} />
        </Routes>

        <div className='Temporaire border-2 w-max p-2 mx-2'>
          <h1>Le temps du dev je fous ça là</h1>
          <a href="/products/new">Add New Product</a><br />
          <a href="/login">Login</a> <br />
          <a href="/users/new">Add New User</a>
        </div>

        <div className="Footer bg-orange p-2 flex place-content-center items-center ">
          <p className='Rights px-2'>© 2024 NotChocolatine</p>
          <p className='Names px-2'>Lucie et Manon</p>
        </div>
      </div>
    </Router>
  );
}

export default App;