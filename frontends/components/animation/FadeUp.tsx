"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type FadeUpProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function FadeUp({ children, className, delay = 0, ...props }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
