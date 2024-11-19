import React, { useState } from "react";
import "./NewReview.css";

function NewReview({ productId }: { productId: number }) {
    const [comment, setComment] = useState('');
    const [grade, setGrade] = useState<number | string>('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!comment || !grade) {
            setError('Please enter all fields.');
            return;
        }

        try {
            var userId = Number(localStorage.getItem('userId'));

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
    }
    return (
        <div className="NewReview">
            <h2>Write a review</h2>
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
                    <input
                        id="grade"
                        type="number"
                        value={grade}
                        onChange={(e) => setGrade(Number(e.target.value))}
                    />
                </div>
                <button type="submit">Submit</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}
export default NewReview;