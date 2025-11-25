import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-green-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Harvest Hub</Link>
                <div>
                    <Link to="/login" className="mr-4">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
