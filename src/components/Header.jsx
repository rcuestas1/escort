import React, { useState } from 'react';
import { Search, Menu, X, User, Heart, Globe } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { label: 'Home', href: '#', active: true },
    { label: 'Acompanhantes', href: '#' },
    { label: 'Cidades', href: '#' },
    { label: 'VIP', href: '#', isVip: true },
    { label: 'Blog', href: '#' },
    { label: 'Contato', href: '#' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gradient">Elite Companions</h1>
              <p className="text-xs text-muted-foreground">Luxury Directory</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  item.active
                    ? 'text-accent'
                    : 'text-foreground hover:text-accent'
                } ${
                  item.isVip
                    ? 'bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg border border-accent/30'
                    : ''
                }`}
              >
                {item.label}
                {item.active && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar acompanhantes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input pl-10 pr-4 py-2 w-64 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Globe className="w-5 h-5 text-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Heart className="w-5 h-5 text-foreground" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="luxury-button px-4 py-2 rounded-lg text-sm font-medium text-white">
                Login
              </button>
              <button className="hidden sm:block border border-accent text-accent px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                Cadastro
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar acompanhantes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input pl-10 pr-4 py-2 w-full rounded-lg focus:outline-none"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass-effect border-b border-white/10">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      item.active
                        ? 'bg-accent/20 text-accent'
                        : 'text-foreground hover:bg-white/10 hover:text-accent'
                    } ${
                      item.isVip
                        ? 'bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30'
                        : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

