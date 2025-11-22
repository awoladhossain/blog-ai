import { useEffect } from "react";
import { useSelector } from "react-redux";

const ThemeWrapper = ({ children }) => {
  const mode = useSelector((state) => state.theme.mode);
  useEffect(() => {
    const root = window.document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);
  return <>{children}</>;
};

export default ThemeWrapper;
