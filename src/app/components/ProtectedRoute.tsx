import { Navigate } from "react-router";
import useUserStore from "@/context/userStore";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { token } = useUserStore();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
