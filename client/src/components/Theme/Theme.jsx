import { toggleTheme } from "@/redux/slices/themeSlice";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Theme = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-md bg-background text-foreground hover:bg-muted transition-colors"
    >
      {mode === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
};

export default Theme;
