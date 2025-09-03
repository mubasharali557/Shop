"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const products = [
  {
    id: 1,
    title: "Nestle Fruita Vitals Chaunsa ",
    image: "/ju.jpg",
    category: "Juices",
    price: 150,
    rating: 4,
    reviews: 500,
  },
  {
    id: 2,
    title: "Nestle Red Grapes",
    image: "/ju1.jpg",
    category: "Juices",
    price: 100,
    rating: 2,
    reviews: 320,
  },
  {
    id: 3,
    title: "Nestle Nesfruta Apple 200ML",
    image: "/ju4.jpg",
    category: "Juices",
    price: 280,
    rating: 4,
    reviews: 210,
  },
  {
    id: 4,
    title: "Shezan Fruit Drink Mango 250ML",
    image: "/ju3.jpg",
    category: "Juices",
    price: 190,
    rating: 2,
    reviews: 500,
  },
  {
    id: 5,
    title: "Shezan Juice Apple 1 LTR",
    image: "/ju5.jpg",
    category: "Juices",
    price: 250,
    rating: 3,
    reviews: 500,
  },
  {
    id: 6,
    title: "Fruit Farm Peach 1L",
    image: "/ju2.jpg",
    category: " Juices",
    price: 500,
    rating: 4,
    reviews: 500,
  },
  {
    id: 7,
    title: "Nestle Fruita Vitals Nectar Apple 1 LTR",
    image: "/ju6.jpg",
    category: " Juices",
    price: 700,
    rating: 3,
    reviews: 500,
  },
  {
    id: 8,
    title: "Nestle Nesfruta Apple Juice 1L ",
    image: "/ju7.jpg",
    category: " Juices",
    price: 120,
    rating: 5,
    reviews: 500,
  },
  {
    id: 9,
    title: "Nestle Fruita Vitals Royal Mango 1L",
    image: "/ju8.jpg",
    category: "Juices",
    price: 650,
    rating: 5,
    reviews: 500,
  },
  {
    id: 10,
    title: "Nestle Fruita Vital Apple Nectar ",
    image: "/ju9.jpg",
    category: " Juices",
    price: 400,
    rating: 5,
    reviews: 500,
  },
  {
    id: 11,
    title: "Regal Siprus Lychee Nectar 2L",
    image: "/ju10.jpg",
    category: " Juices",
    price: 2000,
    rating: 5,
    reviews: 500,
  },
  {
    id: 12,
    title: "Regal Siprus Mango Nectar 2Ltr",
    image: "/ju11.jpg",
    category: " Juices",
    price: 180,
    rating: 5,
    reviews: 500,
  },
  {
    id: 13,
    title: "Regal Siprus Pomegranate Nectar 2L",
    image: "/ju12.jpg",
    category: " Juices",
    price: 200,
    rating: 5,
    reviews: 500,
  },
  {
    id: 14,
    title: "Regal Siprus Mix Fruit Nectar 2L",
    image: "/ju13.jpg",
    category: " Juices",
    price: 220,
    rating: 5,
    reviews: 500,
  },
  {
    id: 15,
    title: "Regal Siprus Peach Nectar 2L",
    image: "/ju14.jpg",
    category: "Juices ",
    price: 240,
    rating: 5,
    reviews: 500,
  },
];
const Juices = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();

  // Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-6">
      {/* Cart Info */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow"
      >
        <h2 className="text-xl font-bold">🛒 Cart Items: {totalItems}</h2>
        {cart.length > 0 && (
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
          >
            {showCart ? "Hide Cart" : "View Order Cart"}
          </button>
        )}
      </motion.div>

      {/* Order Cart Section */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="mb-6 bg-white p-4 rounded-lg shadow"
          >
            <h2 className="text-2xl font-bold mb-4">Your Order Cart</h2>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center border-b py-3"
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

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
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
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="max-w-xs bg-white rounded-2xl shadow-[0_0_4px_black] p-4 relative"
          >
            {/* Badge */}
            <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-md shadow-black">
              {product.category}
            </span>

            {/* Image */}
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
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
                onClick={() => addToCart(product)}
                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Juices;