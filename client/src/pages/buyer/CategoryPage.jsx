import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

const CategoryPage = () => {
    const { category } = useParams();

    // Mock data - in a real app, fetch based on category
    const products = [
        { id: 1, name: `${category} Item 1`, price: '100', image: 'https://via.placeholder.com/300' },
        { id: 2, name: `${category} Item 2`, price: '200', image: 'https://via.placeholder.com/300' },
        { id: 3, name: `${category} Item 3`, price: '150', image: 'https://via.placeholder.com/300' },
        { id: 4, name: `${category} Item 4`, price: '80', image: 'https://via.placeholder.com/300' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 capitalize text-gray-800">{category}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
