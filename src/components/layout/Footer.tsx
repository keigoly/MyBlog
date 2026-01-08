// src/components/layout/Footer.tsx
import { motion } from 'framer-motion';

const socialLinks = [
    { name: 'X', href: '#', icon: 'X' },
    { name: 'GitHub', href: '#', icon: 'GH' },
    { name: 'YouTube', href: '#', icon: 'YT' },
];

const footerLinks = [
    { name: 'TOP', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'WORKS', href: '/works' },
    { name: 'BLOG', href: '/blog' },
    { name: 'CONTACT', href: '/contact' },
];

export default function Footer() {
    return (
        <footer className="relative bg-kg-bg-alt border-t border-kg-border">
            {/* Decorative Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-kg-accent to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <a
                            href="/"
                            className="inline-block font-display text-3xl tracking-[0.3em] text-kg-text hover:text-kg-accent transition-colors duration-300"
                        >
                            KEIGOLY
                        </a>
                        <p className="mt-4 text-sm text-kg-text-muted font-serif">
                            Creating Digital Experiences
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-wrap justify-center gap-6">
                        {footerLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-display text-xs tracking-[0.2em] text-kg-text-muted hover:text-kg-accent transition-colors duration-300"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Social Links */}
                    <div className="flex justify-center md:justify-end gap-6">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 flex items-center justify-center border border-kg-border rounded-full text-kg-text-muted hover:text-kg-accent hover:border-kg-accent transition-colors duration-300 font-display text-xs"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-kg-border/50 text-center">
                    <p className="text-xs text-kg-text-muted font-display tracking-widest">
                        &copy; {new Date().getFullYear()} KEIGOLY. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
