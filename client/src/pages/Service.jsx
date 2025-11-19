import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    id: "portraits",
    title: "Portraits",
    blurb:
      "Timeless, character-driven portraits for individuals, teams, and creative talent.",
    pricing: ["Basic — $300", "Standard — $500", "Premium — $800"],
    img: "/portrait.jpg",
  },
  {
    id: "commercial",
    title: "Commercial",
    blurb:
      "Product and brand photography crafted for campaigns, catalogs, and e-commerce.",
    pricing: ["Starter — $600", "Campaign — $1200", "Full Production — Custom"],
    img: "/commercial.jpg",
  },
  {
    id: "weddings",
    title: "Weddings",
    blurb:
      "Editorial storytelling that preserves the emotion and atmosphere of the day.",
    pricing: ["Half Day — $1500", "Full Day — $2500", "Destination — Custom"],
    img: "/wedding.jpg",
  },
  {
    id: "events",
    title: "Events",
    blurb:
      "Coverage for corporate gatherings, private parties, and public relations launches.",
    pricing: ["Mini — $400", "Standard — $750", "Full Coverage — $1100"],
    img: "/event.jpg",
  },
  {
    id: "architecture",
    title: "Architecture",
    blurb:
      "Stunning exterior and interior photography for real estate, design firms, and hospitality.",
    pricing: ["Standard — $450", "Deluxe — $700", "Premium — $1000"],
    img: "/architecture.jpg",
  },
  {
    id: "fashion",
    title: "Fashion",
    blurb:
      "Creative direction and high-quality photography for lookbooks, editorials, and apparel campaigns.",
    pricing: ["Half Day — $900", "Full Day — $1600", "Campaign — Custom"],
    img: "/fashion.jpg",
  },
  {
    id: "prints",
    title: "Fine Art Prints",
    blurb:
      "Limited edition photographic prints available for collectors, interior design, and gallery sales.",
    pricing: ["Small Print — $150", "Medium Print — $350", "Large Canvas — $600+"],
    img: "/prints.jpg",
  }
  // ...rest of your services
];

export default function ServicesPage() {
  return (
    <section className="relative w-full bg-black text-white">
      {SERVICES.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background image */}
          <img
            src={s.img}
            alt={s.title}
            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
          />
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
            <h2
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {s.title}
            </h2>
            <p
              className="text-base md:text-lg text-neutral-200 mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {s.blurb}
            </p>

            {/* Pricing */}
            {s.pricing && (
              <ul
                className="mb-8 space-y-2 text-neutral-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {s.pricing.map((p, idx) => (
                  <li key={idx} className="border-b border-white/20 pb-1">
                    {p}
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <Link
              to={`/contact?service=${s.id}`}
              className="inline-flex items-center gap-2 border border-white px-6 py-3 uppercase tracking-wider text-sm hover:bg-white hover:text-black transition rounded-md"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Inquire Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
