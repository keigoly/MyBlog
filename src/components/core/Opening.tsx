// src/components/core/Opening.tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Opening() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // セッションストレージを確認（既に訪問済みか？）
    const hasVisited = sessionStorage.getItem('monolith-visited');

    if (hasVisited) {
      setIsVisible(false); // 訪問済みなら表示しない
    } else {
      // 初回訪問時: 2.5秒後にフェードアウトし、訪問済みフラグを立てる
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('monolith-visited', 'true');
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-monolith-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }} // ゆっくり消える
        >
          {/* ロゴのアニメーション */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-center space-y-4"
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-[0.3em] text-monolith-text pl-2">
              MONOLITH
            </h1>
            <div className="h-px w-12 bg-monolith-accent/50" />
            <p className="font-serif text-xs md:text-sm text-monolith-sub tracking-widest opacity-80">
              Reading is a ritual.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}