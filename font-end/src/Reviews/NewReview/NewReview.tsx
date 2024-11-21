import React, { useState } from "react";
// import ReactStars from "react-rating-stars-component"
import "./NewReview.css";

function NewReview({ productId }: { productId: number }) {
    const [comment, setComment] = useState('');
    const [grade, setGrade] = useState<number>(0); // Grade is now a number
    const [error, setError] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (!comment || grade === 0) {
            setError('Please enter all fields.');
            return;
        }

        try {
            const userId = Number(localStorage.getItem('userId'));

            const response = await fetch('http://localhost:3000/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment, grade, productId, userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to create review.');
            }

            const data = await response.json();
            console.log('Review created:', data);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="NewReview">
            <h2>Write a Review</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="grade">Grade:</label>
                </div>
                <button type="submit">Submit</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default NewReview;