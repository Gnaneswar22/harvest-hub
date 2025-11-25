import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md">
            <img src={product?.image || 'https://via.placeholder.com/150'} alt={product?.name || 'Product'} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-lg font-semibold">{product?.name || 'Product Name'}</h3>
            <p className="text-gray-600">${product?.price || '0.00'}</p>
        </div>
    );
};

export default ProductCard;
