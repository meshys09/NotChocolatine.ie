import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewUser.css";
import '../../styles.css';

function NewUser() {
    const navigate = useNavigate();
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (!mail || !password || !confirmPassword) {
            setError('Please enter all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
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
            setError('');
            navigate('/login');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="NewUser box-style">
            <h2 className="text-center">Welcome to NotChocolatine!</h2>

            <form onSubmit={handleSubmit} className="NewUserForm form-style">
                <div className="EmailField field-style">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        required
                    />
                </div>

                <div className="PasswordField field-style">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="ConfirmPasswordField field-style">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onCopy={(e) => e.preventDefault()} // Empêche le copier
                        onPaste={(e) => e.preventDefault()} // Empêche le coller
                        required
                    />
                </div>

                <button type="submit" className="place-self-end">Create User</button>
            </form>

            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default NewUser;