import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const NewArrivals = () => {
  return (
    <section className="bg-amber-100 py-40">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-lora text-3xl font-bold text-center mb-6"
        >
          New Arrivals
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-inter text-lg text-center mb-10"
        >
          Discover the Latest Trends and Fresh Arrivals
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Apple Watch",
              price: 219.0,
              image: "/images/apple-watch.jpg",
              brand: "Apple",
            },
            {
              name: "Headphones",
              price: 119.0,
              image: "/images/headphones.jpg",
              brand: "Sony",
            },
            {
              name: "Apple Laptop",
              price: 2029.0,
              image: "/images/apple-laptop 2.jpg",
              brand: "Apple",
            },
            {
              name: "TV",
              price: 505.0,
              image: "/images/tv.jpg",
              brand: "Samsung",
            },
            {
              name: "PS4 Controller",
              price: 132.0,
              image: "/images/ps4-controller 2.jpg",
              brand: "Sony",
            },
            {
              name: "Apple iPhone",
              price: 1219.0,
              image: "/images/apple-iphone.jpg",
              brand: "Apple",
            },
          ].map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger effect for each card
            >
              <ProductCard
                name={product.name}
                price={product.price}
                image={product.image}
                brand={product.brand}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
