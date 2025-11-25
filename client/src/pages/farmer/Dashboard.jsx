import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        description: '',
        image: '',
    });
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        setUserInfo(user);
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products');
            // Filter products for this user (assuming API returns all)
            // Ideally backend should handle this filtering
            const user = JSON.parse(localStorage.getItem('userInfo'));
            if (user) {
                const myProducts = data.filter(p => p.farmer === user._id);
                setProducts(myProducts);
            }
        } catch (error) {
            console.error('Error fetching products', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.post('/api/products', formData, config);
            alert('Harvest Uploaded Successfully!');
            setFormData({
                name: '',
                category: '',
                price: '',
                quantity: '',
                description: '',
                image: '',
            });
            fetchProducts();
        } catch (error) {
            console.error('Error uploading product', error);
            alert('Failed to upload harvest');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-green-800 mb-8">Producer Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Upload Form */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload Harvest</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Harvest Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                    <option value="">Select Category</option>
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Fruits">Fruits</option>
                                    <option value="Grains">Grains</option>
                                    <option value="Dairy">Dairy</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price (per unit)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Quantity (kg/units)</label>
                                    <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition font-semibold">
                                {loading ? 'Uploading...' : 'Upload Harvest'}
                            </button>
                        </form>
                    </div>

                    {/* My Harvests List */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">My Harvests</h2>
                        {products.length === 0 ? (
                            <p className="text-gray-500">No harvests uploaded yet.</p>
                        ) : (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                {products.map((product) => (
                                    <div key={product._id} className="flex items-center border-b pb-4 last:border-0">
                                        <img src={product.image || 'https://via.placeholder.com/100'} alt={product.name} className="w-16 h-16 object-cover rounded mr-4" />
                                        <div>
                                            <h3 className="font-bold text-gray-800">{product.name}</h3>
                                            <p className="text-sm text-gray-600">{product.category} - {product.quantity} units</p>
                                            <p className="text-green-600 font-bold">${product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
