import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
                    <h1 className="text-3xl font-black text-slate-900 mb-8">Privacy Policy</h1>

                    <div className="space-y-6 text-slate-600 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-3">1. Information We Collect</h2>
                            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, shipping address, and payment information.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-3">2. How We Use Your Information</h2>
                            <p>We use the information we collect to provide, maintain, and improve our services, process your transactions, and communicate with you about your orders and our products.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-3">3. Sharing of Information</h2>
                            <p>We do not share your personal information with third parties except as necessary to provide our services (e.g., shipping providers) or as required by law.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-3">4. Security</h2>
                            <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-3">5. Contact Us</h2>
                            <p>If you have any questions about this Privacy Policy, please contact us at support@eshop.com.</p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
