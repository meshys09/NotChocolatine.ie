import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewReview from '../../Reviews/NewReview/NewReview';
import ReviewList from '../../Reviews/ReviewList/ReviewList';
import DefaultImg from '../../util/pastry.png';
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
        <div className="ProductPage page-style flex-col">
            <div className='FirstLine flex flex-row'>
                <div className='LeftCol w-96 p-10'>
                    <img src={DefaultImg} alt='product' />
                </div>
                <div className='RightCol w-96'>
                {product ? (
                    <>
                        <h1 className='text-center'>{product.name}</h1>
                        <p className='justify-self-center '>{product.price} €</p>
                        <p><strong>Description:</strong> {product.description}</p>
                    </>
                ) : (
                    <div>Product not found</div>
                )}
                </div>
            <div className='SecondLine'>
                <div>
                    <NewReview productId={Number(id)} />
                </div>
                <div>
                    <ReviewList productId={Number(id)} />
                
                </div>
            </div>
            </div>
        </div>
    );
}

export default ProductPage;