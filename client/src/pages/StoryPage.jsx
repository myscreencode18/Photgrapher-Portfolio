import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

// Example story data (replace with DB fetch later)
const storyData =[ 
  {
  id: 1,
  title: "Through the Streets of Varanasi",
  coverImage: "/varanasi1.jpg",
  sections: [
    {
      type: "image",
      layout: "fullscreen",
      src: "/varanasi2.jpg",
      overlayText: "The river awakens with chants",
    },
    {
      type: "text",
      content:
        "The sun rises over the Ganges, bathing the city in golden light. Each corner whispers tales of devotion, history, and culture. The air carries the smell of incense, the sound of bells, and the warmth of prayers offered at dawn.",
    },
    {
      type: "image",
      layout: "overlap",
      src: "/varanasi7.jpg",
      caption: "Life moves with the river.",
    },
    {
      type: "text",
      content:
        "Boats line the ghats as locals and pilgrims alike prepare for another day. The river is more than just water here — it is a lifeline, a spiritual passage, and a mirror reflecting centuries of tradition.",
    },
    {
      type: "image",
      layout: "scattered",
      src: "/varanasi3.jpg",
      caption: "Colors of devotion painted across every ritual.",
    },
    {
      type: "text",
      content:
        "Here, time feels eternal. The chants, the bells, the flowing river — everything becomes part of a larger story. Every street corner hides a fragment of history, waiting to be discovered.",
    },
    {
      type: "video",
      thumbnail: "/varanasi8.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      caption: "Sounds of devotion fill the morning air.",
    },
    {
  type: "image",
  layout: "overlap",
  src: "/varanasi.jpg",
  overlaySecondImage: "/varanasi6.jpg",
  caption: "Life moves with the river."
}
,
    
  ],
}
,
  {
  id: 2,
  title: "Through the of Varanasi",
  coverImage: "/nature.jpg",
  sections: [
    {
      type: "image",
      layout: "fullscreen",
      src: "/urbanpotrait.jpg",
      overlayText: "The river awakens with chants",
    },
    {
      type: "text",
      content:
        "The sun rises over the Ganges, bathing the city in golden light. Each corner whispers tales of devotion, history, and culture. The air carries the smell of incense, the sound of bells, and the warmth of prayers offered at dawn.",
    },
    {
      type: "image",
      layout: "overlap",
      src: "/blackwhite.jpg",
      caption: "Life moves with the river.",
    },
    {
      type: "text",
      content:
        "Boats line the ghats as locals and pilgrims alike prepare for another day. The river is more than just water here — it is a lifeline, a spiritual passage, and a mirror reflecting centuries of tradition.",
    },
    {
      type: "image",
      layout: "scattered",
      src: "/fashion.jpg",
      caption: "Colors of devotion painted across every ritual.",
    },
    {
      type: "text",
      content:
        "Here, time feels eternal. The chants, the bells, the flowing river — everything becomes part of a larger story. Every street corner hides a fragment of history, waiting to be discovered.",
    },
    {
      type: "video",
      thumbnail: "/nature.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      caption: "Sounds of devotion fill the morning air.",
    },
  ],
},
  {
  id: 3,
  title: "Through the Streets of ",
  coverImage: "/nature.jpg",
  sections: [
    {
      type: "image",
      layout: "fullscreen",
      src: "/urbanpotrait.jpg",
      overlayText: "The river awakens with chants",
    },
    {
      type: "text",
      content:
        "The sun rises over the Ganges, bathing the city in golden light. Each corner whispers tales of devotion, history, and culture. The air carries the smell of incense, the sound of bells, and the warmth of prayers offered at dawn.",
    },
    {
      type: "image",
      layout: "overlap",
      src: "/blackwhite.jpg",
      caption: "Life moves with the river.",
    },
    {
      type: "text",
      content:
        "Boats line the ghats as locals and pilgrims alike prepare for another day. The river is more than just water here — it is a lifeline, a spiritual passage, and a mirror reflecting centuries of tradition.",
    },
    {
      type: "image",
      layout: "scattered",
      src: "/fashion.jpg",
      caption: "Colors of devotion painted across every ritual.",
    },
    {
      type: "text",
      content:
        "Here, time feels eternal. The chants, the bells, the flowing river — everything becomes part of a larger story. Every street corner hides a fragment of history, waiting to be discovered.",
    },
    {
      type: "video",
      thumbnail: "/nature.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      caption: "Sounds of devotion fill the morning air.",
    },
  ],
}
];

