import React, { useState } from 'react';
import './LoginPage.css';
import '../../styles.css';

function LoginPage() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!mail || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mail, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            // localStorage.setItem('role', data.role);
            localStorage.setItem('userId', data.id);
            console.log('Login successful:', data);

        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="LoginPage grow flex place-content-center items-center">
        <div className='Login box-style flex flex-col'>
               
                <h2 className='text-center'>Welcome Back!</h2>

                <form onSubmit={handleSubmit} className='Form flex flex-col'>
                    
                    <div className="EmailField field-style">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="PasswordField field-style">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="error">{error}</p>}

                    <button type="submit" className='LoginButton place-self-end'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;