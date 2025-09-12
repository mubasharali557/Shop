 "use client";
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiPackage, FiCheck, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ManageProducts() {
  // ================= Products =================
  const [products, setProducts] = useState([
    // { id: 1, name: "Laptop", price: 1200, stock: 5 },
    // { id: 2, name: "Smartphone", price: 800, stock: 10 },
    // { id: 3, name: "Headphones", price: 150, stock: 20 },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [editId, setEditId] = useState(null);
  const [editProduct, setEditProduct] = useState({ name: "", price: "", stock: "" });

  // Add product
  const addProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;
    setProducts([
      ...products,
      { id: Date.now(), ...newProduct, price: +newProduct.price, stock: +newProduct.stock },
    ]);
    setNewProduct({ name: "", price: "", stock: "" });
  };

  // Delete product
  const deleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));

  // Start editing
  const startEdit = (product) => {
    setEditId(product.id);
    setEditProduct(product);
  };

  // Save edited product
  const saveEdit = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, ...editProduct, price: +editProduct.price, stock: +editProduct.stock } : p
      )
    );
    setEditId(null);
    setEditProduct({ name: "", price: "", stock: "" });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Products Section */}
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
                  <td className="p-3">
                    {editId === product.id ? (
                      <input
                        type="text"
                        value={editProduct.name}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, name: e.target.value })
                        }
                        className="px-2 py-1 border rounded"
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td className="p-3">
                    {editId === product.id ? (
                      <input
                        type="number"
                        value={editProduct.price}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, price: e.target.value })
                        }
                        className="px-2 py-1 border rounded w-20"
                      />
                    ) : (
                      `$${product.price}`
                    )}
                  </td>
                  <td className="p-3">
                    {editId === product.id ? (
                      <input
                        type="number"
                        value={editProduct.stock}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, stock: e.target.value })
                        }
                        className="px-2 py-1 border rounded w-20"
                      />
                    ) : (
                      product.stock
                    )}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    {editId === product.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(product.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FiCheck />
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <FiX />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(product)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
