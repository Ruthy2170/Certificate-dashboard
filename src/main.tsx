import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/sonner";

const client_id = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={client_id}>
        <App />
        <Toaster />
    </GoogleOAuthProvider>,
);
