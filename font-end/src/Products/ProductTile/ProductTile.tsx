// ProductTile.tsx
import React from 'react';
import './ProductTile.css';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  description: string;
}

function ProductTile({ id, name, price, description }: ProductProps) {
  return (
    <div className="ProductTile">
      <img src="https://via.placeholder.com/150" alt="Product" className="ProductTile-image" />
      <div className="ProductTile-info">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Price: {price} €</p>
      </div>
    </div>
  );
}

export default ProductTile;