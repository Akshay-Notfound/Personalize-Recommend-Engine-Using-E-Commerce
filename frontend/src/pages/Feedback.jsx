import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MessageSquare, Star, Send, CheckCircle } from 'lucide-react';
import { submitFeedback } from '../services/feedbackService';

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 5,
        category: 'General',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRatingChange = (rating) => {
        setFormData({ ...formData, rating });
    };

    const handleCategoryChange = (category) => {
        setFormData({ ...formData, category });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await submitFeedback(formData);
            setSubmitted(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
                <main className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 text-center max-w-lg w-full">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-4">Thank You!</h2>
                        <p className="text-slate-500 mb-8">
                            Your feedback helps us improve our personalized recommendations. We appreciate your time!
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                        >
                            Return Home
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <div className="bg-slate-900 text-white py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Your Feedback Matters</h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Help us improve your shopping experience. We value your suggestions and thoughts.
                        </p>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
                    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Share your experience</h2>
                                <p className="text-slate-500 text-sm">Tell us what you think about E-SHOP</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Rating Section */}
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">How would you rate your experience?</label>
                                <div className="flex gap-4">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            type="button"
                                            onClick={() => handleRatingChange(rating)}
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all group ${formData.rating >= rating ? 'bg-yellow-50 text-yellow-500 ring-2 ring-yellow-500/20' : 'bg-slate-50 text-slate-300 hover:bg-yellow-50 hover:text-yellow-500'}`}
                                        >
                                            <Star className={`w-6 h-6 ${formData.rating >= rating ? 'fill-current' : ''}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category Selection */}
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">What is your feedback about?</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {['Website Design', 'Product Quality', 'Customer Service', 'Checkout Process', 'Shipping', 'Other'].map((category) => (
                                        <label key={category} className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                className="peer sr-only"
                                                checked={formData.category === category}
                                                onChange={() => handleCategoryChange(category)}
                                            />
                                            <div className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl text-sm font-semibold text-slate-600 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:bg-slate-100 transition-all text-center">
                                                {category}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Your Comments</label>
                                <textarea
                                    name="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none resize-none"
                                    placeholder="Tell us more about your experience..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : (
                                    <>
                                        Submit Feedback
                                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Feedback;
