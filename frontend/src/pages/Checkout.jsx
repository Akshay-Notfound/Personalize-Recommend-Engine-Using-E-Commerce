import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Truck, ShieldCheck } from 'lucide-react';

const Checkout = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success
        setLoading(false);
        clearCart();
        navigate('/order-success');
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-800 transition-all"
                    >
                        Continue Shopping
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-black text-slate-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Shipping Address */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Shipping Details</h2>
                            </div>

                            <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                                        placeholder="John"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                                        placeholder="Doe"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                                        placeholder="john@example.com"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                                        placeholder="123 Main St, Apt 4B"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                                        placeholder="New York"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">ZIP Code</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                                        placeholder="10001"
                                        onChange={handleChange}
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Payment Method</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                                        placeholder="0000 0000 0000 0000"
                                        maxLength="19"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Expiry Date</label>
                                    <input
                                        type="text"
                                        name="expDate"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">CVV</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                                        placeholder="123"
                                        maxLength="3"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-slate-500 text-sm">
                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                <span>Payments are secure and encrypted.</span>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 sticky top-24">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-20 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{item.title}</h3>
                                            <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                            <p className="text-sm font-medium text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-100 pt-4 space-y-2 mb-6">
                                <div className="flex justify-between text-slate-500">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-black text-slate-900 pt-2 border-t border-slate-100 mt-2">
                                    <span>Total</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={loading}
                                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>Processing...</>
                                ) : (
                                    <>Place Order</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Checkout;
