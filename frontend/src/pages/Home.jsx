import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getRecommendations } from '../api/axios';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId') || 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, recRes] = await Promise.all([
                    getProducts(),
                    getRecommendations(userId)
                ]);
                setProducts(prodRes.data);
                setRecommendations(recRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userId]);

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-white border-b border-slate-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                        </span>
                        New Spring Collection 2024
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
                        Elevate Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Everyday</span> Style
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
                        Experience the perfect blend of comfort and luxury with our curated selection of essentials. Discover products tailored just for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/products" className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 text-center">
                            Shop All Products
                        </Link>
                        <Link to="/products" className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all text-center">
                            View Collections
                        </Link>
                    </div>
                </div>

                {/* Decorative background Elements */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* AI Recommendations Section */}
                <section className="mb-20">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Curated For You</h2>
                            <p className="text-slate-500">Based on your interests and recent activity.</p>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-sm font-medium text-slate-400 italic">Powered by MLRecommender</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-80 bg-white rounded-2xl animate-pulse border border-slate-100"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {recommendations.length > 0 ? (
                                recommendations.map(product => (
                                    <ProductCard key={`rec-${product.id}`} product={product} isFeatured={true} />
                                ))
                            ) : (
                                <div className="col-span-full py-12 px-6 bg-white border border-dashed border-slate-200 rounded-3xl text-center">
                                    <p className="text-slate-400">Wait a moment, we're personalizing your shop...</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* Categories Banner */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <Link to="/products" className="md:col-span-2 h-64 bg-slate-900 rounded-3xl overflow-hidden relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
                        <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">
                            <h3 className="text-3xl font-bold text-white mb-2">Tech Essentials</h3>
                            <p className="text-slate-300 mb-4">The latest in consumer electronics</p>
                            <span className="text-white font-bold flex items-center gap-2">Explore <ArrowRight className="w-4 h-4" /></span>
                        </div>
                    </Link>
                    <Link to="/products" className="h-64 bg-blue-600 rounded-3xl overflow-hidden relative group cursor-pointer">
                        <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">
                            <h3 className="text-2xl font-bold text-white mb-2">Summer Sale</h3>
                            <p className="text-blue-100 mb-4">Up to 40% off</p>
                            <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-bold w-fit">Shop Now</button>
                        </div>
                    </Link>
                </div>

                {/* All Products Section */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">Trending Now</h2>
                        <Link to="/products" className="text-primary font-bold hover:underline">View All</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loading ? (
                            [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <div key={i} className="h-80 bg-white rounded-2xl animate-pulse border border-slate-100"></div>
                            ))
                        ) : (
                            products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                    </div>
                </section>
            </main>

            {/* Newsletter */}
            <div className="bg-white border-t border-slate-100 py-20 mt-20">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Join our community</h2>
                    <p className="text-slate-500 mb-8 text-lg">Subscribe to get special offers, early access to new releases and personalized recommendations.</p>
                    <div className="flex gap-2 p-1 border border-slate-200 rounded-2xl bg-slate-50">
                        <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-transparent focus:outline-none" />
                        <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold">Subscribe</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
