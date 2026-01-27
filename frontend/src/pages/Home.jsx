// src/pages/LandingPage.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory">
      {/* Hero Section */}
      <motion.section
        className="snap-start min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-400 to-slate-500 text-white px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold mb-6">Welcome to Cartly</h1>
        <p className="text-2xl max-w-2xl">
          Cartly is your modern e-commerce platform. Browse products, manage
          orders, and experience smooth online shopping like never before.
        </p>
        <Link
          to="/auth/register"
          className="px-8 py-4  my-8 rounded-lg bg-teal-400 hover:bg-teal-600 text-white font-semibold text-xl transition"
        >
          Get Started
        </Link>
      </motion.section>

      {/* Why Choose Cartly Section */}
      <motion.section
        className="snap-start min-h-screen flex flex-col items-center justify-center bg-sky-50 text-gray-900 px-4 text-center"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl font-bold mb-6">Why Choose Cartly?</h2>
        <p className="text-2xl max-w-3xl mb-8">
          Cartly provides a seamless shopping experience for buyers and powerful
          tools for sellers to manage products and orders efficiently.
          Everything you need in one platform.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white rounded-lg p-6 shadow-lg w-72 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p>Intuitive interface and smooth navigation for everyone.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg w-72 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Secure</h3>
            <p>All transactions are protected and user data is safe.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg w-72 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
            <p>Quick load times and reliable order management.</p>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="snap-start py-16 bg-gradient-to-r from-slate-400 to-slate-600 text-gray-900 px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <p className="text-xl mb-2">
          Email:{" "}
          <a
            href="mailto:support@cartly.com"
            className="text-neutral-900 font-semibold"
          >
            support@cartly.com
          </a>
        </p>
        <p className="text-xl">
          Phone:{" "}
          <a href="tel:+1234567890" className="text-neutral-900 font-semibold">
            +1 234 567 890
          </a>
        </p>
      </motion.section>
    </div>
  );
}
