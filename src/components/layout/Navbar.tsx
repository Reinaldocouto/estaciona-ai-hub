
import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn, LogOut, Crown, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Logo from '@/components/ui-custom/Logo';
import AuthModal from '@/components/auth/AuthModal';
import PremiumBadge from '@/components/ui-custom/PremiumBadge';
import { useAuth } from '@/contexts/AuthContext';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const location = useLocation();
  const { user, isPremium, signOut } = useAuth();
  const { uploadAvatar, isUploading } = useAvatarUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSignOut = () => {
    signOut();
    closeMenu();
  };

  const handleAvatarClick = () => {
    if (isPremium) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadAvatar(file);
    }
  };

  const navLinks = [
    { name: 'Encontrar Vagas', path: '/spaces' },
    { name: 'Como Funciona', path: '/how-it-works' },
    { name: 'Premium', path: '/premium' },
    { name: 'Anuncie sua Vaga', path: '/rent-out-spot' },
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
              {user && !isPremium && (
                <Link to="/premium">
                  <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-8 text-yellow-600 border-yellow-300 hover:bg-yellow-50">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Button>
                </Link>
              )}
              {user ? (
                <div className="flex items-center space-x-3">
                  {isPremium ? (
                    // Premium User Interface
                    <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-yellow-400/20 via-yellow-500/20 to-yellow-600/20 border border-yellow-400/30 rounded-xl backdrop-blur-sm">
                      <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                        <Avatar className="w-10 h-10 ring-2 ring-yellow-400/50">
                          <AvatarImage src={user.user_metadata?.avatar_url} alt="Avatar" />
                          <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold">
                            {(user.user_metadata?.name || user.user_metadata?.display_name || user.email?.split('@')[0] || 'U').charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                        {isUploading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-yellow-700 font-medium">Bem-vindo,</span>
                        <span className="text-sm font-bold text-yellow-800">
                          {user.user_metadata?.name || user.user_metadata?.display_name || user.email?.split('@')[0] || 'Usuário'}
                        </span>
                      </div>
                      <PremiumBadge className="ml-1" />
                    </div>
                  ) : (
                    // Regular User Interface
                    <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                      <User className="w-4 h-4 text-primary" />
                      <div className="flex flex-col">
                        <span className="text-xs text-primary/70 font-medium">Bem-vindo,</span>
                        <span className="text-sm font-semibold text-primary">
                          {user.user_metadata?.name || user.user_metadata?.display_name || user.email?.split('@')[0] || 'Usuário'}
                        </span>
                      </div>
                    </div>
                  )}
                  <Button variant="outline" onClick={handleSignOut} size="sm">
                    <LogOut className="w-4 h-4 mr-1" /> Sair
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" onClick={openLoginModal} size="sm" className="flex items-center gap-1">
                    <LogIn className="w-4 h-4" /> Entrar
                  </Button>
                  <Button variant="default" onClick={openRegisterModal} size="sm" className="bg-primary hover:bg-primary-dark flex items-center gap-1">
                    <User className="w-4 h-4" /> Cadastrar
                  </Button>
                </>
              )}
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
                {user && !isPremium && (
                  <Link to="/premium" onClick={closeMenu}>
                    <Button variant="outline" className="justify-start w-full text-yellow-600 border-yellow-300 hover:bg-yellow-50">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade Premium
                    </Button>
                  </Link>
                )}
                {user ? (
                  <>
                    {isPremium ? (
                      // Premium User Interface - Mobile
                      <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-yellow-400/20 via-yellow-500/20 to-yellow-600/20 border border-yellow-400/30 rounded-xl backdrop-blur-sm">
                        <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                          <Avatar className="w-12 h-12 ring-2 ring-yellow-400/50">
                            <AvatarImage src={user.user_metadata?.avatar_url} alt="Avatar" />
                            <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold text-lg">
                              {(user.user_metadata?.name || user.user_metadata?.display_name || user.email?.split('@')[0] || 'U').charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-5 h-5 text-white" />
                          </div>
                          {isUploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1">
                          <span className="text-xs text-yellow-700 font-medium">Bem-vindo,</span>
                          <span className="text-sm font-bold text-yellow-800">
                            {user.user_metadata?.name || user.user_metadata?.display_name || user.email?.split('@')[0] || 'Usuário'}
                          </span>
                        </div>
                        <PremiumBadge />
                      </div>
                    ) : (
                      // Regular User Interface - Mobile
                      <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                        <User className="w-4 h-4 text-primary" />
                        <div className="flex flex-col">
                          <span className="text-xs text-primary/70 font-medium">Bem-vindo,</span>
                          <span className="text-sm font-semibold text-primary">
                            {user.user_metadata?.name || user.user_metadata?.display_name || user.email?.split('@')[0] || 'Usuário'}
                          </span>
                        </div>
                      </div>
                    )}
                    <Button variant="outline" onClick={handleSignOut} className="justify-start">
                      <LogOut className="w-4 h-4 mr-2" /> Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={openLoginModal} className="justify-start">
                      <LogIn className="w-4 h-4 mr-2" /> Entrar
                    </Button>
                    <Button variant="default" onClick={openRegisterModal} className="bg-primary justify-start">
                      <User className="w-4 h-4 mr-2" /> Cadastrar
                    </Button>
                  </>
                )}
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
      
      {/* Hidden file input for avatar upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};

export default Navbar;
