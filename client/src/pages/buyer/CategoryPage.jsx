import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Fetch local and external products in parallel
                const [localResponse, externalResponse] = await Promise.all([
                    axios.get('/api/products'),
                    axios.get(`/api/external/${category}`)
                ]);

                // Filter local products
                const localFiltered = localResponse.data.filter(
                    (product) => product.category.toLowerCase() === category.toLowerCase()
                );

                // External products are already filtered by the backend
                const externalProducts = externalResponse.data;

                // Merge them
                setProducts([...localFiltered, ...externalProducts]);
            } catch (error) {
                console.error('Error fetching products', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-gray-600">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 capitalize text-green-800 border-b pb-2">{category}</h1>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl text-gray-600 mb-4">No products found in this category yet.</h2>
                        <Link to="/" className="text-green-600 font-bold hover:underline">Go back home</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link to={`/product/${product._id}`} key={product._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 block">
                                <img
                                    src={product.image || 'https://via.placeholder.com/300'}
                                    alt={product.name}
                                    className="w-full h-48 object-cover mb-4 rounded"
                                />
                                <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name}</h3>
                                <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="font-bold text-green-700 text-xl">₹{product.price}</span>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.quantity} units left</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
