import React from 'react';

const Register = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
            <form className="max-w-md mx-auto bg-white p-6 rounded shadow">
                <input type="text" placeholder="Name" className="w-full p-2 border mb-4 rounded" />
                <input type="email" placeholder="Email" className="w-full p-2 border mb-4 rounded" />
                <input type="password" placeholder="Password" className="w-full p-2 border mb-4 rounded" />
                <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Register</button>
            </form>
        </div>
    );
};

export default Register;
