import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfService = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
                    <h1 className="text-3xl font-black text-slate-900 mb-8">Terms of Service</h1>

                    <div className="space-y-6 text-slate-600 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-3">1. Acceptance of Terms</h2>
                            <p>By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-3">2. Use License</h2>
                            <p>Permission is granted to temporarily download one copy of the materials (information or software) on E-SHOP's website for personal, non-commercial transitory viewing only.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-3">3. Disclaimer</h2>
                            <p>The materials on E-SHOP's website are provided on an 'as is' basis. E-SHOP makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-3">4. Limitations</h2>
                            <p>In no event shall E-SHOP or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on E-SHOP's website.</p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
