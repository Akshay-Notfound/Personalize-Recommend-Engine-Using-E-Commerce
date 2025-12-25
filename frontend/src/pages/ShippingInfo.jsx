import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Truck, Clock, Globe } from 'lucide-react';

const ShippingInfo = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-black text-slate-900 mb-4">Shipping Information</h1>
                        <p className="text-slate-500">Everything you need to know about our delivery services.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3 mb-12">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Standard Shipping</h3>
                            <p className="text-slate-500 text-sm">3-5 Business Days</p>
                            <p className="text-slate-900 font-bold mt-2">Free over $50</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Express Delivery</h3>
                            <p className="text-slate-500 text-sm">1-2 Business Days</p>
                            <p className="text-slate-900 font-bold mt-2">$15.00 Flat Rate</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">International</h3>
                            <p className="text-slate-500 text-sm">7-14 Business Days</p>
                            <p className="text-slate-900 font-bold mt-2">Calculated at Checkout</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Delivery Policy</h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>
                                Orders are processed and shipped within 24 hours of purchase on business days. Orders placed on weekends or holidays will be processed on the next business day.
                            </p>
                            <p>
                                You will receive a shipping confirmation email with tracking information once your order has left our facility.
                            </p>
                            <p>
                                Please note that we are not responsible for lost or stolen packages once they have been marked as delivered by the carrier.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ShippingInfo;
