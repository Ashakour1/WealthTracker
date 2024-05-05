import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

const PUPLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUPLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUPLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
