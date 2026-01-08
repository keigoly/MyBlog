// src/components/sections/Hero.tsx
import { motion } from 'framer-motion';

interface HeroProps {
    title?: string;
    subtitle?: string;
    showScroll?: boolean;
}

export default function Hero({
    title = "KEIGOLY",
    subtitle = "Creating Digital Experiences",
    showScroll = true
}: HeroProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-kg-bg via-kg-bg to-kg-bg-alt" />

            {/* Animated Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-kg-accent/5 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 80, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-kg-accent/5 rounded-full blur-[100px]"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.4em] text-kg-text pl-4">
                        {title}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-8"
                >
                    <p className="text-sm md:text-base text-kg-text-muted font-serif tracking-[0.3em]">
                        {subtitle}
                    </p>
                </motion.div>

                {/* Decorative Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                    className="mt-12 mx-auto w-px h-24 bg-gradient-to-b from-kg-accent to-transparent"
                />
            </div>

            {/* Scroll Indicator */}
            {showScroll && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-xs font-display tracking-[0.3em] text-kg-text-muted">SCROLL</span>
                        <div className="w-px h-8 bg-gradient-to-b from-kg-text-muted to-transparent" />
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}
