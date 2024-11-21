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
        <div className="ProductPage page-style flex-wrap">
            <div className='Product flex flex-row box-style w-fit max-w-4xl px-3 py-5'>
                
                {/* Image */}
                <div className='ImageCol w-2/6'>
                    <img className='bg-light-orange rounded-xl p-5' src={DefaultImg} alt='product' />
                </div>

                {/* Product desc */}
                <div className='ProductCol w-4/6 flex flex-col ml-5'>
                {product ? (
                    <>
                        <h1 className='p-1'>{product.name}</h1>
                        <div className='DescriptionBox max-w-lg px-3 flex flex-col '>
                            <p> [Grade/5] - [Number of reviews] </p>
                            <p className='py-2'>{product.description}</p>
                        </div>
                        
                    </>
                ) : (
                    <div>Product not found</div>
                )}
                {product ? ( 
                    <div className='self-end'>
                        <div className='AddToCart flex flex-row'> 
                            <button className='m-2 px-3 rounded-4xl'>-</button>
                            <p className='m-2 p-2 border-2 rounded-4xl'>1</p>
                            <button className='m-2 px-3 rounded-4xl'>+</button>
                        </div>
                        <p className='py-2 font-extrabold self-end text-right'>Total Price : {product.price} €</p>
                        <button>Ajouter au panier</button>
                    </div>
                ) : (
                    <div>Product not found</div>
                )}
                </div>
                


            </div>

            <div className='Reviews'>
                <div>
                    <NewReview productId={Number(id)} />
                </div>
                <div>
                    <ReviewList productId={Number(id)} />
                
                </div>
            </div>
        </div>
    );
}

export default ProductPage;