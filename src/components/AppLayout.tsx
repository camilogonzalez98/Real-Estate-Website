import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Partners from './Partners';
import Services from './Services';
import PropertyForm from './PropertyForm';
import FAQ from './FAQ';
import Contact from './Contact';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGetCashOffer = () => {
    // Scroll to property form section
    const propertyForm = document.getElementById('property-form');
    if (propertyForm) {
      propertyForm.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onMenuClick={handleMenuClick} isMenuOpen={isMenuOpen} />
      
      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4">
          <nav className="space-y-4">
            <a href="#home" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>How it Works</a>
            <a href="#partners" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Partners</a>
            <a href="#services" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#faq" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            <a href="#contact" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </nav>
        </div>
      )}

      <main>
        <Hero onGetCashOffer={handleGetCashOffer} />
        <HowItWorks />
        <Partners />
        <Services />
        <PropertyForm />
        <FAQ />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default AppLayout;