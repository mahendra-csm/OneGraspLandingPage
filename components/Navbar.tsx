import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Career Counselling', href: '#services', badge: '+ Psychometric Test' },
    { name: 'Study Abroad', href: '#study', badge: 'Canada, USA, UK, France, Germany' },
    { name: 'Indian admissions', href: '#programs', badge: 'UG, PG, Doctorate' },
    { name: 'Certifications', href: '#skills', badge: '4000+ Certifications' },
    { name: 'Scientific Events', href: '#events', badge: 'Awards, Conferences, FDP\'s, Workshops' },
    { name: 'Startups', href: '#startups', badge: 'Validate your idea' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-3' : 'bg-transparent py-6'
        }`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex items-center group cursor-pointer">
            <img
              src="/logo.png"
              alt="OneGrasp Logo"
              className="h-8 sm:h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-10">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="text-[15px] font-bold text-gray-600 hover:text-blue-600 transition-all relative group flex items-center h-full py-2"
              >
                {link.name}

                {/* Standard Underline for all links */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>

                {/* Special Floating Badge for Service Links */}
                <AnimatePresence>
                  {hoveredIndex === index && link.badge && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: -25, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-gradient-to-r from-blue-600 to-teal-400 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg pointer-events-none z-50"
                    >
                      {link.badge}
                      {/* Little triangle arrow at bottom */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-teal-400 rotate-45"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            {/* Get Evaluated Button */}
            <button
              onClick={onOpenModal}
              className="bg-gradient-to-r from-indigo-600 to-teal-400 text-white px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-xl text-[13px] sm:text-[16px] font-extrabold hover:opacity-95 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              <span className="hidden sm:inline">Get Evaluated Free</span>
              <span className="sm:hidden">Get Started</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white shadow-2xl z-[60] xl:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <img src="/logo.png" alt="OneGrasp" className="h-8 w-auto" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-6">
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={handleLinkClick}
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl font-bold transition-all"
                    >
                      <div className="flex flex-col">
                        <span>{link.name}</span>
                        {link.badge && (
                          <span className="mt-1 text-[9px] text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full w-fit font-black uppercase tracking-wider">
                            {link.badge}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </nav>

              <div className="p-6 border-t border-gray-100">
                <button
                  onClick={() => {
                    onOpenModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-teal-400 text-white px-6 py-4 rounded-xl text-[15px] font-extrabold shadow-lg"
                >
                  Get Evaluated Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] xl:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;