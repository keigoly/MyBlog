// src/components/ui/SectionTitle.tsx
import { motion } from 'framer-motion';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
}

export default function SectionTitle({
    title,
    subtitle,
    align = 'center'
}: SectionTitleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
        >
            <h2 className="font-display text-3xl md:text-4xl tracking-[0.3em] text-kg-text">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-4 text-sm text-kg-text-muted font-serif tracking-wider">
                    {subtitle}
                </p>
            )}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`mt-6 h-px bg-gradient-to-r from-transparent via-kg-accent to-transparent ${align === 'center' ? 'w-24 mx-auto' : 'w-16'
                    }`}
            />
        </motion.div>
    );
}
