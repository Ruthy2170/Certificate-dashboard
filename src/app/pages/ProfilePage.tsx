import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Save,
    Camera,
    Edit2,
} from "lucide-react";
import { useState, useEffect } from "react";
import useUserStore from "@/context/userStore";
import useCertStore from "@/context/certificateStore";
import authService from "@/services/authService";
import { formatDate } from "@/utils/dateUtils";
import { toast } from "sonner";

export default function ProfilePage() {
    const { user, token, setAuth } = useUserStore();
    const [isEditing, setIsEditing] = useState(false);
    const { certificates } = useCertStore();

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        avatar: user?.avatar || "",
        phone: user?.phone || "",
        country: user?.country || "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                avatar: user.avatar || "",
                phone: user.phone || "",
                country: user.country || "",
            });
        }
    }, [user]);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!token) return;

        try {
            const updates: any = {};

            if (formData.name !== user?.name) updates.name = formData.name;
            if (formData.email !== user?.email) updates.email = formData.email;
            if (formData.avatar !== user?.avatar)
                updates.avatar = formData.avatar;
            if (formData.phone !== user?.phone) updates.phone = formData.phone;
            if (formData.country !== user?.country)
                updates.country = formData.country;

            // 🚨 prevent empty request
            if (Object.keys(updates).length === 0) {
                toast.info("No changes made", { position: "top-center" });
                return;
            }

            const response = await authService.updateDetails(updates);

            if (response.success) {
                setAuth(token, response.data.data); // ✅ update global state
                setIsEditing(false);

                toast.success("Details successfully updated", {
                    position: "top-center",
                });
            } else {
                toast.error(response.error, {
                    position: "top-center",
                    style: { color: "red" },
                });
            }
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Something went wrong", {
                position: "top-center",
                style: { color: "red" },
            });
        }
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    My Profile
                </h1>
                <p className="text-gray-600">
                    Manage your personal information and preferences
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <div className="mb-6 flex flex-col items-center">
                            <div className="relative mb-4">
                                {user?.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user?.name}
                                        className="size-32 rounded-full border-4 border-blue-100 object-cover shadow-lg"
                                    />
                                ) : (
                                    <div className="flex size-32 items-center justify-center rounded-full border-4 border-blue-100 bg-gradient-to-r from-blue-600 to-purple-600 text-4xl font-bold text-white shadow-lg">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                <button className="absolute bottom-0 right-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 p-2 text-white shadow-lg transition-all hover:shadow-xl">
                                    <Camera className="size-4" />
                                </button>
                            </div>
                            <h2 className="mb-1 text-xl font-bold text-gray-900">
                                {user?.name}
                            </h2>
                            <p className="mb-4 text-sm text-gray-600">
                                {user?.email}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="size-4" />
                                <span>
                                    Joined{" "}
                                    {user?.createdAt
                                        ? formatDate(user?.createdAt)
                                        : "Unavailable"}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                        >
                            <Edit2 className="size-4" />
                            {isEditing ? "Cancel Editing" : "Edit Profile"}
                        </button>
                    </div>

                    {/* Stats Card */}
                    <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white shadow-lg">
                        <h3 className="mb-4 font-semibold">Learning Stats</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-blue-100">
                                    Certificates
                                </span>
                                <span className="text-xl font-bold">
                                    {certificates.length}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-blue-100">
                                    Current Streak
                                </span>
                                <span className="text-xl font-bold">
                                    15 days
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="lg:col-span-2">
                    <div className="rounded-2xl bg-white p-8 shadow-lg">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">
                                Personal Information
                            </h2>
                            {isEditing && (
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-green-700"
                                >
                                    <Save className="size-4" />
                                    Save Changes
                                </button>
                            )}
                        </div>

                        <div className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <User className="size-4" />
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "name",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                ) : (
                                    <p className="rounded-lg bg-gray-50 px-4 py-3 text-gray-900">
                                        {user?.name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Mail className="size-4" />
                                    Email Address
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "email",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                ) : (
                                    <p className="rounded-lg bg-gray-50 px-4 py-3 text-gray-900">
                                        {user?.email}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Phone className="size-4" />
                                    Phone Number
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "phone",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                ) : (
                                    <p className="rounded-lg bg-gray-50 px-4 py-3 text-gray-900">
                                        {user?.phone}
                                    </p>
                                )}
                            </div>

                            {/* Location */}
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <MapPin className="size-4" />
                                    Location
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.country}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "country",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                ) : (
                                    <p className="rounded-lg bg-gray-50 px-4 py-3 text-gray-900">
                                        {user?.country}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Account Settings */}
                    <div className="mt-6 rounded-2xl bg-white p-8 shadow-lg">
                        <h2 className="mb-6 text-xl font-bold text-gray-900">
                            Account Settings
                        </h2>
                        <div className="space-y-4">
                            <button className="w-full rounded-lg border border-gray-300 px-4 py-3 text-left font-medium text-gray-700 transition-all hover:border-blue-500 hover:bg-blue-50">
                                Change Password
                            </button>
                            <button className="w-full rounded-lg border border-gray-300 px-4 py-3 text-left font-medium text-gray-700 transition-all hover:border-blue-500 hover:bg-blue-50">
                                Notification Preferences
                            </button>
                            <button className="w-full rounded-lg border border-gray-300 px-4 py-3 text-left font-medium text-gray-700 transition-all hover:border-blue-500 hover:bg-blue-50">
                                Privacy Settings
                            </button>
                            <button className="w-full rounded-lg border border-red-300 px-4 py-3 text-left font-medium text-red-600 transition-all hover:bg-red-50">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
