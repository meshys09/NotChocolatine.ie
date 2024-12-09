import React, { useEffect, useState } from 'react';
import { useReactTable, ColumnDef, getCoreRowModel, getSortedRowModel, SortingState } from '@tanstack/react-table';
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

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3000/orders');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

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
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="AdminOrderList">
            <AdminDashboard />
            <h1 className="text-2xl font-bold mb-4">Admin Order List</h1>
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
                                    {cell.column.columnDef.cell
                                        ? typeof cell.column.columnDef.cell === 'function'
                                            ? cell.column.columnDef.cell(cell.getContext())
                                            : cell.getValue()
                                        : cell.getValue()}
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

export default AdminOrderList;