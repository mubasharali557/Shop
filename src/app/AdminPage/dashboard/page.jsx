

"use client";
import React, { useState } from "react";
import {
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiTrendingUp,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const stats = [
    { name: "Total Users", value: "1,245", icon: <FiUsers />, color: "bg-blue-500" },
    { name: "Orders", value: "320", icon: <FiShoppingCart />, color: "bg-green-500" },
    { name: "Revenue", value: "$12,450", icon: <FiDollarSign />, color: "bg-yellow-500" },
    { name: "Growth", value: "8.2%", icon: <FiTrendingUp />, color: "bg-purple-500" },
  ];

  const [orders, setOrders] = useState([
    { id: 1, customer: "Ali Khan", item: "Laptop", status: "Shipped" },
  ]);

  const [newOrder, setNewOrder] = useState({
    customer: "",
    item: "",
    status: "Pending",
  });

  const [activities, setActivities] = useState([]);

  // 🔥 Add order
  const addOrder = (e) => {
    e.preventDefault();
    if (!newOrder.customer || !newOrder.item) return;

    const newEntry = {
      id: Date.now(),
      ...newOrder,
    };

    setOrders([...orders, newEntry]);

    setActivities([`${newOrder.customer} placed a new order for ${newOrder.item}.`, ...activities]);

    setNewOrder({ customer: "", item: "", status: "Pending" });
  };

  // 🔥 Delete order
  const deleteOrder = (id) => {
    const orderToDelete = orders.find((o) => o.id === id);
    setOrders(orders.filter((order) => order.id !== id));

    if (orderToDelete) {
      setActivities([`Order for ${orderToDelete.item} by ${orderToDelete.customer} was deleted.`, ...activities]);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white rounded-xl shadow-md p-5 flex items-center"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center text-white text-xl rounded-lg ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">{stat.name}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
            🛒 Recent Orders
          </h2>

          {/* Add Order Form */}
          <form
            onSubmit={addOrder}
            className="flex flex-wrap gap-3 mb-4 bg-gray-50 p-3 rounded-lg"
          >
            <input
              type="text"
              placeholder="Customer Name"
              value={newOrder.customer}
              onChange={(e) =>
                setNewOrder({ ...newOrder, customer: e.target.value })
              }
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Item"
              value={newOrder.item}
              onChange={(e) =>
                setNewOrder({ ...newOrder, item: e.target.value })
              }
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={newOrder.status}
              onChange={(e) =>
                setNewOrder({ ...newOrder, status: e.target.value })
              }
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FiPlus className="mr-2" /> Add
            </button>
          </form>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-left">
                  <th className="p-3">#</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Item</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <AnimatePresence component="tbody">
                <tbody>
                  {orders.map((order, i) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3">{i + 1}</td>
                      <td className="p-3">{order.customer}</td>
                      <td className="p-3">{order.item}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.status === "Shipped"
                              ? "bg-blue-100 text-blue-600"
                              : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="text-red-600 hover:text-red-800 flex items-center"
                        >
                          <FiTrash2 className="mr-1" /> Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </AnimatePresence>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">📌 Recent Activity</h2>
          <ul className="space-y-3">
            <AnimatePresence>
              {activities.map((activity, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 text-sm"
                >
                  {activity}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}
