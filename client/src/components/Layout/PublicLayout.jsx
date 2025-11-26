import { Button } from "@/components/ui/button";
import {
  RouteIndex,
  RouteSignin,
  RouteSignup,
  RouteWelcome,
} from "@/helpers/RouteName";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Theme from "../Theme/Theme";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-gradient-to-br dark:from-background dark:via-card dark:to-background text-foreground flex flex-col transition-colors duration-300">
      <header className="p-4 md:p-6 flex justify-between items-center bg-card/50 dark:bg-card/50 backdrop-blur-sm border-b border-border">
        <Link to={RouteWelcome} className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">M</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            MySite
          </h1>
        </Link>
        <nav className="flex items-center gap-2 md:gap-4">
          <Theme />
          <Link to={RouteSignin}>
            <Button
              variant="secondary"
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            >
              Sign In
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-foreground">
            Welcome to MySite
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg md:text-xl mb-8 max-w-2xl text-muted-foreground"
        >
          Discover amazing features, read our blog, and get started with a
          seamless experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to={RouteIndex}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-all hover:scale-105 shadow-lg"
            >
              Enter App
            </Button>
          </Link>
          <Link to={RouteSignup}>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-border hover:bg-accent text-foreground rounded-full font-semibold transition-all hover:scale-105"
            >
              Get Started
            </Button>
          </Link>
        </motion.div>

        {/* Optional: Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl"
        >
          <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:scale-105 hover:shadow-lg">
            <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Rich Content
            </h3>
            <p className="text-muted-foreground text-sm">
              Create beautiful blog posts with our powerful editor
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:scale-105 hover:shadow-lg">
            <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Community
            </h3>
            <p className="text-muted-foreground text-sm">
              Connect with writers and readers worldwide
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:scale-105 hover:shadow-lg">
            <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Fast & Easy
            </h3>
            <p className="text-muted-foreground text-sm">
              Intuitive interface that makes blogging a breeze
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="p-4 md:p-6 text-center text-sm text-muted-foreground bg-card/50 backdrop-blur-sm border-t border-border">
        <p>© {new Date().getFullYear()} MySite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PublicLayout;
