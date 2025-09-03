"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const products = [
  {
    id: 1,
    title: "Colgate Tooth Brush Adult",
    image: "/To.jpg",
    category: "Tooth Brushes",
    price: 140,
    rating: 4,
    reviews: 500,
  },
  {
    id: 2,
    title: "Colgate Toothbrush Twin Pack Soft",
    image: "/To2.jpg",
    category: "Tooth Brushes",
    price: 200,
    rating: 2,
    reviews: 320,
  },
  {
    id: 3,
    title: "Sensodyne Gumcare",
    image: "/To3.jpg",
    category: "Tooth Brushes",
    price: 220,
    rating: 4,
    reviews: 210,
  },
  {
    id: 4,
    title: "Colgate Toothpaste",
    image: "/To4.jpg",
    category: "Tooth Brushes",
    price: 150,
    rating: 2,
    reviews: 500,
  },
  {
    id: 5,
    title: "Colgate Max Fresh",
    image: "/To5.jpg",
    category: "Tooth Brushes",
    price: 120,
    rating: 3,
    reviews: 500,
  },
  {
    id: 6,
    title: "Sensodyne Toothpaste",
    image: "/To6.jpg",
    category: "Tooth Brushes",
    price: 210,
    rating: 4,
    reviews: 500,
  },
  {
    id: 7,
    title: "Sensodyne Toothpaste Original",
    image: "/To7.jpg",
    category: "Tooth Brushes",
    price: 110,
    rating: 3,
    reviews: 500,
  },
  {
    id: 8,
    title: "Doctor Toothpaste Large",
    image: "/To8.jpg",
    category: "Tooth Brushes",
    price: 550,
    rating: 5,
    reviews: 500,
  },
  {
    id: 9,
    title: "Pepsodent Cavity Fighter",
    image: "/To9.jpg",
    category: "Tooth Brushes",
    price: 210,
    rating: 5,
    reviews: 500,
  },
  {
    id: 10,
    title: "Colgate Plax Peppermint Mouthwash",
    image: "/To10.jpg",
    category: "Tooth Brushes",
    price: 120,
    rating: 5,
    reviews: 500,
  },
  {
    id: 11,
    title: "Truly Smokers Toothpaste Family",
    image: "/To11.jpg",
    category: "Tooth Brushes",
    price: 313,
    rating: 5,
    reviews: 500,
  },
  {
    id: 12,
    title: "Pepsodent White",
    image: "/To12.jpg",
    category: "Tooth Brushes",
    price: 310,
    rating: 5,
    reviews: 500,
  },
];

const ToothBrushesPastes = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();

  // Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-6">
      {/* Cart Info */}
      <motion.div
        className="mb-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold">🛒 Cart Items: {totalItems}</h2>
        {cart.length > 0 && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowCart(!showCart)}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
          >
            {showCart ? "Hide Cart" : "View Order Cart"}
          </motion.button>
        )}
      </motion.div>

      {/* Order Cart Section */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            className="mb-6 bg-white p-4 rounded-lg shadow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">Your Order Cart</h2>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                className="flex justify-between items-center border-b py-3"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-500">Rs. {item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold">
                  Rs. {(item.price * item.qty).toFixed(2)}
                </p>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </motion.button>
              </motion.div>
            ))}

            {/* Total Price */}
            <div className="flex justify-between items-center mt-4">
              <h3 className="text-xl font-bold">Total:</h3>
              <p className="text-xl font-bold text-green-600">
                Rs. {totalPrice.toFixed(2)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="max-w-xs bg-white rounded-2xl shadow-[0_0_4px_black] p-4 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Badge */}
            <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-md shadow-black">
              {product.category}
            </span>

            {/* Image */}
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover rounded-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
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
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addToCart(product)}
                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ToothBrushesPastes;