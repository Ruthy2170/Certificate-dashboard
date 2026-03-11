import { Trophy, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import authService from "@/services/authService";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.SubmitEvent) => {
        e.preventDefault();

        setLoading(true);

        if (!email || !password) {
            return;
        }

        try {
            const response = await authService.login(email, password);

            if (response.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user),
                );
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
                                disabled={loading}
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

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-4 text-gray-500">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
                                >
                                    <svg className="size-5" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Google
                                </button>
                                <button
                                    type="button"
                                    onClick={handleGitHubLogin}
                                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
                                >
                                    <svg
                                        className="size-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </button>
                            </div>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{" "}
                                <button
                                    onClick={() => navigate("/signup")}
                                    className="font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    Sign up for free
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
