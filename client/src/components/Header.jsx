import React, { useState, useEffect } from 'react';
import { Search, MapPin, Menu, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useGeoLocation from '../hooks/useGeoLocation';

const Header = () => {
    const { user, loginWithGoogle, logout } = useAuth();
    const [locationName, setLocationName] = useState('Update location');
    const [searchQuery, setSearchQuery] = useState('');
    const location = useGeoLocation();
    const navigate = useNavigate();

    // Update location text when coordinates are found
    useEffect(() => {
        if (location.loaded && location.coordinates) {
            // In a real app, you'd reverse geocode here. For now:
            setLocationName(`${location.coordinates.lat.toFixed(2)}, ${location.coordinates.lng.toFixed(2)}`);
        } else if (location.error) {
            setLocationName("Location blocked");
        }
    }, [location]);

    const handleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error("Login failed", error);
            alert(`Login failed: ${error.message}`);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className="flex flex-col w-full font-sans sticky top-0 z-50">
            {/* Top Bar - Green Background */}
            <div className="bg-[#558B2F] px-4 md:px-6 py-3 flex items-center justify-between gap-4 h-16 shadow-md">
                {/* Logo */}
                <Link to="/" className="flex items-end gap-0.5 text-white shrink-0 group">
                    <div className="bg-[#558B2F] border-2 border-white/20 p-1 rounded flex items-end">
                        <div className="text-4xl font-black leading-none tracking-tighter">H</div>
                        <div className="flex flex-col justify-end pb-1">
                            <span className="text-[10px] font-bold tracking-widest leading-none mb-0.5 uppercase">arvest</span>
                        </div>
                        <div className="text-4xl font-black leading-none tracking-tighter ml-0.5">H</div>
                        <div className="flex flex-col justify-end pb-1">
                            <span className="text-[10px] font-bold tracking-widest leading-none mb-0.5 uppercase">ub</span>
                        </div>
                    </div>
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-6">
                    <div className="flex w-full h-10 rounded-md overflow-hidden shadow-sm bg-white">
                        <div className="bg-gray-100 px-3 flex items-center gap-1 border-r border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors text-gray-700 text-xs font-bold">
                            <span>ALL</span>
                            <ChevronDown size={10} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Your Preferences"
                            className="flex-1 px-4 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                        />
                        <button type="submit" className="bg-white px-4 flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <Search size={20} className="text-black" />
                        </button>
                    </div>
                </form>

                {/* Right Actions */}
                <div className="flex items-center gap-4 shrink-0">
                    {/* Location */}
                    <div className="hidden lg:flex items-center bg-white rounded-md px-3 py-1 gap-2 h-10 shadow-sm min-w-[180px] cursor-pointer hover:bg-gray-50 transition-colors">
                        <MapPin size={20} className="text-black" />
                        <div className="flex flex-col leading-none justify-center">
                            <span className="text-[10px] text-gray-500">Delivering to XXXXXXXXXX</span>
                            <span className="text-xs font-bold text-gray-800">{locationName}</span>
                        </div>
                    </div>

                    {/* Login Button */}
                    {user ? (
                        <div className="flex items-center gap-2 bg-white rounded-md p-1 pr-3 h-10 shadow-sm cursor-pointer hover:bg-gray-50" onClick={logout}>
                            <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-md" />
                            <span className="font-bold text-sm text-gray-800">Logout</span>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className="bg-white text-black px-6 h-10 rounded-md font-bold text-base shadow-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
                        >
                            Log In
                        </button>
                    )}
                </div>
            </div>

            {/* Navigation Bar - Grey Background */}
            <nav className="bg-[#E0E0E0] flex items-center justify-between px-4 md:px-8 py-2 overflow-x-auto whitespace-nowrap shadow-inner border-b border-gray-300">
                <div className="flex items-center gap-6 md:gap-8 text-black font-semibold text-base">
                    <button className="flex items-center gap-1 font-bold hover:text-[#558B2F] transition-colors">
                        <Menu size={22} /> Menu
                    </button>
                    <Link to="/category/fruits" className="flex items-center gap-1 hover:text-[#558B2F] transition-colors">
                        Fruits🍒
                    </Link>
                    <Link to="/category/vegetables" className="flex items-center gap-1 hover:text-[#558B2F] transition-colors">
                        Vegetables🥔
                    </Link>
                    <Link to="/category/meat" className="flex items-center gap-1 hover:text-[#558B2F] transition-colors">
                        Meat 🍗
                    </Link>
                    <Link to="/category/groceries" className="flex items-center gap-1 hover:text-[#558B2F] transition-colors">
                        Groceries 🛒
                    </Link>
                    <Link to="/category/dairy" className="flex items-center gap-1 hover:text-[#558B2F] transition-colors">
                        Dairy Products 🐄
                    </Link>
                </div>

                <Link to="/plant-tree" className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white px-4 py-1.5 rounded flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm ml-4">
                    <span>Plant a Tree</span>
                    <span className="text-lg">🌲</span>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
