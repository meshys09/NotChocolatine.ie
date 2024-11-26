import React from "react";
import { useNavigate } from "react-router-dom";


function LogoutButton() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    if (!token) return null;

    return (
        <button onClick={handleLogout} className="LogoutButton p-2">Logout</button>
    );
}
export default LogoutButton;