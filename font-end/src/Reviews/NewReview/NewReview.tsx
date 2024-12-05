import React, { useState } from "react";
import "./NewReview.css";

function NewReview({ productId = 0 }: { productId?: number }) { // Default value for productId
    const [comment, setComment] = useState('');
    const [grade, setGrade] = useState<number>(0);
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

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={`star ${index < grade ? 'active' : ''}`}
                onClick={() => setGrade(index + 1)}
                style={{
                    fontSize: '2rem',
                    color: index < grade ? '#ffd700' : '#ccc',
                    cursor: 'pointer',
                }}
            >
                ★
            </span>
        ));
    };

    return (
        <div className="NewReview box-style">
            <h2 className="text-center">Write a Review</h2>
            <form onSubmit={handleSubmit} className="ReviewForm form-style">
                <div className="CommentField field-style">
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment here..."
                    />
                </div>
                <div className="GradeField field-style">
                    <label htmlFor="grade">Grade:</label>
                    <div className="stars-container">{renderStars()}</div>
                </div>
                <button type="submit" className="submit-button">Submit</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default NewReview;