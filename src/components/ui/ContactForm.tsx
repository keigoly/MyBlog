// src/components/ui/ContactForm.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
            >
                <div className="w-16 h-16 mx-auto mb-6 border-2 border-kg-accent rounded-full flex items-center justify-center">
                    <span className="text-kg-accent text-2xl">✓</span>
                </div>
                <h3 className="font-display text-2xl tracking-[0.2em] text-kg-text mb-4">
                    THANK YOU
                </h3>
                <p className="text-kg-text-muted font-serif">
                    お問い合わせありがとうございます。<br />
                    内容を確認の上、ご連絡いたします。
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="group">
                <label
                    htmlFor="name"
                    className="block text-xs font-display tracking-[0.2em] text-kg-text-muted mb-2 group-focus-within:text-kg-accent transition-colors"
                >
                    NAME
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-kg-surface border border-kg-border text-kg-text font-serif focus:border-kg-accent focus:outline-none transition-colors"
                    placeholder="お名前"
                />
            </div>

            {/* Email */}
            <div className="group">
                <label
                    htmlFor="email"
                    className="block text-xs font-display tracking-[0.2em] text-kg-text-muted mb-2 group-focus-within:text-kg-accent transition-colors"
                >
                    EMAIL
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-kg-surface border border-kg-border text-kg-text font-serif focus:border-kg-accent focus:outline-none transition-colors"
                    placeholder="your@email.com"
                />
            </div>

            {/* Subject */}
            <div className="group">
                <label
                    htmlFor="subject"
                    className="block text-xs font-display tracking-[0.2em] text-kg-text-muted mb-2 group-focus-within:text-kg-accent transition-colors"
                >
                    SUBJECT
                </label>
                <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-kg-surface border border-kg-border text-kg-text font-serif focus:border-kg-accent focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                    <option value="">お問い合わせ種別を選択</option>
                    <option value="project">プロジェクトのご相談</option>
                    <option value="collaboration">コラボレーション</option>
                    <option value="general">一般的なお問い合わせ</option>
                    <option value="other">その他</option>
                </select>
            </div>

            {/* Message */}
            <div className="group">
                <label
                    htmlFor="message"
                    className="block text-xs font-display tracking-[0.2em] text-kg-text-muted mb-2 group-focus-within:text-kg-accent transition-colors"
                >
                    MESSAGE
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-kg-surface border border-kg-border text-kg-text font-serif focus:border-kg-accent focus:outline-none transition-colors resize-none"
                    placeholder="お問い合わせ内容をご記入ください"
                />
            </div>

            {/* Submit */}
            <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-kg-accent text-kg-bg font-display text-sm tracking-[0.2em] hover:bg-kg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </motion.button>
        </form>
    );
}
