import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        // Generate a random order ID
        const randomId = Math.floor(100000 + Math.random() * 900000);
        setOrderId(`#ORD-${randomId}`);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 text-center max-w-lg w-full">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>

                    <h1 className="text-3xl font-black text-slate-900 mb-2">Order Confirmed!</h1>
                    <p className="text-slate-500 mb-6">
                        Thank you for your purchase. Your order has been received and is being processed.
                    </p>

                    <div className="bg-slate-50 rounded-xl p-4 mb-8">
                        <p className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-1">Order ID</p>
                        <p className="text-xl font-black text-slate-900">{orderId}</p>
                    </div>

                    <p className="text-sm text-slate-400 mb-8">
                        A confirmation email has been sent to your email address.
                    </p>

                    <button
                        onClick={() => navigate('/products')}
                        className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Continue Shopping
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrderSuccess;
