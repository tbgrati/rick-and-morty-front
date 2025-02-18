import { motion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useRef } from "react";

export const AnimationWrapper = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  if (location.pathname !== prevPathRef.current) {
    prevPathRef.current = location.pathname;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
};
