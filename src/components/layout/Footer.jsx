import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { VALUE_PROPOSITIONS } from '../../constants/navigation';

const COLLECTIONS = [
  { label: 'All Products', path: '/shop' },
  { label: 'Electronics', path: '/shop?category=electronics' },
  { label: "Men's Apparel", path: "/shop?category=men's clothing" },
  { label: "Women's Apparel", path: "/shop?category=women's clothing" },
  { label: 'Fine Jewelry', path: '/shop?category=jewelery' },
];

const ASSISTANCE = [
  { label: 'Shopping Bag', path: '/cart' },
  { label: 'Saved Items', path: '/wishlist' },
  { label: 'Express Delivery Guide' },
  { label: 'Returns & Exchanges' },
  { label: 'Warranty Policy' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast({ title: 'Invalid Email', message: 'Please enter a valid email address.', type: 'error' });
      return;
    }
    setSubscribed(true);
    addToast({ title: 'Subscribed', message: 'Your 15% promotional code is: NEXUS15', type: 'success' });
    setEmail('');
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-16 pb-12 border-t border-zinc-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Propositions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b border-zinc-900">
          {VALUE_PROPOSITIONS.map(({ title, description }, idx) => (
            <div key={idx} className="space-y-1">
              <h4 className="text-zinc-100 font-semibold text-sm tracking-tight">{title}</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">
          {/* Brand & Newsletter */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.jpg" 
                alt="Brand Logo" 
                className="h-8 sm:h-10 w-auto max-w-[140px] object-contain block bg-transparent" 
              />
              <span className="text-lg font-extrabold text-white tracking-tight">PIXEL-SHOP</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Curated everyday apparel, modern electronics, and artisanal jewelry. Built for timeless aesthetics and uncompromised quality.
            </p>
            <form onSubmit={handleSubscribe} className="pt-2 max-w-sm">
              <label htmlFor="newsletter-email" className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Join the Private List
              </label>
              <div className="flex">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-l-md text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
                <button type="submit" className="bg-white text-zinc-950 hover:bg-zinc-200 px-4 py-2.5 rounded-r-md font-semibold text-xs tracking-wide shrink-0 transition-colors">
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : 'Join'}
                </button>
              </div>
            </form>
          </div>

          {/* Collection */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-semibold uppercase tracking-wider text-zinc-200 text-[11px]">Collection</h5>
            <ul className="space-y-2 text-zinc-400">
              {COLLECTIONS.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Assistance */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-semibold uppercase tracking-wider text-zinc-200 text-[11px]">Assistance</h5>
            <ul className="space-y-2 text-zinc-400">
              {ASSISTANCE.map(({ label, path }) => (
                <li key={label}>
                  {path ? <Link to={path} className="hover:text-white transition-colors">{label}</Link> : <span className="text-zinc-500">{label}</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* Security & Badges */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-semibold uppercase tracking-wider text-zinc-200 text-[11px]">Security & Guarantee</h5>
            <p className="text-zinc-400 text-xs leading-relaxed">
              All transactions are secured with 256-bit encryption. Merchandise is authenticated and handled via climate-controlled fulfillment centers.
            </p>
            <div className="pt-2 flex items-center gap-2 text-zinc-400 text-[11px]">
              {['VISA', 'MC', 'AMEX', 'APPLE PAY'].map((p) => (
                <span key={p} className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">{p}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} PIXEL PERFECT Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;