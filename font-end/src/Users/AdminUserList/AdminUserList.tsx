import React, { useEffect, useState } from 'react';
import { useReactTable, ColumnDef, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import AdminDashboard from '../AdminDashboard/AdminDashboard';

interface User {
    id: number;
    mail: string;
    role: number;
}

function AdminUserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    const fetchUsers = async (page: number) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/users?page=${page + 1}&limit=${pageSize}`);
            const data = await response.json();
            if (!response.ok) throw new Error('Failed to fetch users');
            setUsers(data.users || []);
            setTotalPages(data.meta?.totalPages || 1);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(pageIndex);
    }, [pageIndex]);

    const saveUser = async (id: number, role: number) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role }),
            });
            if (!response.ok) throw new Error('Failed to update user');
            setUsers((prev) =>
                prev.map((user) => (user.id === id ? { ...user, role } : user))
            );
            setEditingId(null);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
        }
    };

    const deleteUser = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete user');
            setUsers((prev) => prev.filter((user) => user.id !== id));
        } catch (err) {
            if (err instanceof Error) setError(err.message);
        }
    };

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'mail',
            header: 'Email',
            cell: (info) => info.getValue<string>(),
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: (info) =>
                editingId === info.row.original.id ? (
                    <select
                        value={info.getValue<number>()}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            setUsers((prev) =>
                                prev.map((user) =>
                                    user.id === info.row.original.id
                                        ? { ...user, role: value }
                                        : user
                                )
                            );
                        }}
                        className="w-full"
                    >
                        <option value={0}>User</option>
                        <option value={1}>Admin</option>
                    </select>
                ) : info.getValue<number>() === 1 ? 'Admin' : 'User',
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (info) => (
                editingId === info.row.original.id ? (
                    <>
                        <button
                            onClick={() =>
                                saveUser(info.row.original.id, info.row.original.role)
                            }
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
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setEditingId(info.row.original.id)}
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deleteUser(info.row.original.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2"
                        >
                            Delete
                        </button>
                    </>
                )
            ),
        },
    ];

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: totalPages,
        manualPagination: true,
        state: {
            pagination: { pageIndex, pageSize },
        },
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                const newState = updater({ pageIndex, pageSize });
                setPageIndex(newState.pageIndex);
            } else {
                setPageIndex(updater.pageIndex);
            }
        },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="AdminUserList">
            <AdminDashboard />
            <h1 className="text-2xl font-bold mb-4">Admin User List</h1>
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="border border-gray-300 p-2">
                                    {header.isPlaceholder
                                        ? null
                                        : typeof header.column.columnDef.header === 'function'
                                            ? header.column.columnDef.header(header.getContext())
                                            : header.column.columnDef.header}
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
                                        : null}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination flex justify-between items-center mt-4">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {pageIndex + 1} of {totalPages}
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

export default AdminUserList;