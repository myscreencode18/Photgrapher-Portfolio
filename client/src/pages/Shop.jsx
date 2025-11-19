import { useState } from "react";

// --- Sample Data --- //
const prints = [
  {
    id: 1,
    title: "Golden Horizon",
    price: 120,
    image: "/images/print1.jpg",
    description: "Printed on museum-grade matte paper with archival inks."
  },
  {
    id: 2,
    title: "Silent Peaks",
    price: 150,
    image: "/images/print2.jpg",
    description: "Premium giclée print with subtle texture and depth."
  },
  {
    id: 3,
    title: "Ocean Serenity",
    price: 95,
    image: "/images/print3.jpg",
    description: "Vibrant fine art print on smooth Hahnemühle paper."
  },
  {
    id: 4,
    title: "Mystic Forest",
    price: 130,
    image: "/images/print4.jpg",
    description: "Fine art print on textured cotton rag paper."
  }
];

export default function Shop() {
  const [selectedPrint, setSelectedPrint] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (print) => {
    setCart([...cart, print]);
    setSelectedPrint(null);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert("Order placed successfully! (Integrate Stripe/PayPal here)");
    setCart([]);
    setShowCheckout(false);
  };

  return (
    <div className="bg-white min-h-screen text-black p-6 sm:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold">Art Prints</h1>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setShowCart(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 15.75h10.5l1.644-9.478a1.125 1.125 0 00-1.107-1.322H5.106m0 0L4.125 4.5M6.75 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm12 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            />
          </svg>
          <span className="text-sm">({cart.length})</span>
        </div>
      </div>

      {/* Grid of Prints */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {prints.map((print) => (
          <div
            key={print.id}
            className="cursor-pointer group"
            onClick={() => setSelectedPrint(print)}
          >
            <div className="flex flex-col items-center overflow-hidden rounded-2xl shadow-md bg-white hover:shadow-lg transition">
              <img
                src={print.image}
                alt={print.title}
                className="w-full h-80 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-medium mb-1">{print.title}</h2>
                <p className="text-gray-600">${print.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedPrint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-xl">
            <img
              src={selectedPrint.image}
              alt={selectedPrint.title}
              className="w-full h-80 object-cover rounded-lg mb-6"
            />
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">{selectedPrint.title}</h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">{selectedPrint.description}</p>
            <p className="text-lg font-medium mb-6">${selectedPrint.price}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-black text-white px-6 py-2 rounded-2xl hover:bg-gray-800 transition"
                onClick={() => addToCart(selectedPrint)}
              >
                Add to Cart
              </button>
              <button
                className="border border-gray-400 px-6 py-2 rounded-2xl hover:bg-gray-100 transition"
                onClick={() => setSelectedPrint(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && !showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-xl overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-gray-600 text-sm">${item.price}</p>
                      </div>
                    </div>
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="flex justify-between items-center font-semibold text-lg mt-4">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>
                <button
                  className="w-full bg-black text-white py-3 rounded-2xl mt-4 hover:bg-gray-800 transition"
                  onClick={() => setShowCheckout(true)}
                >
                  Checkout
                </button>
              </div>
            )}
            <button
              className="mt-6 w-full border border-gray-400 py-2 rounded-2xl hover:bg-gray-100 transition"
              onClick={() => setShowCart(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Checkout Page */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">Checkout</h2>
            <form className="space-y-4" onSubmit={handlePlaceOrder}>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Zip Code</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Card Details</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex justify-between items-center font-semibold text-lg mt-4">
                <span>Total:</span>
                <span>${total}</span>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-2xl mt-4 hover:bg-gray-800 transition"
              >
                Place Order
              </button>
            </form>
            <button
              className="mt-6 w-full border border-gray-400 py-2 rounded-2xl hover:bg-gray-100 transition"
              onClick={() => setShowCheckout(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}