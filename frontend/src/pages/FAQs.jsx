import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border-b border-slate-100 last:border-0">
            <button
                className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-bold text-slate-900 text-lg">{question}</span>
                {isOpen ? <Minus className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-slate-400" />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                <p className="text-slate-600 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

const FAQs = () => {
    const faqs = [
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our support team to initiate a return."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for 1-2 business day delivery."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship to select countries worldwide. Shipping costs and delivery times vary by location."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order ships, you will receive a confirmation email with a tracking number to monitor your package's journey."
        },
        {
            question: "Is my payment information secure?",
            answer: "Absolutely. We use industry-standard encryption and secure payment gateways to ensure your personal and financial information is protected."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-black text-slate-900 mb-4">Frequently Asked Questions</h1>
                        <p className="text-slate-500">Find answers to common questions about our services.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8">
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} {...faq} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FAQs;
