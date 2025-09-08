"use client";

import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const slides = [
  { id: 1, bg: "/Shop.jpg", title: "SAVE MONEY", subtitle: "Exclusive Offers",  },
  { id: 2, bg: "/Shop2.jpg", title: "SAVE TIME", subtitle: "Quick Delivery",},
  { id: 3, bg: "/Shop3.jpg", title: "THE BEST ONLINE SHOP", subtitle: "Premium Products", },
  { id: 4, bg: "/Shop4.jpg", title: "PREMIUM QUALITY", subtitle: "Trusted by Thousands",  },
];

const products = [
  { id: 1, title: "Fine Dreaming Multi Purpose Cleaner Lavender", price: 300, image: "/ho1.jpg" },
  { id: 2, title: "Fine Dreaming Multi Purpose Cleaner Floral", price: 280, image: "/ho2.jpg" },
  { id: 3, title: "Milk Pack Full Cream", price: 150, image: "/Mi.jpg" },
  { id: 4, title: "Nestle Juice Mango", price: 80, image: "/Ju.jpg" },
];

export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Search term
  const { cart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Filtered Products
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Top Header */}
      <header className="w-full border-b bg-white px-4 sm:px-6 py-3 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/download.jpg" alt="Logo" width={120} height={50} className="object-contain w-24 sm:w-32" />
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center border rounded-full px-3 py-1 w-1/2">
            <FiSearch className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 sm:gap-6 font-medium text-sm sm:text-base">
            <Link href="/about" className="hover:text-pink-500">About My Shop </Link>
            <Link href="/deliverto" className="hover:text-pink-500 hidden sm:block">Deliver to</Link>
            <Link href="/account" className="hover:text-pink-500">Login</Link>


            {/* Cart Button */}
            <button
              onClick={() => setShowCart(!showCart)}
              className="hover:text-pink-500 relative"
            >
              🛒 Add To Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Cart Dropdown */}
        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute right-4 top-16 w-80 bg-white shadow-lg rounded-xl p-4 z-50"
            >
              <h2 className="text-lg font-bold mb-3">🛒 Your Cart</h2>
              {cart.length === 0 ? (
                <p className="text-gray-500">Cart is empty</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-500">Rs {item.price} × {item.qty}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => decreaseQty(item.id)} className="px-2 bg-gray-200 rounded">-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => increaseQty(item.id)} className="px-2 bg-gray-200 rounded">+</button>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-2">✖</button>
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="flex justify-between font-bold mt-3">
                    <span>Total:</span>
                    <span>Rs {totalPrice.toFixed(2)}</span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => {
                      alert(`✅ Checkout! \nTotal Price: Rs ${totalPrice.toFixed(2)}`);
                    }}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mt-3"
                  >
                    ✅ Checkout
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden mt-2 rounded-lg mx-auto max-w-7xl">
        {/* Slider */}
        <AnimatePresence mode="wait">
          {slides.map((slide, index) =>
            currentIndex === index && (
              <motion.div
                key={slide.id}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.bg})` }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
                  <motion.div
                    key={slide.title}
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -60, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white text-center space-y-3 sm:space-y-4 max-w-2xl"
                  >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400">
                      {slide.title}
                    </h2>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">{slide.subtitle}</h3>
                    {/* <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2 sm:px-6 sm:py-2 rounded-full text-sm sm:text-base">
                      BUY NOW
                    </button> */}
                    <p className="text-base sm:text-lg font-medium">{slide.offer}</p>
                  </motion.div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </section>

      {/* 🔍 Search Results Section */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        {searchTerm ? (
          filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                  <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded" />
                  <h2 className="font-semibold mt-2">{product.title}</h2>
                  <p className="text-gray-600">Rs {product.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found</p>
          )
        ) : null}
      </section>

      {/* Nav 2 */}
      <nav className="hidden md:flex items-center justify-center flex-wrap gap-10 text-sm font-bold mt-4 px-4 max-w-7xl mx-auto">
        <Link href="/beverages" className="hover:text-pink-500">Beverages</Link>
        <Link href="/Milk" className="hover:text-pink-500">Milk</Link>
        <Link href="/HandAndBodyWashes" className="hover:text-pink-500">Hand And Body Washes</Link>
        <Link href="/toothBrushesPastes" className="hover:text-pink-500">Tooth Brushes (Pastes)</Link>
        <Link href="/homeProducts" className="hover:text-pink-500">Similar Products</Link>
        <Link href="/CookingOIL" className="hover:text-pink-500">Cooking OIL</Link>
        <Link href="/skincare" className="hover:text-pink-500">Skin Care</Link>
        <Link href="/housecleaning" className="hover:text-pink-500">House Cleaning</Link>
        <Link href="/juices" className="hover:text-pink-500">Juices</Link>
      </nav>
    </div>
  );
}
