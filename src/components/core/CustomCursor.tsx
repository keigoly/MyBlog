// src/components/core/CustomCursor.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // アニメーション用

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // モバイル端末判定 (タッチデバイスならカーソルを表示しない)
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    // マウス移動イベント
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    // ホバー判定 (リンクやボタンの上に乗ったか)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    // OS標準カーソルを消す
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto'; // クリーンアップ時に戻す
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
      animate={{
        x: position.x - (isHovering ? 20 : 8), // 中心座標の調整
        y: position.y - (isHovering ? 20 : 8),
        scale: isHovering ? 2.5 : 1,            // ホバー時に拡大
        opacity: 1
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    >
      {/* カーソルの形状 (白い円) */}
      <div className={`rounded-full bg-monolith-text transition-all duration-300 ${isHovering ? 'w-4 h-4 opacity-50' : 'w-4 h-4'}`} />
    </motion.div>
  );
}