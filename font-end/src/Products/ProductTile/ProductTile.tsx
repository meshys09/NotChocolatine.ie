import React from 'react';
import './ProductTile.css';
import '../../styles.css';
import { useNavigate } from 'react-router-dom';
import DefaultImage from '../../util/pastry.png';

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
    <div className="ProductTile bg-white border-2 rounded-xl w-40 m-5 p-2 justify-center hover:w-44 hover:m-3 " onClick={handleClick}>
      <img src={DefaultImage} alt="Product" className="ProductTile-image bg-light-orange rounded-xl" />
      <div className="ProductTile-info">
        <h2><strong>{name}</strong></h2>
        <p className='Description text-wrap w-38 h-12 truncate'>{description}</p>
        <p className='Price'><strong>{price} €</strong></p>
      </div>
    </div>
  );
}

export default ProductTile;