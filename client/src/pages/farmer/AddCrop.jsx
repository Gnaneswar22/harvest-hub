import React from 'react';

const AddCrop = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Crop</h1>
            <form className="max-w-md mx-auto bg-white p-6 rounded shadow">
                <input type="text" placeholder="Crop Name" className="w-full p-2 border mb-4 rounded" />
                <input type="number" placeholder="Price per kg" className="w-full p-2 border mb-4 rounded" />
                <textarea placeholder="Description" className="w-full p-2 border mb-4 rounded"></textarea>
                <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Add Crop</button>
            </form>
        </div>
    );
};

export default AddCrop;
