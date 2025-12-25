import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const {
        cartItems,
        isCartOpen,
        toggleCart,
        updateQuantity,
        removeFromCart,
        totalPrice
    } = useCart();

    const navigate = useNavigate();

    // Prevent scrolling when cart is open
    React.useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={toggleCart}
            />

            {/* Drawer */}
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-slate-900" />
                        <h2 className="text-lg font-black uppercase tracking-wider text-slate-900">Your Bag</h2>
                        <span className="text-sm font-medium text-slate-500">({cartItems.length})</span>
                    </div>
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
                    >
                        <X className="w-5 h-5 text-slate-500 group-hover:text-slate-900" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <ShoppingBag className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Your bags are empty</h3>
                            <p className="text-sm text-slate-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                            <button
                                onClick={toggleCart}
                                className="px-6 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="w-24 h-32 flex-shrink-0 bg-slate-50 rounded-lg overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{item.title}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">${item.price}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-3 bg-slate-50 rounded-full px-3 py-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm hover:scale-105 transition-transform disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-3 h-3 text-slate-600" />
                                            </button>
                                            <span className="text-sm font-bold text-slate-900 w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-900 text-white shadow-sm hover:scale-105 transition-transform"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t border-slate-100 p-6 bg-white space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-slate-500">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-500">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex items-center justify-between text-lg font-black text-slate-900 pt-2 border-t border-slate-100">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                toggleCart();
                                navigate('/checkout');
                            }}
                            className="w-full py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
