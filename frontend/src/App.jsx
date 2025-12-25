import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import { WishlistProvider } from './context/WishlistContext';
import Wishlist from './pages/Wishlist';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FAQs from './pages/FAQs';
import ShippingInfo from './pages/ShippingInfo';

function App() {
    const isAuthenticated = !!localStorage.getItem('userId');

    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/product/:id" element={<ProductDetails />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/feedback" element={<Feedback />} />
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/order-success" element={<OrderSuccess />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/terms" element={<TermsOfService />} />
                            <Route path="/faq" element={<FAQs />} />
                            <Route path="/shipping" element={<ShippingInfo />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                        <CartDrawer />
                    </BrowserRouter>
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    )
}

export default App
