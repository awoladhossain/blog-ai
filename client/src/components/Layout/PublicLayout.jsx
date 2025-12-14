import { Button } from "@/components/ui/button";
import {
  RouteIndex,
  RouteSignin,
  RouteSignup,
  RouteWelcome,
} from "@/helpers/RouteName";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Theme from "../Theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/api/authAPI";


const PublicLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(RouteWelcome);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 p-4 md:p-6 flex justify-between items-center bg-card/70 backdrop-blur border-b border-border">
        <Link to={RouteWelcome} className="flex items-center space-x-2">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">M</span>
          </div>
          <h1 className="text-2xl font-bold">MySite</h1>
        </Link>

        <nav className="flex items-center gap-2 md:gap-4">
          <Theme />

          {!user ? (
            <>
              <Link to={RouteSignin}>
                <Button variant="secondary">Sign In</Button>
              </Link>
              <Link to={RouteSignup}>
                <Button>Get Started</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to={RouteIndex}>
                <Button variant="secondary">Dashboard</Button>
              </Link>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            Write. Share. Inspire.
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            A modern blogging platform built for developers, writers, and
            creators.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link to={RouteSignup}>
                  <Button size="lg" className="rounded-full px-8">
                    Start Writing
                  </Button>
                </Link>
                <Link to={RouteSignin}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            ) : (
              <Link to={RouteIndex}>
                <Button size="lg" className="rounded-full px-10">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </motion.div>

        {/* ================= FEATURES ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl"
        >
          {[
            {
              title: "Powerful Editor",
              icon: "📝",
              desc: "Write clean, structured, and rich content effortlessly",
            },
            {
              title: "Community Driven",
              icon: "👥",
              desc: "Engage with readers and creators around the world",
            },
            {
              title: "Fast & Secure",
              icon: "⚡",
              desc: "Optimized performance with modern security practices",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="p-4 text-center text-sm text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} MySite. Built with ❤️
      </footer>
    </div>
  );
};

export default PublicLayout;
