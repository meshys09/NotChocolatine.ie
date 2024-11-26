import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ReviewList from '../../Reviews/ReviewList/UserReviewList';
import "./UserPage.css";
import '../../styles.css';
import NewUser from "../UserForm/UserForm";

interface User {
    id: number;
    mail: string;
    password: number;
    role: number;
}

function UserPage() {

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
    }, []);

    if (loading) return <div className="error-style">Loading...</div>;
    if (error) return <div className="error-style ">{error}</div>;

    return (
        <div className="flex flex-wrap">

            <div className="UserProfile box-style max-w-80 h-full">
                <h2 className="text-center w-fit pb-5">User Profile</h2>
                <NewUser />
            </div>
            <div className='Reviews box-style h-full scroll-auto'>
                <h2 className='text-center'>Reviews</h2>
                <ReviewList userId={Number(id)} />

            </div>
            <div className='Orders box-style h-full scroll-auto'>
                <h2 className='text-center'>Past Orders</h2>
                <ReviewList userId={Number(id)} />

            </div>
        </div>
    );

}

export default UserPage;
