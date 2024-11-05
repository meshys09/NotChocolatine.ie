import React from 'react';
import image from './logoCroissant.png'
import './ProductTile.css'

function Product( { name = 'Procut Name', price = 0} )  {
  return (
    <div className='Product'>
        <img src={image} alt='photo du produit'/>
        <div className='Product-info'>
            <p>{name}</p>
            <p>Price : {price} €</p>
        </div>
    </div>
  );
}

export default Product;
