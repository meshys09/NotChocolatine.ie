import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="px-5 pt-2">Admin Dashboard</h1>
            <button onClick={() => navigate('/admin/products')} className="mx-1">Products</button>
            <button onClick={() => navigate('/admin/users')} className="mx-1">Users</button>
            <button onClick={() => navigate('/admin/orders')} className="mx-1">Orders</button>
            <button onClick={() => navigate('/admin/reviews')} className="mx-1">Reviews</button>
        </div>
    );
}

export default AdminDashboard;