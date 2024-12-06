import React, { useEffect, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table';
import AdminDashboard from '../../Users/AdminDashboard/AdminDashboard';

interface Review {
    id: number;
    comment: string;
    grade: number;
    user: {
        mail: string;
    };
    product: {
        name: string;
    };
}

function AdminReviewList() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = useState<any>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('http://localhost:3000/reviews');
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data.map((review: any) => ({
                    id: review.id,
                    comment: review.comment,
                    grade: review.grade,
                    user: {
                        mail: review.user.mail,
                    },
                    product: {
                        name: review.product.name,
                    },
                })));
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const deleteReview = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/reviews/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete review');
            }
            setReviews(reviews.filter((review) => review.id !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const columns: ColumnDef<Review>[] = [
        {
            accessorKey: 'comment',
            header: 'Comment',
        },
        {
            accessorKey: 'grade',
            header: 'Grade',
            cell: ({ getValue }) => `${getValue()}/5`,
        },
        {
            accessorKey: 'user.mail',
            header: 'User Email',
        },
        {
            accessorKey: 'product.name',
            header: 'Product Name',
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <button
                    onClick={() => deleteReview(row.original.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                    Delete
                </button>
            ),
        },
    ];

    const table = useReactTable({
        data: reviews,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="AdminReviewList">
            <AdminDashboard />
            <h1 className="text-2xl font-bold mb-4">Admin Review List</h1>
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="border border-gray-300 p-2 cursor-pointer"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {header.column.getIsSorted() === 'asc' && ' 🔼'}
                                    {header.column.getIsSorted() === 'desc' && ' 🔽'}
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
        </div>
    );
}

export default AdminReviewList;