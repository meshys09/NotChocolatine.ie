import React, { useEffect, useState } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const handleRemoveItem = (productId: number) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleQuantityChange = (productId: number, quantity: number) => {
        const updatedCart = cartItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    if (cartItems.length === 0) {
        return <div>Your cart is empty.</div>;
    }

    return (
        <div className="CartPage">
            <h1>Your Cart</h1>
            <div className="CartItems">
                {cartItems.map(item => (
                    <div key={item.id} className="CartItem flex flex-row items-center justify-between p-2 border-b">
                        <div>
                            <p>{item.name}</p>
                            <p>{(item.price * item.quantity).toFixed(2)} €</p>
                        </div>
                        <div className="QuantityControls flex items-center">
                            <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity === 1}>
                                -
                            </button>
                            <p className="px-2">{item.quantity}</p>
                            <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <button onClick={() => handleRemoveItem(item.id)} className="text-red-500">Remove</button>
                    </div>
                ))}
            </div>
            <div className="CartSummary p-2 mt-4">
                <h2>Total: {calculateTotal()} €</h2>
                <button onClick={() => alert('Proceeding to checkout')} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default CartPage;