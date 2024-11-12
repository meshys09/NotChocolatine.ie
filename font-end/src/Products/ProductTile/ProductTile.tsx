import React from 'react';
import './ProductTile.css';
import { useNavigate } from 'react-router-dom';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  description: string;
}

function ProductTile({ id, name, price, description }: ProductProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="ProductTile" onClick={handleClick}>
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