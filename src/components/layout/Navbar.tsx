
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui-custom/Logo';
import AuthModal from '@/components/auth/AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const openLoginModal = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
    closeMenu();
  };

  const openRegisterModal = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
    closeMenu();
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const navLinks = [
    { name: 'Encontrar Vagas', path: '/spaces' },
    { name: 'Como Funciona', path: '/how-it-works' },
    { name: 'Anuncie sua Vaga', path: '/host' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" onClick={openLoginModal} size="sm" className="flex items-center gap-1">
                <LogIn className="w-4 h-4" /> Entrar
              </Button>
              <Button variant="default" onClick={openRegisterModal} size="sm" className="bg-primary hover:bg-primary-dark flex items-center gap-1">
                <User className="w-4 h-4" /> Cadastrar
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-secondary hover:text-primary"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <nav className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(link.path)
                      ? 'bg-primary text-white'
                      : 'text-secondary hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <Button variant="outline" onClick={openLoginModal} className="justify-start">
                  <LogIn className="w-4 h-4 mr-2" /> Entrar
                </Button>
                <Button variant="default" onClick={openRegisterModal} className="bg-primary justify-start">
                  <User className="w-4 h-4 mr-2" /> Cadastrar
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        mode={authModalMode} 
        setMode={setAuthModalMode} 
      />
    </>
  );
};

export default Navbar;
