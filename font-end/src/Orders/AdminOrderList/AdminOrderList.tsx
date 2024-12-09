import React, { useEffect, useState } from 'react';
import { useReactTable, ColumnDef, getCoreRowModel, getSortedRowModel, getPaginationRowModel, SortingState } from '@tanstack/react-table';
import AdminDashboard from '../../Users/AdminDashboard/AdminDashboard';

interface Order {
    id: number;
    date: string;
    price: number;
    userId: number;
}

function AdminOrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:3000/orders?page=${currentPage + 1}&limit=${pageSize}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data.orders);
                setTotalOrders(data.meta.totalOrders);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [currentPage, pageSize]);

    const columns: ColumnDef<Order>[] = [
        {
            accessorKey: 'date',
            header: () => <span>Date</span>,
            cell: (info) => {
                const date = new Date(info.getValue<string>());
                return date.toLocaleDateString();
            },
        },
        {
            accessorKey: 'price',
            header: () => <span>Price (€)</span>,
            cell: (info) => `${info.getValue<number>().toFixed(2)} €`,
        },
        {
            accessorKey: 'userId',
            header: () => <span>User ID</span>,
        },
    ];

    const table = useReactTable({
        data: orders,
        columns,
        state: {
            sorting,
            pagination: {
                pageIndex: currentPage,
                pageSize,
            },
        },
        onSortingChange: setSorting,
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                const newPagination = updater({
                    pageIndex: currentPage,
                    pageSize,
                });
                setCurrentPage(newPagination.pageIndex);
                setPageSize(newPagination.pageSize);
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: Math.ceil(totalOrders / pageSize),
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="AdminOrderList grow">
            <AdminDashboard />
            <h1 className="text-2xl font-bold m-4">Order List</h1>
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="border border-gray-300 p-2 cursor-pointer"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : typeof header.column.columnDef.header === 'function'
                                            ? header.column.columnDef.header(header.getContext())
                                            : header.column.columnDef.header}
                                    {{
                                        asc: ' 🔼',
                                        desc: ' 🔽',
                                    }[header.column.getIsSorted() as string] ?? null}
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
                                    {typeof cell.column.columnDef.cell === 'function'
                                        ? cell.column.columnDef.cell(cell.getContext())
                                        : cell.getValue()}
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
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            <div className="flex items-center m-4">
                <span>Rows per page:</span>
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="ml-2 p-2 border rounded"
                >
                    {[10, 20, 50].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default AdminOrderList;