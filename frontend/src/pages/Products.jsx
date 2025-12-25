import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const location = useLocation();
    const [sortOption, setSortOption] = useState(() => {
        const params = new URLSearchParams(location.search);
        return params.get('sort') || 'popular';
    });
    const [activeCategory, setActiveCategory] = useState(() => {
        const params = new URLSearchParams(location.search);
        return params.get('category') || 'all';
    });

    const [showFilters, setShowFilters] = useState(false);
    const [showSort, setShowSort] = useState(false);

    const categories = ['All', 'Electronics', 'Jewelery', "Men's Clothing", "Women's Clothing"];
    const sortOptions = [
        { id: 'popular', label: 'Most Popular' },
        { id: 'price-asc', label: 'Price: Low to High' },
        { id: 'price-desc', label: 'Price: High to Low' },
        { id: 'name-asc', label: 'Name: A-Z' },
    ];

    // Helper to update URL params
    const updateParams = (key, value) => {
        const searchParams = new URLSearchParams(location.search);
        if (value && value !== 'all' && value !== 'popular') {
            searchParams.set(key, value);
        } else {
            searchParams.delete(key);
        }

        const newUrl = `${location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', newUrl);

        if (key === 'category') setActiveCategory(value);
        if (key === 'sort') setSortOption(value);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await getProducts();
                setProducts(response.data);
                setFilteredProducts(response.data); // Initialize with all products
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Effect to filter and sort products
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('q');

        // Start with all products
        let result = [...products];

        // 1. Filter by Search
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(lowerQuery) ||
                p.description.toLowerCase().includes(lowerQuery) ||
                p.category.toLowerCase().includes(lowerQuery)
            );
        }

        // 2. Filter by Category
        if (activeCategory && activeCategory.toLowerCase() !== 'all') {
            result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
        }

        // 3. Sort
        switch (sortOption) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        setFilteredProducts(result);
    }, [products, activeCategory, sortOption, location.search]);

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-2">Shop All Products</h1>
                        <p className="text-slate-500">
                            Showing {filteredProducts.length} results
                        </p>
                    </div>

                    <div className="flex items-center gap-4 relative z-20">
                        {/* Filter Button */}
                        <div className="relative">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-2 bg-white border rounded-xl text-sm font-bold transition-all ${showFilters ? 'border-slate-900 text-slate-900 ring-2 ring-slate-100' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                            >
                                <Filter className="w-4 h-4" />
                                Filter
                            </button>

                            {/* Filter Dropdown */}
                            {showFilters && (
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Category</h3>
                                    <div className="space-y-1">
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => { updateParams('category', cat); setShowFilters(false); }}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${(activeCategory.toLowerCase() === cat.toLowerCase())
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'text-slate-600 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sort Button */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSort(!showSort)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
                            >
                                <span className="text-slate-400 font-normal">Sort by:</span>
                                {sortOptions.find(o => o.id === sortOption)?.label}
                                <ChevronDown className={`w-4 h-4 transition-transform ${showSort ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Sort Dropdown */}
                            {showSort && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
                                    {sortOptions.map(option => (
                                        <button
                                            key={option.id}
                                            onClick={() => { updateParams('sort', option.id); setShowSort(false); }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${sortOption === option.id
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="h-[400px] bg-white rounded-2xl animate-pulse border border-slate-100"></div>
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <SlidersHorizontal className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">No products found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                        <button
                            onClick={() => { updateParams('category', 'all'); updateParams('sort', 'popular'); }}
                            className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Products;
