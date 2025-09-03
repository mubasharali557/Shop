"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";
    if (form.phone && !/^\+?[0-9]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) return setErrors(v);

    setLoading(true);
    try {
     
      await new Promise((r) => setTimeout(r, 800));
      alert('Account created successfully! Redirect to login.');
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Something went wrong. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left - Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-pink-500 to-yellow-400 p-6">
          <div className="text-center text-white space-y-4">
            <div className="mx-auto w-40 h-40 relative">
              <Image src="/Re.jpg" alt="register" fill sizes="(max-width: 768px) 40vw, 160px" className="object-contain" />
            </div>
            <h2 className="text-2xl font-bold">Create your account</h2>
            <p className="text-sm opacity-90">Join us — create an account to start shopping and managing your orders.</p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="p-6 md:p-8">
          <h3 className="text-2xl font-semibold mb-1">Create Account</h3>
          <p className="text-sm text-gray-500 mb-6">Already have an account? <Link href="/login" className="text-pink-500 font-medium">Login</Link></p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full rounded-lg border p-3 text-sm focus:outline-none focus:ring-2 ${errors.name ? 'border-red-400 ring-red-100' : 'border-gray-200 ring-pink-100'}`}
                placeholder="Your full name"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded-lg border p-3 text-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 ring-red-100' : 'border-gray-200 ring-pink-100'}`}
                placeholder="you@example.com"
                type="email"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Passwords */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full rounded-lg border p-3 text-sm pr-10 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-400 ring-red-100' : 'border-gray-200 ring-pink-100'}`}
                placeholder="Enter a secure password"
                type={showPassword ? 'text' : 'password'}
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-9 text-gray-500">
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm password</label>
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`w-full rounded-lg border p-3 text-sm focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-400 ring-red-100' : 'border-gray-200 ring-pink-100'}`}
                placeholder="Re-type your password"
                type={showPassword ? 'text' : 'password'}
              />
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Phone (optional) */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone (optional)</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full rounded-lg border p-3 text-sm focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-400 ring-red-100' : 'border-gray-200 ring-pink-100'}`}
                placeholder="+92 3xx xxxxxxx"
                type="tel"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-pink-500 text-white font-semibold hover:opacity-95 disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            <p className="text-xs text-gray-400 text-center">By creating an account you agree to our <Link href="/terms" className="text-pink-500">Terms</Link> and <Link href="/privacy" className="text-pink-500">Privacy Policy</Link>.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
