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
import NewUser from '../Users/UserForm/UserForm';
import About from '../About/About';
import UserPage from '../Users/UserPage/UserPage';
import ProtectedRoute from '../Authentication/ProtectedRoute/ProtectedRoute';
import LogoutButton from '../Authentication/LogoutButton/LogoutButton';

function App() {
  return (

    <Router>
      <div className="App flex flex-col min-h-screen max-h-fit">

        <nav className="NavBar bg-orange mb-2 h-min p-2 flex items-center shadow-lg sticky top-0">
          <Link to="/" className="Home flex items-center"> <img className="-rotate-45 mx-6" src={CroissantLogo} alt="logo" /><p className='OurName text-2xl font-bold'>NotChocolatine</p></Link>
          <div className="Tools flex items-center absolute right-0 mr-2">
            <Link to="/about" className="About p-4">About Us</Link>
            <Link to="/cart" className="Cart p-4"><img src={Cart} alt='Cart' /></Link>
            <Link to="/login" className="Login p-4"><img src={LoginIcon} alt='LoginIcon' /></Link>
            <LogoutButton />
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<ProtectedRoute><div className='page-style'>Cart Page</div></ProtectedRoute>} />
          <Route path="/login" element={<div className='form-page-style'><LoginPage /></div>} />
          <Route path="/products/:id" element={<div className='page-style'><ProductPage /></div>} />
          <Route path="/products/new" element={<ProtectedRoute requiredRole={1}><div className='form-page-style'><NewProduct /> </div></ProtectedRoute>} />
          <Route path="/users/new" element={<div className='form-page-style'><NewUser /></div>} />
          <Route path="/users" element={<ProtectedRoute><div className='page-style'><UserPage /></div></ProtectedRoute>} />
          <Route path="/reviews/all" element={<ProtectedRoute requiredRole={1}><div className='form-page-style'>All reviews </div></ProtectedRoute>} />
        </Routes>

        <div className='Temporaire border-2 w-max p-2 mx-2'>
          <p>Le temps du dev je fous ça là</p>
          <a href="/products/new">Add New Product</a><br />
          <a href="/login">Login</a> <br />
          <a href="/users/new">Add New User</a> <br />
          <a href="/users">User</a><br />
          <a href="/reviews/all">All reviews </a>
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