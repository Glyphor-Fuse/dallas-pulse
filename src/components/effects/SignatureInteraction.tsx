import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useReducedMotion } from '../motion/useReducedMotion';

interface SignatureInteractionProps {
  type: 'text-reveal' | 'clip-reveal' | 'parallax' | 'marquee' | 'sticky-progress' | 'hover';
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export const SignatureInteraction: React.FC<SignatureInteractionProps> = ({ type, children, className = '', speed = 0.1 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  if (type === 'text-reveal') {
    return (
      <div className={`overflow-hidden ${className}`}>
        <motion.div
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  if (type === 'clip-reveal') {
    return (
      <motion.div
        initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
        whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (type === 'parallax') {
    // We use a transform based on scroll progress relative to the viewport
    // Mapping 0-1 progress to a translate Y value
    const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed * 10]);
    
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <motion.div style={{ y: shouldReduceMotion ? 0 : y, scale: 1.1 }}>
          {children}
        </motion.div>
      </div>
    );
  }

  if (type === 'hover') {
    return (
      <motion.div
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={className}>{children}</div>;
};
