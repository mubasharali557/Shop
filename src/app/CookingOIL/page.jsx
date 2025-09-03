
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const products = [
  {
    id: 1,
    title: "Cooking Oil 1L x5",
    image: "/oil.jpg",
    category: "Cooking Oil",
    price: 3000,
    rating: 4,
    reviews: 500,
  },
  {
    id: 2,
    title: "Seasons Corn Oil Can 10LTR",
    image: "/oil1.jpg",
    category: "Cooking Oil",
    price: 2200,
    rating: 2,
    reviews: 320,
  },
  {
    id: 3,
    title: "Seasons Corn Oil Bottle 3LTR",
    image: "/oil2.jpg",
    category: "Cooking Oil",
    price: 2100,
    rating: 4,
    reviews: 210,
  },
  {
    id: 4,
    title: "Dalda Sunflower Oil 1LTR X5",
    image: "/oil3.jpg",
    category: "Cooking Oil",
    price: 1500,
    rating: 2,
    reviews: 500,
  },
  {
    id: 5,
    title: "Dalda Corn Oil Bottle 3L",
    image: "/oil4.jpg",
    category: "Cooking Oil",
    price: 1200,
    rating: 3,
    reviews: 500,
  },
  {
    id: 6,
    title: "Rafhan Corn Oil Tin 16 L",
    image: "/oil5.jpg",
    category: "Cooking Oil",
    price: 3000,
    rating: 4,
    reviews: 500,
  },
  {
    id: 7,
    title: "Rafhan Corn Oil 3 LTR",
    image: "/oil6.jpg",
    category: "Cooking Oil",
    price: 2300,
    rating: 3,
    reviews: 500,
  },
  {
    id: 8,
    title: "Shahtaj Canola Oil",
    image: "/oil7.jpg",
    category: "Cooking Oil",
    price: 1400,
    rating: 5,
    reviews: 500,
  },
  {
    id: 9,
    title: "OK Banaspati Ghee 1 KG",
    image: "/oil8.jpg",
    category: "Cooking Oil",
    price: 2222,
    rating: 5,
    reviews: 500,
  },
  {
    id: 10,
    title: "Adam Desi Ghee 2.5 KG",
    image: "/oil9.jpg",
    category: "Cooking Oil",
    price: 2100,
    rating: 5,
    reviews: 500,
  },
  {
    id: 11,
    title: "Pak Desi Ghee 2.5KG",
    image: "/oil10.jpg",
    category: "Cooking Oil",
    price: 2000,
    rating: 5,
    reviews: 500,
  },
  {
    id: 12,
    title: "Olpers Desi Ghee Tarka 1KG",
    image: "/oil11.jpg",
    category: "Cooking Oil",
    price: 2790,
    rating: 5,
    reviews: 500,
  }
];

// 🔥 Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
};

const CookingOIL = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-6">
      {/* Cart Info */}
      <div className="mb-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold">🛒 Cart Items: {totalItems}</h2>
        {cart.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCart(!showCart)}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
          >
            {showCart ? "Hide Cart" : "View Order Cart"}
          </motion.button>
        )}
      </div>

      {/* Order Cart Section */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mb-6 bg-white p-4 rounded-lg shadow"
          >
            <h2 className="text-2xl font-bold mb-4">Your Order Cart</h2>
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, x: 50 }}
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
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 bg-gray-300 rounded"
                    >
                      -
                    </motion.button>
                    <span>{item.qty}</span>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => increaseQty(item.id)}
                      className="px-2 bg-gray-300 rounded"
                    >
                      +
                    </motion.button>
                  </div>

                  <p className="font-bold">Rs. {(item.price * item.qty).toFixed(2)}</p>

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
            </AnimatePresence>

            {/* Total Price */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center mt-4"
            >
              <h3 className="text-xl font-bold">Total:</h3>
              <p className="text-xl font-bold text-green-600">
                Rs. {totalPrice.toFixed(2)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="max-w-xs bg-white rounded-2xl shadow-[0_0_4px_black] p-4 relative"
          >
            <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-md shadow-black">
              {product.category}
            </span>

            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover rounded-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />

            <h2 className="text-lg font-semibold mt-3">{product.title}</h2>

            <div className="flex items-center mt-1">
              <span className="text-yellow-400">
                {"★".repeat(product.rating)}
              </span>
              <p className="text-gray-500 text-sm ml-2">
                ({product.reviews} reviews)
              </p>
            </div>

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
      </motion.div>
    </div>
  );
};

export default CookingOIL;