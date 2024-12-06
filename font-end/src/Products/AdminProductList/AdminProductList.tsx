import React, { useEffect, useState } from 'react';
import AdminDashboard from '../../Users/AdminDashboard/AdminDashboard';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

function AdminProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newProduct, setNewProduct] = useState<Product>({
        id: 0,
        name: '',
        price: 0,
        description: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const deleteProduct = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            setProducts(products.filter((product) => product.id !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const saveProduct = async (updatedProduct: Product) => {
        try {
            const response = await fetch(`http://localhost:3000/products/${updatedProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            const updatedProducts = products.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
            setProducts(updatedProducts);
            setEditingId(null);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const addProduct = async () => {
        if (!newProduct.name || newProduct.price <= 0 || !newProduct.description) {
            setError('Please fill in all fields to add a product.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });
            if (!response.ok) {
                throw new Error('Failed to add product');
            }
            const addedProduct = await response.json();
            setProducts([addedProduct, ...products]);
            setNewProduct({ id: 0, name: '', price: 0, description: '' });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="AdminProductList">
            <AdminDashboard />
            <h1 className="text-2xl font-bold mb-4">Admin Product List</h1>
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Price</th>
                        <th className="border border-gray-300 p-2">Description</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Row for Adding a New Product */}
                    <tr>
                        <td className="border border-gray-300 p-2">
                            <input
                                type="text"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                placeholder="Product Name"
                                className="w-full"
                            />
                        </td>
                        <td className="border border-gray-300 p-2">
                            <input
                                type="number"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                                placeholder="Price"
                                className="w-full"
                            />
                        </td>
                        <td className="border border-gray-300 p-2">
                            <input
                                type="text"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                placeholder="Description"
                                className="w-full"
                            />
                        </td>
                        <td className="border border-gray-300 p-2">
                            <button
                                onClick={addProduct}
                                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                            >
                                Add
                            </button>
                        </td>
                    </tr>
                    {/* Rows for Existing Products */}
                    {products.map((product) =>
                        editingId === product.id ? (
                            <tr key={product.id}>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="text"
                                        defaultValue={product.name}
                                        onChange={(e) =>
                                            setProducts((prev) =>
                                                prev.map((p) =>
                                                    p.id === product.id ? { ...p, name: e.target.value } : p
                                                )
                                            )
                                        }
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="number"
                                        defaultValue={product.price}
                                        onChange={(e) =>
                                            setProducts((prev) =>
                                                prev.map((p) =>
                                                    p.id === product.id ? { ...p, price: parseFloat(e.target.value) } : p
                                                )
                                            )
                                        }
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="text"
                                        defaultValue={product.description}
                                        onChange={(e) =>
                                            setProducts((prev) =>
                                                prev.map((p) =>
                                                    p.id === product.id ? { ...p, description: e.target.value } : p
                                                )
                                            )
                                        }
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => saveProduct(product)}
                                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700 ml-2"
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={product.id}>
                                <td className="border border-gray-300 p-2">{product.name}</td>
                                <td className="border border-gray-300 p-2">{product.price.toFixed(2)} €</td>
                                <td className="border border-gray-300 p-2">{product.description}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => setEditingId(product.id)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AdminProductList;