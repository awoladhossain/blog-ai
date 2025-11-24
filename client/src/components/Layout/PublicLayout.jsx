// src/components/PublicLayout.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Shadcn button
import { Card, CardContent } from "@/components/ui/card"; // optional – for the hero area

import Theme from "../Theme/Theme";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-gray-900 dark:to-indigo-950 text-white flex flex-col">
      <header className="p-4 md:p-6 flex justify-between items-center bg-white/10 dark:bg-black/10 backdrop-blur-sm">
        <h1 className="text-2xl md:text-3xl font-bold">MySite</h1>
        <nav className="flex items-center gap-2 md:gap-4">
          <Theme />
          <Link to="/signin">
            <Button
              variant="secondary"
              className="bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 text-white border-none"
            >
              Sign In
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
        >
          Welcome to MySite
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg md:text-xl mb-8 max-w-2xl"
        >
          Discover amazing features, read our blog, and get started with a
          seamless experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link to="/app">
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-800 dark:text-white dark:hover:bg-indigo-700 rounded-full font-semibold transition-all hover:scale-105"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>
      </main>

      <footer className="p-4 md:p-6 text-center text-sm opacity-80 bg-white/10 dark:bg-black/10 backdrop-blur-sm">
        © {new Date().getFullYear()} MySite. All rights reserved.
      </footer>
    </div>
  );
};

export default PublicLayout;
