import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ReviewList from '../../Reviews/ReviewList/ReviewList';
import "./UserPage.css";
import '../../styles.css';
import NewUser from "../UserForm/UserForm";
import OrderList from "../../Orders/OrderList/OrderList";
import LogoutButton from "../../Authentication/LogoutButton/LogoutButton";

interface User {
    id: number;
    mail: string;
    password: number;
    role: number;
}

function UserPage() {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const id = Number(localStorage.getItem('userId'));

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${id}`);
                if (!response.ok) {
                    throw new Error('Sorry, we did not find the user you are looking for.');
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const deleteUser = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete user');
            else navigate('/');
        } catch (err) {
            if (err instanceof Error) setError(err.message);
        }
    };


    if (loading) return <div className="error-style">Loading...</div>;
    if (error) return <div className="error-style ">{error}</div>;

    return (
        <div className="flex flex-wrap">
            <div className="UserProfile box-style w-fit h-full">
                <h2 className="text-center w-fit pb-5">User Profile</h2>
                <NewUser />
                <LogoutButton />
                <button className="m-2" onClick={() => deleteUser(Number(id))}>Delete account</button>

            </div>
            <div className='Reviews box-style h-full scroll-auto'>
                <h2 className='text-center'>Reviews</h2>
                <ReviewList objectID={Number(id)} ListType={Number(0)} />

            </div>
            <div className='Orders box-style h-full scroll-auto'>
                <h2 className='text-center'>Past Orders</h2>
                <OrderList />
            </div>
        </div>
    );

}

export default UserPage;
