import { Trophy, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import authService from "@/services/authService";
import useUserStore from "@/context/userStore";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const { setAuth } = useUserStore();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.SubmitEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await authService.login(email, password);

            if (response.success) {
                const { token, user } = response.data;
                setAuth(token, user);
                navigate("/");
            } else {
                if (response.data.message === "Invalid credentials") {
                    setLoginError(true);
                }
                toast.error(response.error, {
                    position: "top-center",
                    style: { color: "red" },
                });
            }
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Something went wrong", {
                position: "top-center",
                style: { color: "red" },
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // In a real app, this would redirect to Google OAuth
        // Example: window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin)}/auth/google/callback&response_type=code&scope=profile%20email`;
        window.open("https://accounts.google.com/signin", "_blank");
    };

    const handleGitHubLogin = () => {
        // In a real app, this would redirect to GitHub OAuth
        // Example: window.location.href = `https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin)}/auth/github/callback&scope=user`;
        window.open("https://github.com/login", "_blank");
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:bg-gradient-to-br lg:from-blue-600 lg:to-purple-600 lg:p-12">
                <div className="mx-auto max-w-md">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                            <img
                                src="/ambani-logo.png"
                                className="h-12 w-12 rounded-sm"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                AchieveHub
                            </h1>
                            <p className="text-blue-100">
                                Digital Credentials Platform
                            </p>
                        </div>
                    </div>

                    <h2 className="mb-4 text-4xl font-bold text-white">
                        Welcome Back!
                    </h2>
                    <p className="mb-8 text-lg text-blue-100">
                        Continue your learning journey and track your
                        achievements.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-white/20">
                                <Trophy className="size-6 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-white">
                                    Track Progress
                                </p>
                                <p className="text-sm text-blue-100">
                                    Monitor your achievements
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-white/20">
                                <Mail className="size-6 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-white">
                                    Earn Certificates
                                </p>
                                <p className="text-sm text-blue-100">
                                    Get recognized for your skills
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-white/20">
                                <ArrowRight className="size-6 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-white">
                                    Continuous Growth
                                </p>
                                <p className="text-sm text-blue-100">
                                    Learn and develop daily
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
                        <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-2.5">
                            <Trophy className="size-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                AchieveHub
                            </h1>
                            <p className="text-sm text-gray-600">
                                Learning Platform
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-8 shadow-xl">
                        <div className="mb-8">
                            <h2 className="flex justify-center mb-2 text-3xl font-bold text-gray-900">
                                Login
                            </h2>
                            <p className="flex justify-center text-gray-600">
                                Enter your credentials to access your account
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <Mail className="size-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setLoginError(false);
                                        }}
                                        placeholder="you@example.com"
                                        className={`w-full rounded-lg border py-3 pl-12 pr-4 transition-all focus:outline-none focus:ring-2 
                                            ${
                                                loginError
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                                            }`}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <Lock className="size-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setLoginError(false);
                                        }}
                                        placeholder="Enter your password"
                                        className={`w-full rounded-lg border py-3 pl-12 pr-4 transition-all focus:outline-none focus:ring-2 ${
                                            loginError
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                                        }`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="size-5" />
                                        ) : (
                                            <Eye className="size-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="size-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>
                                <button
                                    type="button"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {loginError && (
                                <p className="flex justify-center text-sm text-red-500">
                                    Invalid credentials
                                </p>
                            )}

                            {/* Sign In Button */}
                            <Button
                                type="submit"
                                size="lg"
                                disabled={loading || !email || !password}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-6 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                            >
                                {loading ? (
                                    <>
                                        <Spinner data-icon="inline-start" />
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        Login
                                        <ArrowRight className="size-5" />
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{" "}
                                <button
                                    onClick={() => navigate("/signup")}
                                    className="font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    Sign up
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
