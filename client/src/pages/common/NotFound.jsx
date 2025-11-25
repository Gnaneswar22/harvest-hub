import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-4xl font-bold mb-4 text-red-500">404</h1>
            <p className="mb-4">Page Not Found</p>
            <Link to="/" className="text-blue-500 hover:underline">Go Home</Link>
        </div>
    );
};

export default NotFound;
