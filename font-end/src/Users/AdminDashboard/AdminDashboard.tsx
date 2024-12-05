import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/admin/products')}>Products</button>
            <button onClick={() => navigate('/admin/users')}>Users</button>
            <button onClick={() => navigate('/admin/orders')}>Orders</button>
            <button onClick={() => navigate('/admin/reviews')}>Reviews</button>
        </div>
    );
}

export default AdminDashboard;