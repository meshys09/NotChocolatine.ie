import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/products/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="ProductPage">
            {product ? (
                <>
                    <h1>{product.name}</h1>
                    <p><strong>Price:</strong> {product.price} €</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    {/* Ajouter plus d'informations si nécessaire */}
                </>
            ) : (
                <div>Product not found</div>
            )}
        </div>
    );
}

export default ProductPage;