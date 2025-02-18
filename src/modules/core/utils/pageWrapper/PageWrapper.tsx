import { motion } from "framer-motion";
import { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0, visibility: "visible" }}
      exit={{ opacity: 0, x: 100, visibility: "hidden" }}
      transition={{ duration: 0.3 }}
      style={{ position: "relative" }}
    >
      {children}
    </motion.div>
  );
};
