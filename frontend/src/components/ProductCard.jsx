import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, isFeatured = false }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <Link to={`/product/${product.id}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
            {/* Image Container */}
            <div className={`relative aspect-square overflow-hidden bg-white p-8 ${isFeatured ? 'bg-gradient-to-br from-blue-50/50 to-white' : ''}`}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Overlay Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {isFeatured && (
                        <span className="px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded uppercase tracking-tighter shadow-sm">AI Match</span>
                    )}
                </div>

                <button
                    onClick={handleWishlist}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white transition-all shadow-sm z-10"
                >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-500"></div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col flex-1 p-6">
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">
                    {product.category}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 min-h-[40px]">
                    {product.title}
                </h3>

                <div className="mt-auto flex items-center justify-between pt-4">
                    <div>
                        <span className="text-lg font-black text-slate-900 tracking-tight">
                            ${product.price}
                        </span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="flex items-center justify-center w-10 h-10 bg-slate-50 text-slate-900 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
