import { m, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface AnimateInViewProps {
  children: React.ReactNode;
  variant: {
    hidden: object;
    visible: object;
    exit?: object;
  };
}

const AnimateInView = ({ children, variant }: AnimateInViewProps) => {
  const { ref, inView } = useInView({
    initialInView: false,
    // threshold:
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
    if (!inView) controls.start("hidden");
  }, [controls, inView]);
  return (
    <m.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={controls}
      exit="exit"
    >
      {children}
    </m.div>
  );
};

export default AnimateInView;
