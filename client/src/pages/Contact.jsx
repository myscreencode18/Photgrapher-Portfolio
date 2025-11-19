import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Facebook, Linkedin } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen bg-white text-black font-sans">
      {/* Hero Section */}
      <section
        className="relative w-full h-[70vh] bg-cover bg-center grayscale"
        style={{
          backgroundImage:
            "url('/contact.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-6xl md:text-7xl font-serif tracking-wide text-center"
          >
            Let’s Connect
          </motion.h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto py-20 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 border-b border-gray-200">

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {!submitted ? (
            <>
              <p className="text-lg italic text-gray-600 mb-10 leading-relaxed">
                “Every great collaboration begins with a conversation.”
              </p>

              <h2 className="text-3xl font-serif mb-8">Get in Touch</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 uppercase tracking-wider"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full border-b border-gray-400 px-2 py-3 focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 uppercase tracking-wider"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full border-b border-gray-400 px-2 py-3 focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 uppercase tracking-wider"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full border-b border-gray-400 px-2 py-3 focus:border-black focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 bg-black text-white px-10 py-3 rounded-full uppercase tracking-wider hover:bg-gray-800 transition"
                >
                  Send Message
                </button>
              </form>
            </>
          ) : (
            <div className="text-left py-10">
              <h2 className="text-2xl font-serif">Thank you for your inquiry.</h2>
              <p className="text-gray-600 mt-2">
                We’ll be in touch with you shortly.
              </p>
            </div>
          )}
        </motion.div>

        {/* Contact Info Column */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-serif mb-6">Direct Contact</h3>

            <p className="flex items-center gap-3 mb-3">
              <Mail size={20} className="text-black" />
              <a href="mailto:hello@example.com" className="hover:underline">
                hello@example.com
              </a>
            </p>

            <p className="flex items-center gap-3 mb-3">
              <Phone size={20} className="text-black" />
              <a href="tel:+123456789" className="hover:underline">
                +1 234 567 89
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-6">Social</h3>
            <div className="flex gap-6">
              <a href="#" className="text-black hover:text-gray-900 transition">
                <Instagram size={24} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-black hover:text-gray-900 transition">
                <Facebook size={24} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-black hover:text-gray-900 transition">
                <Linkedin size={24} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-sm text-gray-500">
        © {new Date().getFullYear()} John Doe — All Rights Reserved
      </footer>
    </div>
  );
}
