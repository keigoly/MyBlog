// src/components/layout/Header.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'TOP', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'WORKS', href: '/works' },
  { name: 'BLOG', href: '/blog' },
  { name: 'CONTACT', href: '/contact' },
];

const socialLinks = [
  {
    name: 'X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'JP' | 'EN'>('JP');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-3' : 'bg-transparent py-4'
          }`}
      >
        <div className="w-full px-6 lg:px-10 flex items-center justify-between">
          {/* Logo - 左端 */}
          <a
            href="/"
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <img src="/logo.png" alt="KEIGOLY" className="h-6 lg:h-8" />
          </a>

          {/* Right Side - Navigation + Social + Language */}
          <div className="hidden md:flex items-center">
            {/* Desktop Navigation */}
            <nav className="flex items-center">
              {navItems.map((item, index) => (
                <div key={item.name} className="flex items-center">
                  {index > 0 && (
                    <span className="text-kg-text-muted mx-3 text-xs">|</span>
                  )}
                  <a
                    href={item.href}
                    className="font-sans text-xs tracking-[0.15em] text-kg-text-muted hover:text-kg-accent transition-colors duration-300 uppercase"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </nav>

            {/* Divider */}
            <span className="text-kg-text-muted mx-4 text-xs">|</span>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-kg-text-muted hover:text-kg-accent transition-colors duration-300 text-sm"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Divider */}
            <span className="text-kg-text-muted mx-4 text-xs">|</span>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 text-xs tracking-wider">
              <button
                onClick={() => setCurrentLang('JP')}
                className={`transition-colors duration-300 ${currentLang === 'JP' ? 'text-kg-accent' : 'text-kg-text-muted hover:text-kg-text'}`}
              >
                JP
              </button>
              <span className="text-kg-text-muted">/</span>
              <button
                onClick={() => setCurrentLang('EN')}
                className={`transition-colors duration-300 ${currentLang === 'EN' ? 'text-kg-accent' : 'text-kg-text-muted hover:text-kg-text'}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-kg-text block"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-px bg-kg-text block"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-kg-text block"
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-kg-bg/95 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-xl tracking-[0.2em] text-kg-text hover:text-kg-accent transition-colors duration-300 uppercase"
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Mobile Social Links */}
              <div className="flex items-center gap-6 mt-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-kg-text-muted hover:text-kg-accent transition-colors duration-300 text-lg"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-3 mt-4 text-sm tracking-wider">
                <button
                  onClick={() => setCurrentLang('JP')}
                  className={`transition-colors duration-300 ${currentLang === 'JP' ? 'text-kg-accent' : 'text-kg-text-muted'}`}
                >
                  JP
                </button>
                <span className="text-kg-text-muted">/</span>
                <button
                  onClick={() => setCurrentLang('EN')}
                  className={`transition-colors duration-300 ${currentLang === 'EN' ? 'text-kg-accent' : 'text-kg-text-muted'}`}
                >
                  EN
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
