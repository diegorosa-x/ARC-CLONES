
import React from 'react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  cartCount: number;
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onSearch, onCategorySelect, onOpenCart }) => {
  return (
    <header className="sticky top-0 z-50 bg-brand-bg border-b border-brand-muted transition-colors duration-300">
      <div className="bg-brand-gold text-brand-bg text-[10px] uppercase tracking-[0.2em] py-2 text-center font-bold">
        FRETE GRÁTIS PARA TODO BRASIL | CLONES COM MAQUINÁRIO SUIÇO
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onCategorySelect('All')}>
            <span className="text-2xl font-brand font-bold tracking-tighter text-brand-gold">
              ARC<span className="text-slate-900 dark:text-white transition-colors">CLONES</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-10 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">
            {['Watches', 'Handbags', 'Sunglasses', 'Jewelry'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => onCategorySelect(cat)}
                className="hover:text-brand-gold border-b-2 border-transparent hover:border-brand-gold transition-all py-1"
              >
                {cat === 'Watches' ? 'Relógios' : cat === 'Handbags' ? 'Bolsas' : cat === 'Sunglasses' ? 'Óculos' : 'Joias'}
              </button>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block w-64">
              <input
                type="text"
                placeholder="BUSCAR MODELOS..."
                className="w-full bg-brand-muted border-none rounded-sm py-2 px-4 pl-10 text-[11px] text-slate-900 dark:text-white placeholder-slate-500 focus:ring-1 focus:ring-brand-gold uppercase tracking-widest transition-colors"
                onChange={(e) => onSearch(e.target.value)}
              />
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-2.5 text-slate-500 text-xs"></i>
            </div>
            
            <ThemeToggle />
            
            <button className="text-slate-500 dark:text-slate-400 hover:text-brand-gold transition-colors p-2">
              <i className="fa-regular fa-user text-lg"></i>
            </button>
            <button 
              className="relative text-slate-500 dark:text-slate-400 hover:text-brand-gold transition-colors p-2"
              onClick={onOpenCart}
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-bg text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
