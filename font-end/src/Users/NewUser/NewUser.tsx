import React, { useState } from "react";
import "./NewUser.css";

function NewUser() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!mail || !password) {
            setError('Please enter all fields.');
            return;
        }

        try {
            var role = 0;
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mail, password, role }),
            });

            if (!response.ok) {
                throw new Error('Failed to create user.');
            }

            const data = await response.json();
            console.log('User created:', data);

        } catch (err) {
            setError((err as Error).message);
        }
    }
    return (
        <div className="NewUser">
            <h2>Add a new user</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <button type="submit">Create User</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default NewUser;