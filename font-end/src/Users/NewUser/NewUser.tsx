import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NewUser.css";
import '../../styles.css';

function NewUser() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId'); // Récupère le userId depuis le localStorage

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // État pour le message de succès
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(`http://localhost:3000/users/${userId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data.');
                    }
                    const data = await response.json();
                    setMail(data.mail);
                    setPassword('');
                    setConfirmPassword('');
                } catch (err) {
                    setError((err as Error).message);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUser();
        }
    }, [userId]);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (!mail || !password || !confirmPassword) {
            setError('Please enter all fields.');
            setSuccessMessage(''); // Réinitialise le message de succès
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setSuccessMessage('');
            return;
        }

        try {
            const url = userId
                ? `http://localhost:3000/users/${userId}`
                : 'http://localhost:3000/users';

            const method = userId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mail, password, role: 0 }),
            });

            if (!response.ok) {
                throw new Error(userId ? 'Failed to update user.' : 'Failed to create user.');
            }

            const data = await response.json();
            setError('');
            setSuccessMessage(userId ? 'User updated successfully!' : 'User created successfully!');

            if (!userId) {
                localStorage.setItem('userId', data.id);
                setTimeout(() => navigate('/login'), 2000); // Redirige après 2 secondes
            } else {
                setTimeout(() => navigate('/users'), 2000); // Redirige après 2 secondes
            }
        } catch (err) {
            setError((err as Error).message);
            setSuccessMessage('');
        }
    };

    return (
        <div className="NewUser box-style">
            <h2 className="text-center">
                {userId ? 'Update Your Account' : 'Welcome to NotChocolatine!'}
            </h2>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
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
                            onCopy={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                            required
                        />
                    </div>

                    <button type="submit" className="place-self-end">
                        {userId ? 'Update User' : 'Create User'}
                    </button>
                </form>
            )}

            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>} {/* Affiche le message de succès */}
        </div>
    );
}

export default NewUser;