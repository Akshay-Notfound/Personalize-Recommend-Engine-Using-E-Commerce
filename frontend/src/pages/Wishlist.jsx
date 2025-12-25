import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const Wishlist = () => {
    const { wishlistItems } = useWishlist();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-red-500 fill-current" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">My Wishlist</h1>
                        <p className="text-slate-500">{wishlistItems.length} saved items</p>
                    </div>
                </div>

                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlistItems.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-10 h-10 text-slate-300" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-slate-500 mb-8">Save items you love to revisit later.</p>
                        <a href="/" className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                            Start Shopping
                        </a>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Wishlist;
