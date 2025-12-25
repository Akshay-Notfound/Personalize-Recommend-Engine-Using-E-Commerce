import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <div className="bg-slate-900 text-white py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Get in Touch</h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            We'd love to hear from you. Whether you have a question about our products, orders, or just want to share your thoughts.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Info Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                                    <Mail className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Email Us</h3>
                                <p className="text-slate-500 mb-4 text-sm">Our friendly team is here to help.</p>
                                <a href="mailto:support@eshop.com" className="text-blue-600 font-semibold hover:text-blue-700">support@eshop.com</a>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Visit Us</h3>
                                <p className="text-slate-500 mb-4 text-sm">Come say hello at our office HQ.</p>
                                <p className="text-slate-900 font-medium">123 Fashion Street,<br />Design District, NY 10001</p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                                    <Phone className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Call Us</h3>
                                <p className="text-slate-500 mb-4 text-sm">Mon-Fri from 8am to 5pm.</p>
                                <a href="tel:+15551234567" className="text-blue-600 font-semibold hover:text-blue-700">+1 (555) 123-4567</a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 md:p-12 h-full">
                                <h2 className="text-2xl font-black text-slate-900 mb-8">Send us a message</h2>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">First Name</label>
                                            <input type="text" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Last Name</label>
                                            <input type="text" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none" placeholder="Doe" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Email</label>
                                        <input type="email" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none" placeholder="john@example.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Message</label>
                                        <textarea rows="6" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none resize-none" placeholder="How can we help you?"></textarea>
                                    </div>

                                    <button className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
                                        Send Message
                                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
