import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [hideIndicator, setHideIndicator] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setHideIndicator(true);
      else setHideIndicator(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-start overflow-hidden"
    >
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        {/* If you want video, replace <img> with <video> */}
        <img
          src="/hero-bg.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Photographer Name / Branding */}
      <motion.h1
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        John Doe
      </motion.h1>

      {/* Scroll Indicator */}
      {/* {!hideIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center"
        >
          <p
            className="scroll-indicator"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Explore
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xl text-gray-300"
          >
            ↓
          </motion.div>
        </motion.div>
      )} */}
    </section>
  );
}
