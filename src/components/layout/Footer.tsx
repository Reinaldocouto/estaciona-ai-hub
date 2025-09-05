
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui-custom/Logo';
import { Facebook, Instagram, Twitter, Linkedin, Mail, PhoneCall } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-12 pb-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Logo className="text-white mb-4" />
            <p className="text-gray-300 mb-4">
              Conectando motoristas a vagas de estacionamento. Encontre ou anuncie vagas de forma fácil e rápida.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/spaces" className="text-gray-300 hover:text-primary transition-colors">Encontrar Vagas</Link></li>
              <li><Link to="/how-it-works" className="text-gray-300 hover:text-primary transition-colors">Como Funciona</Link></li>
              <li><Link to="/rent-out-spot" className="text-gray-300 hover:text-primary transition-colors">Anuncie sua Vaga</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-300 hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">Contato</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-primary transition-colors">Termos de Uso</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-primary transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contato</h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-300">
                <Mail size={18} className="mr-2 text-primary" />
                rm94330@fiap.com.br
              </p>
              <p className="flex items-center text-gray-300">
                <PhoneCall size={18} className="mr-2 text-primary" />
                (11) 99538-4270
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} EstacionaAí. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
