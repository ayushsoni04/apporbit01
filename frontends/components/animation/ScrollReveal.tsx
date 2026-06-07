"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 36,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{
        duration: 0.65,
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
