
import React, { useEffect, useState } from 'react';
import { useReactTable, ColumnDef, getCoreRowModel, flexRender } from '@tanstack/react-table';
import AdminDashboard from '../../Users/AdminDashboard/AdminDashboard';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
}

function AdminProductList() {

    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<Product>({
        id: 0,
        name: '',
        price: 0,
        description: '',
        stock: 0,
    });
    const [error, setError] = useState<string | null>(null);
    const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);

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
            }
        };

        fetchProducts();
    }, []);

    const addProduct = async () => {
        if (!newProduct.name || newProduct.price <= 0 || !newProduct.description || newProduct.stock <= 0) {
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
            setNewProduct({ id: 0, name: '', price: 0, description: '', stock: 0 });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const updateProduct = async (updatedProduct: Product) => {
        try {
            const response = await fetch(`http://localhost:3000/products/${updatedProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            setProducts((prev) =>
                prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
            );
            setEditingRowIndex(null);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            setProducts((prev) => prev.filter((product) => product.id !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: 'name',
            header: () => <span>Name</span>,
            cell: (info) => (
                editingRowIndex === info.row.index ? (
                    <input
                        defaultValue={info.getValue<string>()}
                        onChange={(e) => {
                            const value = e.target.value;
                            setProducts((prev) =>
                                prev.map((product, idx) =>
                                    idx === info.row.index ? { ...product, name: value } : product
                                )
                            );
                        }}
                    />
                ) : (
                    info.getValue<string>()
                )
            ),
        },
        {
            accessorKey: 'price',
            header: () => <span>Price</span>,
            cell: (info) => (
                editingRowIndex === info.row.index ? (
                    <input
                        type="number"
                        defaultValue={info.getValue<number>()}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            setProducts((prev) =>
                                prev.map((product, idx) =>
                                    idx === info.row.index ? { ...product, price: value } : product
                                )
                            );
                        }}
                    />
                ) : (
                    `${info.getValue<number>().toFixed(2)} €`
                )
            ),
        },
        {
            accessorKey: 'description',
            header: () => <span>Description</span>,
            cell: (info) => (
                editingRowIndex === info.row.index ? (
                    <input
                        defaultValue={info.getValue<string>()}
                        onChange={(e) => {
                            const value = e.target.value;
                            setProducts((prev) =>
                                prev.map((product, idx) =>
                                    idx === info.row.index ? { ...product, description: value } : product
                                )
                            );
                        }}
                    />
                ) : (
                    info.getValue<string>()
                )
            ),
        },
        {
            accessorKey: 'stock',
            header: () => <span>Stock</span>,
            cell: (info) => (
                editingRowIndex === info.row.index ? (
                    <input
                        type="number"
                        defaultValue={info.getValue<number>()}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            setProducts((prev) =>
                                prev.map((product, idx) =>
                                    idx === info.row.index ? { ...product, stock: value } : product
                                )
                            );
                        }}
                    />
                ) : (
                    info.getValue<number>()
                )
            ),
        },
        {
            id: 'actions',
            header: () => <span>Actions</span>,
            cell: (info) =>
                editingRowIndex === info.row.index ? (
                    <>
                        <button
                            onClick={() => updateProduct(info.row.original)}
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditingRowIndex(null)}
                            className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700 ml-2"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setEditingRowIndex(info.row.index)}
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deleteProduct(info.row.original.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2"
                        >
                            Delete
                        </button>
                    </>
                ),
        },
    ];
    const table = useReactTable({
        data: products,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div className="AdminProductList">
            <AdminDashboard />
            <h1 className="text-2xl font-bold mb-4">Admin Product List</h1>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value, 10) })}
                    className="border p-2 mr-2"
                />
                <button
                    onClick={addProduct}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Add Product
                </button>
            </div>

            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="border border-gray-300 p-2">
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border border-gray-300 p-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
    );
}

export default AdminProductList;