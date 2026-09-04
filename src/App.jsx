import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { NotFound } from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { ROUTES } from './constants/routes';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, search]);
  return null;
}

export function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[#fafafa] text-zinc-950 font-sans selection:bg-zinc-950 selection:text-white">
            <AnnouncementBar />
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.SHOP} element={<Shop />} />
                <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path={ROUTES.CART} element={<Cart />} />
                <Route path={ROUTES.WISHLIST} element={<Wishlist />} />
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}

export default App;
