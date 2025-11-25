import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ title, linkText, items, linkUrl, rotation }) => (
    <div
        className="bg-white p-4 shadow-xl flex flex-col h-full min-h-[380px] relative transition-all duration-300 hover:z-10 hover:scale-105"
        style={{ transform: `rotate(${rotation}deg)` }}
    >
        <h3 className="font-bold text-sm mb-4 text-gray-900 leading-tight border-b pb-2">{title}</h3>

        <div className="flex flex-col gap-4 mb-8">
            {items.map((item, idx) => (
                <Link to={linkUrl} key={idx} className="flex flex-col cursor-pointer group">
                    <div className="bg-white mb-1 overflow-hidden shadow-sm border border-gray-200">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-24 object-cover group-hover:opacity-90 transition-opacity"
                        />
                    </div>
                    <span className="text-[11px] text-gray-700 font-medium">{item.name}</span>
                </Link>
            ))}
        </div>

        <Link to={linkUrl} className="text-blue-700 text-xs font-bold absolute bottom-4 left-4 hover:underline">
            {linkText}
        </Link>
    </div>
);

const MarketFeed = () => {
    const { user: firebaseUser, loginWithGoogle } = useAuth();
    const [localUser, setLocalUser] = React.useState(null);

    React.useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setLocalUser(JSON.parse(storedUser));
        }
    }, []);

    const user = firebaseUser || localUser;

    const categories = [
        {
            title: "Starting ₹120 | Fruits",
            linkText: "Explore all",
            linkUrl: "/category/fruits",
            rotation: -2,
            items: [
                { name: "Fresh fruits", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=300&q=80" },
                { name: "Fresh fruit juice", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=300&q=80" }
            ]
        },
        {
            title: "Upto 50% off | on your vegetables",
            linkText: "See more",
            linkUrl: "/category/vegetables",
            rotation: 1,
            items: [
                { name: "Fresh vegetables", image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=300&q=80" },
                { name: "Fresh vegetable juice", image: "https://images.unsplash.com/photo-1615478503562-ec2d8dd0e676?auto=format&fit=crop&w=300&q=80" }
            ]
        },
        {
            title: "Groceries for your kitchen | 55% off",
            linkText: "See all offers",
            linkUrl: "/category/groceries",
            rotation: -1,
            items: [
                { name: "Groceries", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80" },
                { name: "Daily needs", image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=300&q=80" }
            ]
        },
        {
            title: "Fresh meat delivered in 20 mins",
            linkText: "Explore more",
            linkUrl: "/category/meat",
            rotation: 2,
            items: [
                { name: "Chicken", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=300&q=80" },
                { name: "Mutton", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=300&q=80" }
            ]
        },
        {
            title: "Dairy products | Upto ₹20 on it",
            linkText: "Get all offers",
            linkUrl: "/category/dairy",
            rotation: -2,
            items: [
                { name: "Dairy products", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=300&q=80" },
                { name: "Signature ghee", image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=300&q=80" }
            ]
        }
    ];

    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-[#558B2F] min-h-screen pb-12 font-sans">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16 px-4">
                    {categories.map((cat, idx) => (
                        <CategoryCard key={idx} {...cat} />
                    ))}
                </div>

                {/* Fresh Arrivals Section */}
                <h2 className="text-3xl text-white/90 font-medium mb-6 pl-2">Fresh Arrivals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mb-12">
                    {products.slice(0, 8).map((product) => (
                        <Link to={`/product/${product._id}`} key={product._id} className="bg-white p-4 rounded shadow-lg hover:scale-105 transition-transform">
                            <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                            <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-green-700 text-xl">₹{product.price}</span>
                                <span className="text-xs text-gray-500">{product.quantity} units left</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Your Orders Section */}
                <h2 className="text-3xl text-white/90 font-medium mb-6 pl-2">Your orders</h2>

                {user ? (
                    <div className="bg-white mx-2 shadow-2xl p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">Welcome back, {user.displayName || user.firstName}!</h3>
                        <p className="text-gray-600 mb-6">You have no active orders right now.</p>
                        <button className="bg-[#558B2F] text-white px-8 py-3 rounded font-bold hover:bg-[#457025] transition-colors shadow-md">
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="bg-white mx-2 shadow-2xl p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
                        <div className="mb-6">
                            <AlertTriangle size={80} className="text-black" fill="black" color="white" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-4xl font-medium mb-3 text-black tracking-tight">Login to view your orders</h3>
                        <p className="text-black text-lg">
                            New customer? <Link to="/portal/signup" className="text-blue-700 hover:underline font-bold">Signin</Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarketFeed;
