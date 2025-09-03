"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const products = [
  {
    id: 1,
    title: "Fine Dreaming Hand Sanitizer",
    image: "/bo.jpg",
    category: "Body Washes",
    price: 250,
    rating: 4,
    reviews: 500,
  },
  {
    id: 2,
    title: "Nivea Shower Fresh",
    image: "/bo2.jpg",
    category: "Body Washes",
    price: 260,
    rating: 2,
    reviews: 320,
  },
  {
    id: 3,
    title: "Fine Dreaming Hand Sanitizer",
    image: "/bo3.jpg",
    category: "Body Washes",
    price: 220,
    rating: 4,
    reviews: 210,
  },
  {
    id: 4,
    title: "Nivea Shower Water",
    image: "/bo4.jpg",
    category: "Body Washes",
    price: 350,
    rating: 2,
    reviews: 500,
  },
  {
    id: 5,
    title: "Nivea Shower Gel Lemongrass",
    image: "/bo5.jpg",
    category: "Body Washes",
    price: 150,
    rating: 3,
    reviews: 500,
  },
  {
    id: 6,
    title: "Lifebuoy Hand Wash",
    image: "/bo6.jpg",
    category: "Body Washes",
    price: 325,
    rating: 4,
    reviews: 500,
  },
  {
    id: 7,
    title: "Capri Handwash White",
    image: "/bo7.jpg",
    category: "Body Washes",
    price: 230,
    rating: 3,
    reviews: 500,
  },
  {
    id: 8,
    title: "Herbion Rose Body Wash",
    image: "/bo8.jpg",
    category: "Body Washes",
    price:400 ,
    rating: 5,
    reviews: 500,
  },
  {
    id: 9,
    title: "Lifebuoy Hand Wash",
    image: "/bo9.jpg",
    category: "Body Washes",
    price: 320,
    rating: 5,
    reviews: 500,
  },
  {
    id: 10,
    title: "OK Hand Wash",
    image: "/bo10.jpg",
    category: "Body Washes",
    price: 325,
    rating: 5,
    reviews: 500,
  },
  {
    id: 11,
    title: "Cool & Cool Soap ",
    image: "/bo11.jpg",
    category: "Body Washes",
    price: 300,
    rating: 5,
    reviews: 500,
  },
  {
    id: 12,
    title: "Dettol Original Liquid Handwash",
    image: "/bo12.jpg",
    category: "Body Washes",
    price: 550,
    rating: 5,
    reviews: 500,
  },
];

const HandAndBodyWashes = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.qty, 0);

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      alert("This item is already in your cart!");
    } else {
      addToCart(product);
      alert(`${product.title} added to cart!`);
    }
  };

  return (
    <div className="p-6">
      {/* Cart Info */}
      <div className="mb-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold">🛒 Cart Items: {totalItems}</h2>
        {cart.length > 0 && (
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
          >
            {showCart ? "Hide Cart" : "View Order Cart"}
          </button>
        )}
      </div>

      {/* Show Cart or Products */}
      <AnimatePresence>
        {showCart ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h2 className="text-2xl font-bold mb-4">Your Order Cart</h2>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6 }}
                className="flex justify-between items-center border-b py-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-500">Rs.{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold">Rs.{(item.price * item.qty).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </motion.div>
            ))}
           
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="max-w-xs bg-white rounded-2xl shadow-[0_0_4px_black] p-4 relative hover:shadow-lg hover:scale-105 transition-transform"
              >
                {/* Badge */}
                <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-md shadow-black">
                  {product.category}
                </span>

                {/* Image */}
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-lg"
                />

                {/* Title */}
                <h2 className="text-lg font-semibold mt-3">{product.title}</h2>

                {/* Ratings */}
                <div className="flex items-center mt-1">
                  <span className="text-yellow-400">
                    {"★".repeat(product.rating)}
                  </span>
                  <p className="text-gray-500 text-sm ml-2">
                    ({product.reviews} reviews)
                  </p>
                </div>

                {/* Price + Button */}
                <div className="flex justify-between items-center mt-3">
                  <p className="text-xl font-bold text-gray-900">
                    Rs.{product.price}
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddToCart(product)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HandAndBodyWashes;