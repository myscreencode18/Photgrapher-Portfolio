import React from "react";
import { Link } from "react-router-dom";

// Example data - You can fetch this from MongoDB
const stories = [
  {
    id: 1,
    title: "Through the Streets of Varanasi",
    tagline: "A spiritual journey by the ghats",
    coverImage: "/varanasi.jpg",
    category: "Travel",
    excerpt: "The story of timeless traditions and sacred waters...",
  },
  {
    id: 2,
    title: "Love in Monochrome",
    tagline: "Intimate portraits in black & white",
    coverImage: "/monochrome.jpg",
    category: "Portraits",
    excerpt: "Exploring emotions through shades of light and shadow...",
  },
  {
    id: 3,
    title: "Desert Dreams",
    tagline: "Stories from Rajasthan's golden sands",
    coverImage: "/dessertdream.jpg",
    category: "Culture",
    excerpt: "Life amidst the dunes, music, and timeless forts...",
  },
];

export default function StoriesLanding() {
  return (
    <section className="px-6 md:px-16 py-16 bg-black text-white">
      <h2 className="text-4xl md:text-6xl font-serif mb-10">Stories</h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Featured Story */}
        {stories.slice(0, 1).map((story) => (
          <Link
            to={`/stories/${story.id}`}
            key={story.id}
            className="group relative overflow-hidden rounded-2xl shadow-lg"
          >
            <img
              src={story.coverImage}
              alt={story.title}
              className="w-full h-[500px] object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <span className="text-sm uppercase tracking-wide text-gray-300">{story.category}</span>
              <h3 className="text-3xl font-serif font-bold">{story.title}</h3>
              <p className="text-sm text-gray-200 mt-2">{story.tagline}</p>
            </div>
          </Link>
        ))}

        {/* Other Stories */}
        <div className="grid gap-8">
          {stories.slice(1).map((story) => (
            <Link
              to={`/stories/${story.id}`}
              key={story.id}
              className="group flex gap-6 items-center border-b border-gray-700 pb-6"
            >
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-32 h-32 object-cover rounded-lg shadow-md transform group-hover:scale-105 transition"
              />
              <div>
                <span className="text-xs uppercase tracking-wide text-gray-400">{story.category}</span>
                <h4 className="text-xl font-serif font-semibold">{story.title}</h4>
                <p className="text-sm text-gray-300">{story.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
