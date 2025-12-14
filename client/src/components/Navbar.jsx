import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom"; 
import { Link } from "react-router-dom";
export default function Navbar() {
  const [open, setOpen] = useState(false);
const location = useLocation();


  const darkPages = ["/work", "/about"];
const isDarkPage = darkPages.includes(location.pathname);

  return (
    <header className="absolute top-0 right-0 p-6 z-30">
      {/* Hamburger Icon */}
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative"
      >
        
<Menu className={`w-8 h-8 cursor-pointer ${isDarkPage ? "text-black" : "text-white"}`} />

        {/* Slide-Out Menu */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute top-0 right-10 mt-2 flex flex-col space-y-4 text-lg bg-black/80 backdrop-blur-sm px-6 py-4 rounded-lg"
              style={{ fontFamily: "var(--font-heading)" }}
            >
             {["Work", "About", "Services", "Stories","Contact"].map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.1 }}
    className="text-white hover:text-[var(--color-accent)] transition"
  >
    <Link to={`/${item.toLowerCase()}`}>
      {item}
    </Link>
  </motion.div>
))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
