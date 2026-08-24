import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WHATSAPP_URL } from '../data/wellnessData';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenBooking: (focusArea?: string) => void;
  onOpenStory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenStory }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Treatment', href: '#approach' },
    { label: 'Blog', href: '#biomarkers' },
    { label: 'About us', href: '#about' }, // Correctly points to <section id="about">
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F6]/85 backdrop-blur-md border-b border-purple-100/60 shadow-xs py-3.5'
            : 'bg-transparent py-6'
        }`}
        id="main-navbar"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Identity Logo */}
          <a
            href="#"
            className="flex items-center group cursor-pointer"
            id="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Aora Mental Wellness Home"
          >
            <BrandLogo variant="dark" size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:0735773392"
              className="text-xs font-semibold text-gray-700 hover:text-purple-900 px-3 py-2 transition-colors flex items-center gap-1.5"
              title="Call Anyango Omondi - 0735 773392"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>0735 773392</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking('General Intake')}
              className="border border-[#1A1A1A]/30 hover:border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-xs"
              id="nav-contact-btn"
            >
              Book Session
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-gray-700 hover:bg-purple-100/50 transition-colors"
            aria-label="Toggle Navigation Menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#FAF9F6] border-b border-purple-100 shadow-xl p-6 md:hidden backdrop-blur-xl"
            id="mobile-drawer"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-lg font-medium text-gray-800 hover:text-purple-700 py-2 border-b border-gray-100 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenStory();
                  }}
                  className="w-full text-center py-3 rounded-full text-sm font-semibold bg-purple-50 text-purple-800 hover:bg-purple-100 transition-colors"
                >
                  Watch Our Story
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-full rounded-full py-3.5 px-6 pl-4 gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md whitespace-nowrap cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">Chat on WhatsApp (0735 773392)</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="flex items-center justify-center w-full rounded-full py-3.5 px-6 text-sm font-semibold bg-[#A78BFA] text-white hover:bg-[#906fe9] transition-all shadow-md cursor-pointer whitespace-nowrap"
                >
                  Book Session with Anyango
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
