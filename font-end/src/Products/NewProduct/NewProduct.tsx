import React, { useState } from "react";
import "./NewProduct.css";
import '../../styles.css';

function NewProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState<number | string>('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!name || !price) {
            setError('Please enter all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/products/newProduct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, price, description }),
            });

            if (!response.ok) {
                throw new Error('Failed to create product.');
            }

            const data = await response.json();
            console.log('Product created:', data);

        } catch (err) {
            setError((err as Error).message);
        }
    }
    return (
        <div className="NewProduct box-style">

            <h2 className="text-center">Add a new product</h2>

            <form onSubmit={handleSubmit} className="NewProductFrom form-style">

                <div className="NameField field-style ">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                </div>

                <div className="PriceField field-style">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required />
                </div>

                <div className="DescriptionField field-style">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required />
                </div>

                {error && <p className="error">{error}</p>}
                <button type="submit" className="place-self-end">Add Product</button>
            </form>
        </div>
    );
}

export default NewProduct;