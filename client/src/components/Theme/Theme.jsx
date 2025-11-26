import { motion } from "framer-motion";
import { toggleTheme } from "@/redux/slices/themeSlice";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Theme = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <motion.button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-md bg-background text-foreground hover:bg-muted transition-colors"
      // subtle hover‑scale and tap‑feedback
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      // fade the icon in/out when the mode changes
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {mode === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </motion.button>
  );
};

export default Theme;
