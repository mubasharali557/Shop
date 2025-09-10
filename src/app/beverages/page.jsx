"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const products = [
  {
    id: 1,
    title: "7Up 1.5L x6 ",
    image: "/be.jpg",
    category: "Beverages",
    price: 850,
    rating: 4,
    reviews: 500,
  },
  {
    id: 2,
    title: "Cola Next 1L",
    image: "/be1.jpg",
    category: "Beverages",
    price: 200,
    rating: 2,
    reviews: 320,
  },
  {
    id: 3,
    title: "Mezan Fizz Up 1Litre x 6",
    image: "/be2.jpg",
    category: "Beverages",
    price: 780,
    rating: 4,
    reviews: 210,
  },
  {
    id: 4,
    title: "Coca Cola 750ML",
    image: "/be3.jpg",
    category: "Beverages",
    price: 190,
    rating: 2,
    reviews: 500,
  },
  {
    id: 5,
    title: "Cola Next 1.5L",
    image: "/be4.jpg",
    category: "Beverages",
    price: 250,
    rating: 3,
    reviews: 500,
  },
  {
    id: 6,
    title: "Nestle Pure Life Water Fit 330ML x12",
    image: "/be5.jpg",
    category: " Water Beverages",
    price: 500,
    rating: 4,
    reviews: 500,
  },
  {
    id: 7,
    title: "NESTLE Pure Life Water 5L",
    image: "/be6.jpg",
    category: " Water Beverages",
    price: 700,
    rating: 3,
    reviews: 500,
  },
  {
    id: 8,
    title: "NESTLE Pure Life Water 1500 ML",
    image: "/be7.jpg",
    category: " Water Beverages",
    price: 120,
    rating: 5,
    reviews: 500,
  },
  {
    id: 9,
    title: "Aquafina Mineral Water 1.5L x6",
    image: "/be8.jpg",
    category: " Water Beverages",
    price: 650,
    rating: 5,
    reviews: 500,
  },
  {
    id: 10,
    title: "Aquafina Mineral Water 500 ML X 12 ",
    image: "/be9.jpg",
    category: " Water Beverages",
    price: 400,
    rating: 5,
    reviews: 500,
  },
  {
    id: 11,
    title: "Nescafe White Mocha 220 ML",
    image: "/be10.jpg",
    category: " Nescafe Beverages",
    price: 200,
    rating: 5,
    reviews: 500,
  },
  {
    id: 12,
    title: "Nescafe Chilled Salted Caramel 220ML",
    image: "/be11.jpg",
    category: " Nescafe Beverages",
    price: 180,
    rating: 5,
    reviews: 500,
  },
  {
    id: 13,
    title: "Nescafe Chilled Latte 220ML",
    image: "/be12.jpg",
    category: " Nescafe Beverages",
    price: 200,
    rating: 5,
    reviews: 500,
  },
  {
    id: 14,
    title: "Nescafe Chilled Hazelnut 220ML",
    image: "/be13.jpg",
    category: " Nescafe Beverages",
    price: 220,
    rating: 5,
    reviews: 500,
  },
  {
    id: 15,
    title: "Nescafe Mocha 220ML",
    image: "/be14.jpg",
    category: " Nescafe Beverages",
    price: 240,
    rating: 5,
    reviews: 500,
  },
];

// Star Rating Component
const StarRating = ({ rating, setRating, reviews }) => {
  const handleClick = (index) => {
    // Toggle: if clicking the same star that's already selected, reset to 0
    setRating(rating === index + 1 ? 0 : index + 1);
  };

  return (
    <div className="flex items-center mt-1">
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="focus:outline-none"
            aria-label={`Rate ${index + 1} out of 5 stars`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${
                index < rating ? "text-yellow-400" : "text-gray-300"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
      <p className="text-gray-500 text-sm ml-2">({reviews} reviews)</p>
    </div>
  );
};

const Beverages = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();
  
  // State to manage ratings for each product
  const [productRatings, setProductRatings] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = product.rating;
      return acc;
    }, {})
  );

  // Function to update rating for a specific product
  const updateRating = (productId, newRating) => {
    setProductRatings(prev => ({
      ...prev,
      [productId]: newRating
    }));
  };

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
              transition={{ duration: 0.4 }}
            />

            <h2 className="text-lg font-semibold mt-3">{product.title}</h2>

            {/* Star Rating Component */}
            <StarRating 
              rating={productRatings[product.id]} 
              setRating={(newRating) => updateRating(product.id, newRating)}
              reviews={product.reviews}
            />

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

export default Beverages;