import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 font-black text-xs group-hover:scale-110 transition-transform duration-500">
                                E
                            </div>
                            <span className="text-2xl font-black text-white tracking-tighter">
                                E-SHOP<span className="text-blue-400">.</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Premium personalized shopping experience curated just for you. Discover trends that match your style.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm">Home</Link></li>
                            <li><Link to="/products" className="text-slate-400 hover:text-white transition-colors text-sm">Shop All</Link></li>
                            <li><Link to="/categories" className="text-slate-400 hover:text-white transition-colors text-sm">Categories</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors text-sm">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6">Support</h3>
                        <ul className="space-y-4">
                            <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
                            <li><Link to="/feedback" className="text-slate-400 hover:text-white transition-colors text-sm">Feedback</Link></li>
                            <li><Link to="/faq" className="text-slate-400 hover:text-white transition-colors text-sm">FAQs</Link></li>
                            <li><Link to="/shipping" className="text-slate-400 hover:text-white transition-colors text-sm">Shipping Info</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6">Get in Touch</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-400 text-sm">
                                <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                                <span>Vishnupuri, Nanded, Maharashtra 431606</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                                <span>support@eshop.com</span>
                            </li>
                        </ul>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-400 hover:text-white transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © 2025 E-SHOP. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="text-slate-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-slate-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
