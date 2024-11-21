//import tools
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

//import style
import './About.css';
import '../styles.css';

//import icons and logos
import CroissantLogo from '../util/croissant.png';
import Cart from '../util/cart.png';
import LoginIcon from '../util/person.png';

function About() {
  return (
    <div className="About grow p-5 w-3/4 self-center">
      <h1 className=' text-dark-orange font-extrabold text-4xl text-center p-4'>Who Are We?</h1>
      <p>We are a small bakery in the heart of Dublin</p>
      <p> We won't serve you any chocolatine, because this pastry doesn't exist, but we'll be happy to give you pains au chocolat !</p>
    </div>
  );
}
export default About;
