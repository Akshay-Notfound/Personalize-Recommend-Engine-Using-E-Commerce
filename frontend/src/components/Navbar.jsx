import React, { useState } from 'react';
import { ShoppingBag, Search, User, Menu, LogOut, X, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
    const { currentUser, userProfile, logout } = useAuth();
    const { totalItems, toggleCart } = useCart();
    const { wishlistItems } = useWishlist();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to products page with search query (implementation depends on your routing/filtering logic)
            // For now, we'll just navigate to products
            console.log('Searching for:', searchQuery);
            navigate('/products');
            setIsSearchOpen(false);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Left: Navigation Menu */}
                    <div className="hidden lg:flex items-center gap-10">
                        <Link to="/" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors">
                            Shop
                        </Link>
                        <Link to="/products" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors">
                            Trending
                        </Link>
                        <Link to="/categories" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors">
                            Journal
                        </Link>
                    </div>

                    {/* Center: Logo */}
                    <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-xs group-hover:scale-110 transition-transform duration-500">
                            E
                        </div>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter hidden sm:block">
                            E-SHOP<span className="text-blue-600">.</span>
                        </span>
                    </Link>

                    {/* Right Section */}
                    <div className="flex items-center gap-6">
                        {/* Search Bar */}
                        <div className="relative">
                            {isSearchOpen ? (
                                <form onSubmit={handleSearchSubmit} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border border-slate-200 rounded-full pl-4 pr-10 py-2 shadow-lg w-64 transition-all">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search products..."
                                        className="w-full bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsSearchOpen(false)}
                                        className="absolute right-3 text-slate-400 hover:text-slate-900"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </form>
                            ) : (
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="hidden sm:block p-2 text-slate-900 hover:bg-slate-50 rounded-full transition-colors"
                                >
                                    <Search className="w-5 h-5 stroke-[2.5]" />
                                </button>
                            )}
                        </div>

                        {currentUser ? (
                            <div className="hidden sm:flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    {userProfile?.photoURL ? (
                                        <img
                                            src={userProfile.photoURL}
                                            alt={userProfile.displayName}
                                            className="w-8 h-8 rounded-full border-2 border-slate-200"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                            {userProfile?.displayName?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                    )}
                                    <span className="text-sm font-semibold text-slate-900">
                                        {userProfile?.displayName || currentUser.email.split('@')[0]}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 group"
                                >
                                    <LogOut className="w-4 h-4 text-slate-600 group-hover:text-red-600 transition-colors" />
                                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-600 group-hover:text-red-600 transition-colors">
                                        Logout
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-4">
                                <Link to="/login" className="flex items-center gap-2 group">
                                    <User className="w-5 h-5 text-slate-900 group-hover:text-blue-600 transition-colors stroke-[2.5]" />
                                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">Sign In</span>
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:shadow-lg transition-all"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        <Link to="/wishlist" className="group relative p-3 bg-white text-slate-900 rounded-full hover:bg-slate-50 transition-all border border-slate-100">
                            <Heart className="w-5 h-5 stroke-[2.5] text-slate-900 group-hover:text-red-500 transition-colors" />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full border-2 border-white flex items-center justify-center">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={toggleCart}
                            className="group relative p-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                        >
                            <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-black rounded-full border-2 border-white flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        <button className="lg:hidden p-2 text-slate-900">
                            <Menu className="w-6 h-6 stroke-[2.5]" />
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
