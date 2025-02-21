"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl font-bold"
      >
       Kodaiのportfolio
      </motion.h1>
    </div>
  );
}
