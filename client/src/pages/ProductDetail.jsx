// src/pages/ProductDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Golden Hour in Udaipur",
    price: "₹2,499",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    description:
      "Capture the breathtaking beauty of Udaipur during the golden hour. Printed on premium archival paper for a gallery-like finish.",
  },
  {
    id: 2,
    title: "Streets of Jaipur",
    price: "₹1,999",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    description:
      "Experience the vibrant streets of Jaipur. Perfect for lovers of Indian culture and heritage.",
  },
  {
    id: 3,
    title: "Sacred Temple",
    price: "₹2,999",
    image:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&q=80",
    description:
      "A sacred temple captured in stunning detail. A timeless piece of art for your walls.",
  },
  {
    id: 4,
    title: "Backpacking Himalayas",
    price: "₹3,499",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
    description:
      "For adventurers and dreamers — the Himalayas, frozen in a breathtaking print.",
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/" className="text-blue-500 underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
      {/* Image */}
      <div className="flex-1">
        <img
          src={product.image}
          alt={product.title}
          className="rounded-2xl shadow-lg w-full h-[500px] object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-4xl font-serif font-bold mb-4">{product.title}</h1>
        <p className="text-xl text-gray-700 mb-4">{product.price}</p>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {product.description}
        </p>

        <button className="px-6 py-3 bg-black text-white rounded-xl shadow-md hover:bg-gray-800 transition">
          Add to Cart
        </button>

        <Link to="/" className="mt-6 inline-block text-blue-500 underline">
          ← Back to Shop
        </Link>
      </div>
    </div>
  );
}
