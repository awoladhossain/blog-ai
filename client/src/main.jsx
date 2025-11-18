import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import App from "./App.jsx";
import ThemeWrapper from "./components/Theme/ThemeWrapper.jsx";
import "./index.css";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <App />
        <Toaster />
      </ThemeWrapper>
    </Provider>
  </StrictMode>
);
