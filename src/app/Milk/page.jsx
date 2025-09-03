

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const products = [
  {
    id: 1,
    title: "Olpers Milk ",
    image: "/Mi.jpg",
    category: "MILK",
    price: 350,
    rating: 4,
    reviews: 500,
  },
  {
    id: 2,
    title: "Haleeb Milk ",
    image: "/Mi1.jpg",
    category: "MILK",
    price: 250,
    rating: 2,
    reviews: 320,
  },
  {
    id: 3,
    title: "Nurpur Milk",
    image: "/Mi2.jpg",
    category: "MILK",
    price: 320,
    rating: 4,
    reviews: 210,
  },
  {
    id: 4,
    title: "Nurpur Milk ",
    image: "/Mi3.jpg",
    category: "MILK",
    price: 400,
    rating: 2,
    reviews: 500,
  },
  {
    id: 5,
    title: "Dayfresh Lactose ",
    image: "/Mi5.jpg",
    category: "MILK",
    price: 1500,
    rating: 3,
    reviews: 500,
  },
  {
    id: 6,
    title: "MilkFields UHT Full Cream Milk",
    image: "/Mi6.jpg",
    category: "MILK",
    price: 1100,
    rating: 4,
    reviews: 500,
  },
  {
    id: 7,
    title: "Day Fresh UHT Milk",
    image: "/Mi7.jpg",
    category: "MILK",
    price: 600,
    rating: 3,
    reviews: 500,
  },
  {
    id: 8,
    title: "Asli UHT Milk ",
    image: "/Mi8.jpg",
    category: "MILK",
    price: 550,
    rating: 5,
    reviews: 500,
  },
  {
    id: 9,
    title: "Prema Milk Pasteurized ",
    image: "/Mi9.jpg",
    category: "MILK",
    price: 500,
    rating: 5,
    reviews: 500,
  },
  {
    id: 10,
    title: "Good Milk ",
    image: "/Mi10.jpg",
    category: "MILK",
    price: 600,
    rating: 5,
    reviews: 500,
  },
  {
    id: 11,
    title: "Dairy Omung",
    image: "/Mi11.jpg",
    category: "MILK",
    price: 700,
    rating: 5,
    reviews: 500,
  },
  {
    id: 12,
    title: "Nestle Nesvita",
    image: "/Mi12.jpg",
    category: "MILK",
    price: 1100,
    rating: 5,
    reviews: 500,
  },
];

const Milk = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Cart Info */}
      <div className="mb-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
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
      </div>

      {/* Order Cart Section */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="mb-6 bg-white p-4 rounded-lg shadow"
          >
            <h2 className="text-2xl font-bold mb-4">Your Order Cart</h2>
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
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
            </AnimatePresence>

            {/* Total Price */}
            <div className="flex justify-between items-center mt-4">
              <h3 className="text-xl font-bold">Total:</h3>
              <p className="text-xl font-bold text-green-600">
                Rs. {totalPrice.toFixed(2)}
              </p>
            </div>

            {/* Order Now Button (Optional) */}
            {cart.length > 0 && (
              <button
                onClick={() => {
                  alert(`🎉 Order placed successfully! Total: Rs ${totalPrice.toFixed(2)}`);
                  // If you want to clear cart after order, add: 
                  // cart.forEach(item => removeFromCart(item.id));
                }}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
              >
                ✅ Order Now
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="max-w-xs bg-white rounded-2xl shadow-[0_0_4px_black] p-4 relative cursor-pointer"
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
              transition={{ duration: 0.4 }}
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
                whileTap={{ scale: 1.2 }}
                onClick={() => addToCart(product)}
                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Milk;