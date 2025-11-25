import React from 'react';

const RoleSelect = () => {
    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-2xl font-bold mb-8">Select Your Role</h1>
            <div className="flex justify-center gap-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg w-32 transition-colors">Farmer</button>
                <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg w-32 transition-colors">Buyer</button>
            </div>
        </div>
    );
};

export default RoleSelect;
