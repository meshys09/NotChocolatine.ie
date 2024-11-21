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
        <div className="NewReview box-style">
            
            <h2 className="text-center">Write a Review</h2>
            <form onSubmit={handleSubmit} className="ReviewForm form-style">
                <div className="CommentField field-style">
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div className="GradeField field-style">
                    <label htmlFor="grade">Grade:</label>
                    
                    {/* placeholder for the rating - doing the real thing later */}
                        <div className="stars">
                                <input className="star star-5" id="star-5" type="radio" name="star"/>
                                <label className="star star-5" htmlFor="star-5"></label>
                                <input className="star star-4" id="star-4" type="radio" name="star"/>
                                <label className="star star-4" htmlFor="star-4"></label>
                                <input className="star star-3" id="star-3" type="radio" name="star"/>
                                <label className="star star-3" htmlFor="star-3"></label>
                                <input className="star star-2" id="star-2" type="radio" name="star"/>
                                <label className="star star-2" htmlFor="star-2"></label>
                                <input className="star star-1" id="star-1" type="radio" name="star"/>
                                <label className="star star-1" htmlFor="star-1"></label>
                        </div>

                </div>
                <button type="submit">Submit</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default NewReview;