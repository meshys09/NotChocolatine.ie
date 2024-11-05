import React from 'react';
import ProductTile from './ProductTile';
import logo from './logoCroissant.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='row'>
        <div className='Left-column'>
        <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className='Right-column'>
        <p> NotChocolatine - Selling yummy pains au chocolats</p>
        </div>
        </div>
      </header>
      <div className='Todays-products'>
        <ProductTile name={"pain au chocolat"}/>
        <ProductTile name={"croissant"}/>
      </div>
    </div>
  );
}

export default App;
