"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const products = [
  {
    id: 1,
    title: "No 1 Rosewater Soap",
    image: "/Soap.jpg",
    category: "Home Products",
    price: 230,
    rating: 4,
    reviews: 500,
  },
  {
    id: 2,
    title: "Safeguard Lemon Soap",
    image: "/Soap1.jpg",
    category: "Home Products",
    price: 250,
    rating: 2,
    reviews: 320,
  },
  {
    id: 3,
    title: "Dove soap",
    image: "/Soap2.jpg",
    category: "Home Products",
    price: 320,
    rating: 4,
    reviews: 210,
  },
  {
    id: 4,
    title: "Best Whitening Soap",
    image: "/Soap3.jpg",
    category: "Home Products",
    price: 210,
    rating: 2,
    reviews: 500,
  },
  {
    id: 5,
    title: "Ilham - Pretty Pink Beauty",
    image: "/Soap4.jpg",
    category: "Home Products",
    price: 230,
    rating: 3,
    reviews: 500,
  },
  {
    id: 6,
    title: "DEXCLUSIVE Luxury",
    image: "/Soap5.jpg",
    category: "Home Products",
    price: 330,
    rating: 4,
    reviews: 500,
  },
  {
    id: 7,
    title: "Lux Soap",
    image: "/Soap6.jpg",
    category: "Home Products",
    price: 210,
    rating: 3,
    reviews: 500,
  },
  {
    id: 8,
    title: "Capri Soap White 120GM",
    image: "/Soap7.jpg",
    category: "Home Products",
    price: 220,
    rating: 5,
    reviews: 500,
  },
  {
    id: 9,
    title: "SUFI Classic Beauty Soap",
    image: "/Soap8.jpg",
    category: "Home Products",
    price: 300,
    rating: 5,
    reviews: 500,
  },
  {
    id: 10,
    title: "Palmolive Natural Soap",
    image: "/Soap9.jpg",
    category: "Home Products",
    price: 250,
    rating: 5,
    reviews: 500,
  },
  {
    id: 11,
    title: "OPAL Beauty Soap 4+1",
    image: "/Soap10.jpg",
    category: "Home Products",
    price: 330,
    rating: 5,
    reviews: 500,
  },
  {
    id: 12,
    title: "Capri Soap Peach 130gx3",
    image: "/Soap11.jpg",
    category: "Home Products",
    price: 550,
    rating: 5,
    reviews: 500,
  },
];

const HomeProducts = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();

  // Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-6">
      {/* Cart Info */}
      <div className="mb-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold">🛒 Cart Items: {totalItems}</h2>
        {cart.length > 0 && (
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
          >
            {showCart ? "Hide Cart" : "View Order Cart"}
          </button>
        )}
      </div>

      {/* AnimatePresence for Cart */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className="mb-6 bg-white p-4 rounded-lg shadow"
          >
            <h2 className="text-2xl font-bold mb-4">Your Order Cart</h2>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
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

export default HomeProducts;