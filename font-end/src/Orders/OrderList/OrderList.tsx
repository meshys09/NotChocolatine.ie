import React, { useEffect, useState } from 'react';
import './OrderList.css';

interface Order {
    id: number;
    date: string;
    price: number;
    userId: number;
}

function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    // Fonction pour formater une date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
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
                const data = await response.json();
                setOrders(data);
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
        <div>
            {orders.map((order) => (
                <div key={order.id}>
                    <h2 className='text-right px-2 mt-2'>{formatDate(order.date)}</h2>
                    <p>{order.price} €</p>
                </div>
            ))}
        </div>
    );
}

export default OrderList;