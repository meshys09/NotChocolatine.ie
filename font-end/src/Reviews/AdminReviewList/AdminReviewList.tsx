import React, { useEffect, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
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
    const [totalReviews, setTotalReviews] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = useState<any>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/reviews?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(
                    data.reviews.map((review: any) => ({
                        id: review.id,
                        comment: review.comment,
                        grade: review.grade,
                        user: {
                            mail: review.user.mail,
                        },
                        product: {
                            name: review.product.name,
                        },
                    }))
                );
                setTotalReviews(data.meta.totalReviews);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [pagination.pageIndex, pagination.pageSize]);

    const deleteReview = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/reviews/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete review');
            }
            setReviews((prev) => prev.filter((review) => review.id !== id));
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
            pagination,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(totalReviews / pagination.pageSize),
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="AdminReviewList grow">
            <AdminDashboard />
            <h1 className="text-2xl font-bold m-4">Review List</h1>
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
            <div className="pagination flex justify-between w-full items-center mt-4 p-4">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default AdminReviewList;