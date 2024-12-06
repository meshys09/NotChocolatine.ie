import React, { useEffect, useState } from 'react';
import AdminDashboard from '../AdminDashboard/AdminDashboard';

interface User {
    id: number;
    mail: string;
    role: number;
    password: string;
}

function AdminUserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            setUsers(users.filter((user) => user.id !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const saveUser = async (id: number, role: number) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role }),
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            const updatedUsers = users.map((user) =>
                user.id === id ? { ...user, role } : user
            );
            setUsers(updatedUsers);
            setEditingId(null);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="AdminUserList">
            <AdminDashboard />
            <h1 className="text-2xl font-bold mb-4">Admin User List</h1>
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Role</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) =>
                        editingId === user.id ? (
                            <tr key={user.id}>
                                <td className="border border-gray-300 p-2">{user.mail}</td>
                                <td className="border border-gray-300 p-2">
                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            setUsers((prev) =>
                                                prev.map((u) =>
                                                    u.id === user.id
                                                        ? { ...u, role: parseInt(e.target.value, 10) }
                                                        : u
                                                )
                                            )
                                        }
                                        className="w-full"
                                    >
                                        <option value={0}>User</option>
                                        <option value={1}>Admin</option>
                                    </select>
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => saveUser(user.id, user.role)}
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
                            <tr key={user.id}>
                                <td className="border border-gray-300 p-2">{user.mail}</td>
                                <td className="border border-gray-300 p-2">{user.role === 1 ? 'Admin' : 'User'}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => setEditingId(user.id)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user.id)}
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

export default AdminUserList;