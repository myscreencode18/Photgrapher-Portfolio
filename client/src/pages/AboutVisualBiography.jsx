import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutVisualBiography({
  portrait = { src: "", alt: "" },
  mission = "Capturing stories beyond the frame.",
  bio = ["This is where the photographer's biography goes."],
  gallery = [],
  contactHref = "#",
  signature = null,
  className = "",
}) {
  return (
    <main
      className={`bg-black text-white font-sans ${className}`}
      aria-label="About the Photographer"
    >
      {/* Hero: Portrait + Mission */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24 grid grid-cols-12 gap-6 items-stretch">
        {/* Portrait */}
        {portrait?.src && (
          <motion.figure
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            className="col-span-12 md:col-span-7 lg:col-span-8 relative"
          >
            <img
              src={portrait.src}
              alt={portrait.alt || "Portrait of the photographer"}
              className="w-full h-[60vh] md:h-[72vh] object-cover rounded-2xl grayscale contrast-125 brightness-95 shadow-2xl"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
          </motion.figure>
        )}

        {/* Mission Statement */}
        <motion.aside
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="col-span-12 md:col-span-5 lg:col-span-4 -mt-10 md:mt-16 lg:-mt-8"
        >
          <div className="relative bg-white text-black rounded-2xl shadow-xl p-6 md:p-8 lg:p-10">
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight">
              {`“${mission}”`}
            </blockquote>
            <div className="mt-4 text-xs uppercase tracking-widest text-neutral-600">
              Artist's Philosophy
            </div>
          </div>
        </motion.aside>
      </section>

      {/* Biography Section */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-14">
        <motion.header
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-6"
        >
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-none">
            A Visual Biography
          </h2>
        </motion.header>

        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
          <div className="md:col-span-4 md:pt-2">
            <div className="text-sm text-neutral-400">Behind the lens</div>
          </div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="md:col-span-8 space-y-5 text-neutral-200"
          >
            {bio.map((p, i) => (
              <p key={i} className="text-base md:text-lg leading-relaxed">
                {p}
              </p>
            ))}

            {signature && signature.src && (
              <div className="pt-4">
                <img
                  src={signature.src}
                  alt={signature.alt || "Signature"}
                  className="h-10 opacity-70 invert"
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-16">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-center justify-between mb-6"
          >
            <h3 className="font-serif text-2xl md:text-3xl">Behind the Scenes</h3>
            <div className="text-xs uppercase tracking-widest text-neutral-500">
              Contact Sheet
            </div>
          </motion.div>

          <div className="relative">
            <div
              className="overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none]"
              role="region"
              aria-label="Behind the scenes gallery"
            >
              <ul className="flex gap-4 md:gap-6 snap-x snap-mandatory pr-6">
                {gallery.map((img, i) => (
                  <li
                    key={i}
                    className="min-w-[70%] sm:min-w-[45%] md:min-w-[33%] lg:min-w-[28%] snap-start"
                  >
                    <figure className="relative">
                      <img
                        src={img.src}
                        alt={img.alt || `Behind the scenes ${i + 1}`}
                        className="w-full h-64 md:h-80 object-cover rounded-xl grayscale contrast-125 brightness-95 hover:brightness-100 transition duration-300 shadow-lg"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="bg-white text-black rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl"
        >
          <div>
            <h4 className="font-serif text-2xl md:text-3xl tracking-tight">
              Let’s Create Together
            </h4>
            <p className="text-neutral-700 mt-2 max-w-xl">
              Have a story that deserves to be told in frames? I’m currently booking editorial, portrait, and documentary assignments.
            </p>
          </div>
          <a
            href={contactHref}
            aria-label="Go to contact page"
            className="inline-flex items-center justify-center bg-black text-white rounded-2xl px-6 py-4 text-base font-medium hover:bg-neutral-900 transition"
          >
            Start a Conversation
            <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </section>

      <div className="h-8" />
    </main>
  );
}
