
"use client";
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiPackage } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Ali Khan", email: "ali@example.com", role: "Admin" },
    { id: 2, name: "Sara Ahmed", email: "sara@example.com", role: "Editor" },
    { id: 3, name: "Bilal Hussain", email: "bilal@example.com", role: "User" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });

  const addUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: "", email: "", role: "User" });
  };

  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

  // ================= Products =================
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 1200, stock: 5 },
    { id: 2, name: "Smartphone", price: 800, stock: 10 },
    { id: 3, name: "Headphones", price: 150, stock: 20 },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const addProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;
    setProducts([
      ...products,
      { id: Date.now(), ...newProduct, price: +newProduct.price, stock: +newProduct.stock },
    ]);
    setNewProduct({ name: "", price: "", stock: "" });
  };

  const deleteProduct = (id) =>
    setProducts(products.filter((p) => p.id !== id));

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-12">
      {/* Users Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">👥 Manage Users</h2>

        {/* Add User Form */}
        <form
          onSubmit={addUser}
          className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-lg shadow-md"
        >
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option>User</option>
            <option>Editor</option>
            <option>Admin</option>
          </select>
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiPlus className="mr-2" /> Add User
          </button>
        </form>

        {/* Users Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3 flex justify-center gap-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">📦 Manage Products</h2>

        {/* Add Product Form */}
        <form
          onSubmit={addProduct}
          className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-lg shadow-md"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <FiPackage className="mr-2" /> Add Product
          </button>
        </form>

        {/* Products Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3">#</th>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {products.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">${product.price}</td>
                    <td className="p-3">{product.stock}</td>
                    <td className="p-3 flex justify-center gap-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
