import React, { useEffect, useState } from 'react';
import ProductTile from '../ProductTile/ProductTile';
import './ProductList.css';
import '../../styles.css';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <div className="ProductList-error grow">{error}</div>;
    }

    return (
        <div className="ProductListContainer grow">
        <div className="ProductList flex flex-wrap">
            {products.map((product) => (
                <ProductTile
                    id={product.id}
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                />
            ))}
        </div>
        </div>
    );
}

export default ProductList;