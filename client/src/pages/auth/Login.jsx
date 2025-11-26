import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await api.post('/api/auth/login', { email, password }, config);

            login(data);

            if (data.role === 'producer') {
                navigate('/producer/dashboard');
            } else {
                navigate('/');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen bg-[#558B2F] flex items-center justify-center font-sans">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h1>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#558B2F]"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#558B2F]"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-[#558B2F] text-white p-3 rounded font-bold hover:bg-[#457025] transition-colors">
                        Log In
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                    New to HarvestHub? <Link to="/portal/signup" className="text-[#558B2F] font-bold hover:underline">Create an account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
