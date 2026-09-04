import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { NAV_LINKS } from '../../constants/navigation';
import logoImg from '../../../public/logo.jpg';  

export function Navbar() {
  const { totalCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-6">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 text-zinc-950 font-black text-xl tracking-tighter shrink-0">
            <div className="w-8 h-10 bg-zinc-950 text-white flex items-center justify-center rounded font-extrabold text-sm">
              
              <img 
              src={logoImg} 
              alt="Logo" 
              className="h-10 sm:h-12 w-auto max-w-[160px] object-contain block bg-transparent"
            />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-lg tracking-tight">PIXEL-PERFECT-SHOP</span>
              <span className="text-[9px] tracking-[0.2em] text-zinc-400 font-semibold uppercase mt-0.5">NEW-Edition</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {NAV_LINKS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `py-1 relative transition-colors ${isActive ? 'text-zinc-950 font-semibold after:absolute after:bottom-0 after:inset-x-0 after:h-[2px] after:bg-zinc-950' : 'text-zinc-600 hover:text-zinc-950'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center bg-zinc-50 rounded-lg px-3 py-1.5 border border-zinc-300 w-44 sm:w-60">
                <Search className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog..."
                  autoFocus
                  className="w-full bg-transparent text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none"
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="text-zinc-400 hover:text-zinc-700 ml-1">
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors" aria-label="Search">
                <Search className="w-4 h-4" />
              </button>
            )}

            <Link to="/wishlist" className="relative p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors" aria-label="Wishlist">
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-zinc-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="flex items-center gap-2 px-3.5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag ({totalCount})</span>
            </Link>

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-zinc-700 hover:text-zinc-950 rounded-md hover:bg-zinc-100" aria-label="Menu">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-5 py-4 space-y-3">
          <form onSubmit={handleSearch} className="flex items-center bg-zinc-100 rounded-lg px-3 py-2 border border-zinc-200">
            <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collection..."
              className="w-full bg-transparent text-sm text-zinc-900 focus:outline-none"
            />
          </form>
          <div className="divide-y divide-zinc-100">
            {NAV_LINKS.map(({ label, path }) => (
              <Link key={path} to={path} className="block py-2.5 text-sm font-medium text-zinc-800 hover:text-zinc-950">
                {label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-zinc-200 flex items-center justify-between text-xs">
            <Link to="/wishlist" className="flex items-center gap-1.5 font-medium text-zinc-700">
              <Heart className="w-3.5 h-3.5" /> Saved ({wishlistCount})
            </Link>
            <Link to="/cart" className="flex items-center gap-1.5 font-semibold text-zinc-900">
              <ShoppingBag className="w-3.5 h-3.5" /> View Bag ({totalCount})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
