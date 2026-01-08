// src/components/ui/WorkCard.tsx
import { motion } from 'framer-motion';

interface WorkCardProps {
    title: string;
    description: string;
    category: string;
    image?: string;
    href: string;
}

export default function WorkCard({
    title,
    description,
    category,
    image,
    href
}: WorkCardProps) {
    return (
        <motion.a
            href={href}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4 }}
            className="group block relative overflow-hidden bg-kg-surface border border-kg-border rounded-sm"
        >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden bg-kg-bg-alt">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-4xl text-kg-border tracking-widest">
                            {category.charAt(0)}
                        </span>
                    </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-kg-bg via-transparent to-transparent opacity-60" />
            </div>

            {/* Content */}
            <div className="p-6">
                <span className="inline-block font-display text-xs tracking-[0.2em] text-kg-accent mb-2">
                    {category}
                </span>
                <h3 className="font-serif text-xl text-kg-text group-hover:text-kg-accent transition-colors duration-300">
                    {title}
                </h3>
                <p className="mt-2 text-sm text-kg-text-muted line-clamp-2">
                    {description}
                </p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-2 text-kg-text-muted group-hover:text-kg-accent transition-colors duration-300">
                    <span className="text-xs font-display tracking-widest">VIEW</span>
                    <motion.span
                        className="inline-block"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                    >
                        →
                    </motion.span>
                </div>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 border border-kg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.a>
    );
}
