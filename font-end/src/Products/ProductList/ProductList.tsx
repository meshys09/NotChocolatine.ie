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

interface Meta {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalProducts: number;
}

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]); // To store all products for filtering
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [meta, setMeta] = useState<Meta | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/products?page=${currentPage}&limit=18`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.products);
                setAllProducts(data.products); // Initialize allProducts for filtering
                setMeta(data.meta);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const filteredAndSortedProducts = allProducts
        .filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price))
        .slice(0, meta?.pageSize || 18); // Display only the products for the current page

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    if (error) {
        return <div className="ProductList-error grow">{error}</div>;
    }

    return (
        <div className="ProductListContainer flex flex-col grow">
            <div className="Controls flex justify-between p-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="SearchInput p-2 border rounded w-1/2"
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="SortSelect p-2 border rounded"
                >
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>
            <div className="ProductList grow flex flex-wrap">
                {filteredAndSortedProducts.map((product) => (
                    <ProductTile
                        id={product.id}
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                    />
                ))}
            </div>
            <div className="Pagination flex justify-center m-4 ">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="PaginationButton p-2 border rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="mx-4">
                    Page {meta?.currentPage || 1} of {meta?.totalPages || 1}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={meta ? currentPage >= meta.totalPages : undefined}
                    className="PaginationButton p-2 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ProductList;