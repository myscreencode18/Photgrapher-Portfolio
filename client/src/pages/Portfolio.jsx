import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const images = [
  { id: 1, src: "/urbandreams.jpg", title: "Urban Dreams", size: "large" },
  { id: 2, src: "/goldenframes.jpg", title: "Golden Hour", size: "tall" },
  { id: 3, src: "/intimateframes.jpg", title: "Intimate Frames", size: "wide" },
  { id: 4, src: "/Silentstories.jpg", title: "Silent Stories", size: "small" },
  
  { id: 5, "src": "/midnightexpress.jpg", title : "Midnight Express", size: "wide" },
  { id: 6, "src": "/coffeemornings.jpg", title: "Coffee Mornings", size: "small" },
  { id: 7, "src": "/desertrose.jpg", title: "Desert Rose", size: "large" },
  { id: 8, "src": "/mountainpeak.jpg", title: "Mountain Peak", size: "tall" }

  // add more images
];

export default function Portfolio() {
  const navigate = useNavigate();

  return (
    <section id="work" className="bg-gray-100 min-h-screen py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-16 relative">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-800">
            The Portfolio: A Curated Art Gallery
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Each piece is more than a photograph—it’s a story, curated with intention.
          </p>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`relative overflow-hidden cursor-pointer group break-inside-avoid ${
                img.size === "large" ? "h-[500px]" :
                img.size === "tall" ? "h-[450px]" :
                img.size === "wide" ? "h-[300px]" :
                "h-[250px]"
              }`}
              onClick={() => navigate(`/portfolio/${img.id}`)}
            >
              {/* Image */}
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500 ease-in-out"
              />

              {/* Title Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                <span className="text-white text-xl font-medium tracking-wide">
                  {img.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
