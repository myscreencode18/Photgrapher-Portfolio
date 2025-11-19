import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* Hero Section with Portrait */}
      <section className="relative flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-20 gap-12">
        {/* Portrait */}
        <motion.img
          src="/photographer-main.jpg"
          alt="Photographer Portrait"
          className="w-full lg:w-1/2 h-[500px] object-cover grayscale rounded-2xl shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />

        {/* Asymmetrical Bio Text */}
        <motion.div
          className="lg:w-1/2 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl lg:text-5xl font-serif font-bold leading-tight">
            Capturing Stories Through Frames
          </h1>
          <p className="text-lg text-gray-700 font-sans leading-relaxed">
            I believe photography is not just about freezing time—it’s about
            telling stories that words often fail to capture. Every portrait,
            every shadow, every fleeting moment is a chapter in a visual diary.
          </p>
          <p className="text-lg text-gray-700 font-sans leading-relaxed">
            Influenced by the timeless play of light and human connection, I
            craft imagery that blends emotion and elegance. This journey began
            with curiosity and grew into a lifelong passion to translate stories
            into photographs.
          </p>
        </motion.div>
      </section>

      {/* Behind-the-Scenes Gallery */}
      <section className="px-6 lg:px-20 py-16 bg-gray-50">
        <h2 className="text-3xl font-serif font-bold mb-10 text-center">
          Behind the Lens
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["bts-1.jpg", "bts-2.jpg", "bts-3.jpg"].map((img, i) => (
            <motion.img
              key={i}
              src={`/${img}`}
              alt="Behind the scenes"
              className="w-full h-[300px] object-cover grayscale hover:grayscale-0 transition-all duration-500 rounded-xl shadow-md"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center bg-black text-white">
        <h3 className="text-2xl font-serif font-bold mb-6">
          Let’s Create Together
        </h3>
        <a
          href="/contact"
          className="inline-block px-8 py-4 border-2 border-white text-lg font-sans hover:bg-white hover:text-black transition-all rounded-full"
        >
          Get in Touch
        </a>
      </section>
    </div>
  );
}
