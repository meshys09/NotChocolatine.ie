//import tools
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

//import style
import './App.css';
import '../styles.css';

//import icons and logos
import CroissantLogo from '../util/croissant.png';
import Cart from '../util/cart.png';
import LoginIcon from '../util/person.png';

//import components
import ProtectedRoute from '../Authentication/ProtectedRoute/ProtectedRoute';
import LogoutButton from '../Authentication/LogoutButton/LogoutButton';

// Lazy-loaded components
const ProductPage = React.lazy(() => import('../Products/ProductPage/ProductPage'));
const ProductList = React.lazy(() => import('../Products/ProductList/ProductList'));
const LoginPage = React.lazy(() => import('../Authentication/LoginPage/LoginPage'));
const NewUser = React.lazy(() => import('../Users/UserForm/UserForm'));
const About = React.lazy(() => import('../About/About'));
const UserPage = React.lazy(() => import('../Users/UserPage/UserPage'));
const CartPage = React.lazy(() => import('../Orders/CartPage/CartPage'));
const AdminDashboard = React.lazy(() => import('../Users/AdminDashboard/AdminDashboard'));
const AdminReviewList = React.lazy(() => import('../Reviews/AdminReviewList/AdminReviewList'));
const AdminProductList = React.lazy(() => import('../Products/AdminProductList/AdminProductList'));
const AdminUserList = React.lazy(() => import('../Users/AdminUserList/AdminUserList'));
const AdminOrderList = React.lazy(() => import('../Orders/AdminOrderList/AdminOrderList'));

function App() {
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  return (
    <Router>
      <div className="App flex flex-col min-h-screen max-h-fit">

        <nav className="NavBar bg-orange mb-2 h-min p-2 flex items-center shadow-lg sticky top-0">
          <Link to="/" className="Home flex items-center">
            <img className="-rotate-45 mx-6" src={CroissantLogo} alt="logo" />
            <p className='OurName text-2xl font-bold'>NotChocolatine</p>
          </Link>
          <div className="Tools flex items-center absolute right-0 mr-2">
            {userRole === '1' && (
              <Link to="/admin" className="Admin p-4">Admin Dashboard</Link>
            )}
            <Link to="/about" className="About p-4">About Us</Link>
            <Link to="/cart" className="Cart p-4"><img src={Cart} alt='Cart' /></Link>
            <Link to={userId ? "/users" : "/login"} className="Login p-4">
              <img src={LoginIcon} alt='LoginIcon' />
            </Link>
            <LogoutButton />
          </div>
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path="/login" element={<div className='form-page-style'><LoginPage /></div>} />
            <Route path="/products/:id" element={<div className='page-style'><ProductPage /></div>} />
            <Route path="/users/new" element={<div className='form-page-style'><NewUser /></div>} />
            <Route path="/users" element={<ProtectedRoute><div className='page-style'><UserPage /></div></ProtectedRoute>} />
            <Route path="/reviews/all" element={<ProtectedRoute requiredRole={1}><div className='form-page-style'>All reviews </div></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requiredRole={1}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute requiredRole={1}><AdminReviewList /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute requiredRole={1}><AdminProductList /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requiredRole={1}><AdminUserList /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute requiredRole={1}><AdminOrderList /></ProtectedRoute>} />
          </Routes>
        </Suspense>

        <div className="Footer bg-orange p-2 flex place-content-center items-center ">
          <p className='Rights px-2'>© 2024 NotChocolatine</p>
          <p className='Names px-2'>Lucie et Manon</p>
        </div>
      </div>
    </Router>
  );
}

export default App;