export default function StoryPage() {
  const { id } = useParams();
  const reactionsRef = useRef(null);

 const story = storyData.find((s) => s.id === Number(id));
 // later fetch by ID
const [reactions, setReactions] = useState({
  "❤️": 0,
  "👏": 0,
  "🔥": 0,
  "🌿": 0,
});

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Story link copied to clipboard!");
  };

  const handleReactScroll = () => {
    if (reactionsRef.current) {
      reactionsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReactionClick = (emoji) => {
    setReactions((prev) => ({
      ...prev,
      [emoji]: prev[emoji] + 1,
    }));
  };

  return (
    <article className="bg-white text-black">
      {/* Cover Header */}
      <div className="relative h-[90vh] overflow-hidden">
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-serif text-white text-center px-4">
            {story.title}
          </h1>
        </div>
      </div>

      {/* Story Content */}
      <div className="px-6 md:px-16 py-20 space-y-32 relative">
        {story.sections.map((block, index) => {
          if (block.type === "image" && block.layout === "fullscreen") {
            return (
              <div key={index} className="relative h-[80vh] w-full">
                <img
                  src={block.src}
                  alt={block.overlayText || "story image"}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
                {block.overlayText && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <p className="text-3xl md:text-5xl font-serif text-white text-center px-6">
                      {block.overlayText}
                    </p>
                  </div>
                )}
              </div>
            );
          }

          if (block.type === "image" && block.layout === "overlap") {
            return (
              <div key={index} className="relative">
                <img
                  src={block.src}
                  alt={block.caption}
                  className="w-3/4 mx-auto rounded-xl shadow-xl"
                />
                <img
                  src="/varanas.jpg"
                  alt="overlay"
                  className="absolute top-10 left-10 w-1/3 rounded-lg shadow-lg opacity-90 hidden md:block"
                />
                {block.caption && (
                  <p className="text-sm text-gray-600 italic mt-4 text-center">
                    {block.caption}
                  </p>
                )}
              </div>
            );
          }

          if (block.type === "image" && block.layout === "scattered") {
            return (
              <div
                key={index}
                className="grid md:grid-cols-3 gap-6 items-center"
              >
                <img
                  src={block.src}
                  alt={block.caption}
                  className="col-span-2 rounded-2xl shadow-lg"
                />
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed font-sans">
                    {block.caption}
                  </p>
                  <img
                    src="/varanai5.jpg"
                    alt="detail"
                    className="rounded-xl shadow-md"
                  />
                </div>
              </div>
            );
          }

          if (block.type === "text") {
            return (
              <p
                key={index}
                className="text-2xl leading-relaxed font-sans max-w-3xl mx-auto text-center"
              >
                {block.content}
              </p>
            );
          }

          if (block.type === "video") {
            return (
              <figure key={index} className="space-y-3 text-center relative">
                <a
                  href={block.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block"
                >
                  <img
                    src={block.thumbnail}
                    alt="Video thumbnail"
                    className="w-full md:w-3/4 mx-auto rounded-2xl shadow-lg cursor-pointer hover:opacity-90 transition"
                  />
                  {/* Play Icon Overlay */}
                  <FaPlayCircle className="absolute inset-0 m-auto text-white text-6xl opacity-90 drop-shadow-lg pointer-events-none" />
                </a>
                {block.caption && (
                  <figcaption className="text-sm text-gray-600 italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          return null;
        })}
      </div>

      {/* Call to Engage */}
      <div className="bg-gray-100 py-16 text-center">
        <p className="text-2xl font-serif">Did this story move you?</p>
        <div className="mt-6 flex justify-center gap-6">
          <button
            onClick={handleShare}
            className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            Share
          </button>
         
        </div>
      </div>

      {/* Reactions Section */}
      <div
        ref={reactionsRef}
        className="px-6 md:px-24 py-16 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-2xl font-serif mb-8">Your Reaction</h2>
        <div className="flex justify-center gap-6 text-4xl">
          {Object.keys(reactions).map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleReactionClick(emoji)}
              className="hover:scale-110 transition flex flex-col items-center"
            >
              <span>{emoji}</span>
              <span className="text-sm text-gray-600">{reactions[emoji]}</span>
            </button>
          ))}
        </div>
        <p className="mt-6 text-gray-600">
          Thank you for experiencing this story. Share it with someone who would
          feel the same.
        </p>
      </div>
    </article>
  );
}
