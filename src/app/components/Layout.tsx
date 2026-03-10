import {
    Trophy,
    LayoutDashboard,
    Shield,
    User,
    LogOut,
    Menu,
    X,
    Flame,
} from "lucide-react";
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";

// logo imported for future use

const user = JSON.parse(localStorage.getItem("user") || "{}");

// Mock data
const userData = {
    name: "RUTH",
    email: "ruth@amabaniafrica.com",
    avatar: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjU4MzU1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentStreak: 15,
    totalPoints: 2450,
};

const navigationItems = [
    { id: 1, name: "Certifications", icon: Shield, path: "/" },
    { id: 2, name: "Profile", icon: User, path: "/profile" },
];

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex h-full flex-col">
                    {/* Logo/Brand */}
                    <div className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-white p-2">
                                <img
                                    src="/ambani-logo.png"
                                    alt="Logo"
                                    className="size-8"
                                />
                            </div>
                            <div>
                                <span className="block text-lg font-bold text-gray-900">
                                    AchieveHub
                                </span>
                                <span className="block text-xs text-gray-500">
                                    Learning Platform
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden"
                        >
                            <X className="size-6 text-gray-500" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="mx-4 mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-5">
                        <div className="mb-3 flex items-center gap-3">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="size-14 rounded-full border-2 border-blue-100 object-cover shadow-md"
                            />
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate font-semibold text-white">
                                    {user.name}
                                </p>
                                <p className="truncate text-xs text-blue-100">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between rounded-lg bg-white/20 px-3 py-2 backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <Flame className="size-4 text-orange-300" />
                                <span className="text-sm font-medium text-white">
                                    {userData.currentStreak} Day Streak
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-4">
                        {navigationItems.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        navigate(item.path);
                                        setSidebarOpen(false);
                                    }}
                                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                                        isActive
                                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    <IconComponent className="size-5" />
                                    {item.name}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="border-t border-gray-200 p-4">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                            <LogOut className="size-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Mobile Header */}
                <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 px-6 py-4 backdrop-blur-lg lg:hidden">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="rounded-lg p-2 hover:bg-gray-100"
                        >
                            <Menu className="size-6 text-gray-700" />
                        </button>
                        <div className="flex items-center gap-2">
                            <Trophy className="size-5 text-blue-600" />
                            <span className="font-semibold text-gray-900">
                                AchieveHub
                            </span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <Outlet />
            </div>
        </div>
    );
}
