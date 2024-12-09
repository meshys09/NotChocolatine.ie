import React, { useEffect, useState } from 'react';
import './OrderList.css';

interface Product {
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: number;
    date: string;
    price: number;
    userId: number;
    products: Product[];
}

function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');

        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:3000/orders/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                console.log(response.json());
                const ordersData: { order: Order; products: Product[] }[] = await response.json();

                const formattedOrders = ordersData.map(({ order, products }) => ({
                    ...order,
                    products: products || [], // S'assurer que les produits sont bien définis
                }));

                setOrders(formattedOrders);
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

        fetchOrders();
    }, [userId]);

    if (loading) return <div className='error-style'>Loading...</div>;
    if (error) return <div className='error-style'>Error: {error}</div>;

    return (
        <div className="OrderList">
            {orders.map((order) => (
                <div key={order.id} className="OrderCard border p-4 mb-4">
                    <h2 className='text-right px-2 mt-2'>Order Date: {formatDate(order.date)}</h2>
                    <p>Total Price: {order.price} €</p>
                    <h3 className='mt-4'>Products:</h3>
                    {order.products && order.products.length > 0 ? (
                        <ul>
                            {order.products.map((product, index) => (
                                <li key={index} className="ProductItem">
                                    <p>{product.name}</p>
                                    <p>
                                        {product.quantity} × {product.price} € = {product.quantity * product.price} €
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No products found for this order.</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default OrderList;