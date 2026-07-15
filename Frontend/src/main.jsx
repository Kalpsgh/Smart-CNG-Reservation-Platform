import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "@fontsource/manrope";
import "leaflet/dist/leaflet.css";
const theme = localStorage.getItem("theme");

if (theme === "dark") {
  document.documentElement.classList.add("dark");
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
     <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "12px",
          color: "#fff",
          fontSize: "14px",
          padding: "12px 16px",
          fontWeight: "500",
          width: '100%',
            maxWidth: '300px',
        },

        success: {
          style: {
            background: "#16a34a", // Green-600
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#16a34a",
          },
        },

        error: {
          style: {
            background: "#dc2626", // Red-600
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#dc2626",
          },
        },

        loading: {
          style: {
            background: "#2563eb", // Blue-600
          },
        },
      }}
    />
    </BrowserRouter>
  </React.StrictMode>
);