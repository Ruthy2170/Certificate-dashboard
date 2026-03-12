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

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
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
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user),
                );
                navigate("/");
            } else {
                alert(response.error);
            }
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
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
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-gray-300 py-3 px-4"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-gray-300 py-3 px-4"
                            />

                            <input
                                type="tel"
                                placeholder="+27 80 000 0000"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phone: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-gray-300 py-3 px-4"
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-gray-300 py-3 px-4"
                            />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-gray-300 py-3 px-4"
                            />

                            <button
                                type="submit"
                                className="w-full rounded-lg py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600"
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </button>
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
