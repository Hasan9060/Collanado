"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const galleryImages = [
  {
    src: "/Images/spark/pic1.png",
    title: "Tree Plantation",
  },
  {
    src: "/Images/spark/pic2.png",
    title: "Recycling Drive",
  },
  {
    src: "/Images/spark/pic3.png",
    title: "Awareness Session",
  },
  {
    src: "/Images/spark/pic4.png",
    title: "Community Impact",
  },
  {
    src: "/Images/spark/pic5.png",
    title: "Green Future",
  },
  {
    src: "/Images/spark/pic6.png",
    title: "Nature First",
  },
];

export default function SparkTeamPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <div className="bg-white overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-600/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {["Awareness", "Green", "Nation"].map((word, i) => (
              <motion.h1
                key={i}
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                className={`text-6xl md:text-8xl font-black tracking-tight ${
                  word === "Green" ? "text-green-600" : "text-gray-900"
                }`}
              >
                {word}
              </motion.h1>
            ))}

            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="mt-8 max-w-xl text-xl text-gray-600 border-l-4 border-green-600 pl-6"
            >
              A pursuit to spread awareness for a Cleaner & Greener.
            </motion.p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[520px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="/Images/spark/main.png"
              alt="Spark Team"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-10"
          >
            Our Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            Climate change is real & we cannot ignore the fact that humans have had a major influence on this. Our mission is to plant a million trees by the end of 2021 whilst promoting minor lifestyle changes on individual level that will yield a greater collective change for our environment.
          </motion.p>
        </div>
      </section>

      <section className="py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-gray-700 mb-10"
          >
            Together we can, Together we will
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
           It is rightly said that “Earth provides enough to satisfy every man’s needs, but not every man’s greed.” Plants are the backbone of life on earth but we can’t ignore the fact that human influences including the eradication of trees are one of the core agents to bring climate change on planet earth. 
          </motion.p>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-center mb-16"
          >
            Our Gallery
          </motion.h2>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl cursor-pointer group"
                onClick={() => setActiveImage(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-6">
                  <h3 className="text-white text-xl font-bold">
                    {img.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
            onClick={() => setActiveImage(null)}
          >
            <motion.img
              src={activeImage}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-h-[90vh] rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
