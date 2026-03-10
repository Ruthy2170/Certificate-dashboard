import { createBrowserRouter } from "react-router";
import CertificatesPage from "./pages/CertificatesPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, Component: CertificatesPage },
            // { path: "certificates", Component: CertificatesPage },
            { path: "profile", Component: ProfilePage },
        ],
    },
]);
