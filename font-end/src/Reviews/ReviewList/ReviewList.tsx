import React, { useEffect, useState } from 'react';
import './ReviewList.css';
import { useParams } from 'react-router-dom';

interface Review {
    id: number;
    comment: string;
    grade: number;
    userId: number;
}

function ReviewList({ objectID , ListType }: { objectID: number ; ListType: number },) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); 
    
    if (ListType === 0) {
        var requestType = "byUser"; }
    else { 
        if (ListType === 1) 
            { var requestType = "byProduct"; 
        } }

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:3000/reviews/${requestType}/${objectID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data);
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

        fetchReviews();
    }, [objectID, ListType]);

    if (loading) return <div className='error-style'>Loading...</div>;
    if (error) return <div className='error-style'>Error: {error}</div>;

    return (
        <div className="ReviewList">
            {reviews.map((review) => (
                <div key={review.id}>
                    <h2 className='text-right px-2 mt-2'>{review.grade}</h2><p>{review.comment}</p>
                </div>
            ))}
        </div>
    );
}

export default ReviewList;