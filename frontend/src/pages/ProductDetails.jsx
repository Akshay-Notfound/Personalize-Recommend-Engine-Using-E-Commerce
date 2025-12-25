import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../api/axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, ShoppingCart, Star, Heart } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await getProduct(id);
                setProduct(res.data.product);
                setSimilarProducts(res.data.similar_products);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 font-medium">Fetching details...</p>
            </div>
        </div>
    );

    if (!product) return <div className="p-8 text-center">Product not found</div>;

    return (
        <div className="bg-white min-h-screen">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center text-slate-400 hover:text-slate-900 mb-10 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to collection
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Image Gallery */}
                    <div className="relative aspect-square bg-slate-50 rounded-3xl overflow-hidden p-12 flex items-center justify-center border border-slate-100 shadow-inner">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-6 right-6">
                            <span className="px-3 py-1 bg-white/80 backdrop-blur shadow-sm rounded-full text-xs font-bold text-slate-900 border border-slate-100">Official Store</span>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <div className="inline-block w-fit px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 border border-blue-100">
                            {product.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                            <div className="flex items-center gap-1">
                                <div className="flex text-amber-400">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                                </div>
                                <span className="text-sm font-bold text-slate-900 ml-1">4.9</span>
                            </div>
                            <span className="text-sm text-slate-400">(128 reviews)</span>
                            <span className="text-sm text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">In Stock</span>
                        </div>

                        <div className="mb-10">
                            <span className="text-4xl font-black text-slate-900 tracking-tighter">${product.price}</span>
                        </div>

                        <div className="space-y-6 mb-12">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Description</h3>
                                <p className="text-slate-500 leading-relaxed text-lg italic">
                                    "{product.description}"
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-slate-900 text-white px-8 py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Bag
                            </button>
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`px-8 py-5 rounded-2xl font-bold border transition-all flex items-center gap-2 ${isInWishlist(product.id)
                                    ? 'bg-red-50 border-red-100 text-red-500'
                                    : 'border-slate-200 hover:bg-slate-50 text-slate-900'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                                {isInWishlist(product.id) ? 'Saved' : 'Wishlist'}
                            </button>
                        </div>

                        <div className="mt-8 flex items-center gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            <div className="flex items-center gap-2 italic">Free Shipping</div>
                            <div className="flex items-center gap-2 italic">30-Day Returns</div>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <section>
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-bold text-slate-900">You may also like</h2>
                        <div className="h-[1px] flex-1 mx-8 bg-slate-100"></div>
                        <span className="text-sm font-medium text-slate-400 italic">Curated by AI</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {similarProducts.map(p => (
                            <ProductCard key={p.id} product={p} isFeatured={true} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetails;
