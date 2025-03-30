
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type ScrollRevealWrapperProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
  threshold?: number;
};

const ScrollRevealWrapper = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true,
  threshold = 0.1,
}: ScrollRevealWrapperProps) => {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold,
  });

  const getDirectionVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "down":
        return {
          hidden: { y: -50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "left":
        return {
          hidden: { x: 50, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case "right":
        return {
          hidden: { x: -50, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case "none":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      default:
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
    }
  };

  const variants = getDirectionVariants();

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollRevealWrapper;
