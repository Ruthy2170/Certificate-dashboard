import {
    Trophy,
    Mail,
    Lock,
    User,
    ArrowRight,
    Eye,
    EyeOff,
    Phone,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import authService from "../../services/authService";
import useUserStore from "@/context/userStore";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
    const navigate = useNavigate();
    const { setAuth } = useUserStore();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSignUp = async (e: React.SubmitEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await authService.signup(
                formData.name,
                formData.email,
                formData.phone,
                formData.password,
            );

            if (response.success) {
                const { token, user } = response.data;
                setAuth(token, user);
                navigate("/");
            } else {
                toast.error(response.error, {
                    position: "top-center",
                    style: { color: "red" },
                });
            }
        } catch (error) {
            console.error("Signup failed:", error);
            toast.error("Something went wrong", {
                position: "top-center",
                style: { color: "red" },
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = () => {
        //In a real app, this would redirect to Google OAuth
        // Example: window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin)}/auth/google/callback&response_type=code&scope=profile%20email`;
        window.open("https://accounts.google.com/signin", "_blank");
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
            {/* LEFT SIDE (IDENTICAL TO LOGIN PAGE) */}

            <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:bg-gradient-to-br lg:from-blue-600 lg:to-purple-600 lg:p-12">
                <div className="mx-auto max-w-md">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                            <img
                                src="/ambani-logo.png"
                                alt="logo"
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
                        Start Your Journey!
                    </h2>

                    <p className="mb-8 text-lg text-blue-100">
                        Join thousands of learners and start earning
                        certifications today.
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
                                <div className="flex size-12 items-center justify-center rounded-lg bg-white/20">
                                    <Mail className="size-6 text-white" />
                                </div>
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

            {/* RIGHT SIDE SIGNUP FORM */}

            <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
                        <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-2.5">
                            <img
                                src="/ambani-logo.png"
                                alt="Logo"
                                className="size-8"
                            />
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
                            <h2 className="mb-2 text-3xl font-bold text-gray-900">
                                Create Account
                            </h2>
                            <p className="text-gray-600">
                                Sign up to start your learning journey
                            </p>
                        </div>

                        <form onSubmit={handleSignUp} className="space-y-5">
                            {/* Full Name Field */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Full Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <User className="size-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "name",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Enter your full name"
                                        className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Email Address{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <Mail className="size-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "email",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="you@example.com"
                                        className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <Phone className="size-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "phone",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="+27 80 000 0000"
                                        className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Password{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <Lock className="size-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={formData.password}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "password",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Create a strong password"
                                        className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-12 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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

                            {/* Confirm Password Field */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Confirm Password{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <Lock className="size-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={formData.confirmPassword}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "confirmPassword",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Confirm your password"
                                        className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-12 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword,
                                            )
                                        }
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="size-5" />
                                        ) : (
                                            <Eye className="size-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Sign Up Button */}
                            <Button
                                type="submit"
                                size="lg"
                                disabled={
                                    loading ||
                                    !formData.name ||
                                    !formData.email ||
                                    !formData.phone ||
                                    !formData.password ||
                                    !formData.confirmPassword
                                }
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-6 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                            >
                                {loading ? (
                                    <>
                                        <Spinner data-icon="inline-start" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        Create account
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
                            <div className=" w-full p-4">
                                <button
                                    type="button"
                                    onClick={handleGoogleSignUp}
                                    className="flex items-center justify-center  w-full gap-2 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
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
                                    Sign up with Google
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <button
                                    onClick={() => navigate("/login")}
                                    className="font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
