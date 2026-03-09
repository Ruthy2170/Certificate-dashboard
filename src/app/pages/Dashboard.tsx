import {
    Trophy,
    Star,
    CheckCircle2,
    Calendar,
    Download,
    Award,
    Shield,
    TrendingUp,
} from "lucide-react";

const user = JSON.parse(localStorage.getItem("user") || "{}");

// Mock data
const userData = {
    name: "RUTH",
    email: "ruth@amabaniafrica.com",
    avatar: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjU4MzU1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    totalPoints: 2450,
};

const achievements = [
    {
        id: 1,
        title: "First Steps",
        description: "Completed your first project successfully",
        icon: Trophy,
        dateEarned: "Jan 15, 2026",
        iconBgColor: "bg-yellow-500",
        points: 100,
    },
    {
        id: 2,
        title: "Team Player",
        description: "Collaborated on 10 team projects",
        icon: Star,
        dateEarned: "Feb 3, 2026",
        iconBgColor: "bg-red-500",
        points: 200,
    },
    {
        id: 3,
        title: "Perfect Score",
        description: "Achieved 100% on advanced certification exam",
        icon: Star,
        dateEarned: "Mar 5, 2026",
        iconBgColor: "bg-amber-500",
        points: 500,
    },
];

const certifications = [
    {
        id: 1,
        name: "Advanced Web Development",
        organization: "Tech Academy",
        completionDate: "February 28, 2026",
        status: "completed",
        learnerName: "Ruth",
    },
    {
        id: 2,
        name: "Cloud Architecture Professional",
        organization: "Cloud Certification Board",
        completionDate: "January 15, 2026",
        status: "completed",
        learnerName: "Ruth",
    },
    {
        id: 3,
        name: "UX Design Specialist",
        organization: "Design Institute",
        completionDate: "March 2, 2026",
        status: "completed",
        learnerName: "Ruth",
    },
    {
        id: 4,
        name: "Agile Project Management",
        organization: "PMI",
        completionDate: "December 10, 2025",
        status: "completed",
        learnerName: "Ruth",
    },
];

export default function Dashboard() {
    const handleDownloadCertificate = (certName: string) => {
        // Mock download functionality
        alert(`Downloading certificate: ${certName}`);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600">
                    Track your learning journey and celebrate your achievements
                </p>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid gap-6 sm:grid-cols-1">
                {/* Certificates */}
                <div className="group rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                            <Shield className="size-6 text-white" />
                        </div>
                    </div>
                    <p className="mb-1 text-sm font-medium text-purple-100">
                        Certificates Earned
                    </p>
                    <p className="text-3xl font-bold text-white">
                        {certifications.length}
                    </p>
                </div>
            </div>

            {/* Achievement Timeline */}
            <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                        Recent Achievements
                    </h2>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        See Timeline
                    </button>
                </div>
                <div className="space-y-4">
                    {achievements.map((achievement) => {
                        const IconComponent = achievement.icon;
                        return (
                            <div
                                key={achievement.id}
                                className="group flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition-all hover:border-blue-200 hover:bg-blue-50/50"
                            >
                                <div
                                    className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${achievement.iconBgColor} shadow-lg`}
                                >
                                    <IconComponent className="size-7 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="mb-1 flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-900">
                                            {achievement.title}
                                        </h3>
                                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                                            +{achievement.points} pts
                                        </span>
                                    </div>
                                    <p className="mb-1 text-sm text-gray-600">
                                        {achievement.description}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {achievement.dateEarned}
                                    </p>
                                </div>
                                <CheckCircle2 className="size-6 text-green-500" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Certifications Section */}
            <div className="rounded-2xl bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                        Certifications
                    </h2>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        View All
                    </button>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                    {certifications.map((cert) => (
                        <div
                            key={cert.id}
                            className="group rounded-xl border-2 border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 transition-all hover:border-blue-200 hover:shadow-lg"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                                    <Award className="size-7 text-white" />
                                </div>
                                <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                                    ✓ Completed
                                </span>
                            </div>
                            <h3 className="mb-2 font-bold text-gray-900">
                                {cert.name}
                            </h3>
                            <p className="mb-2 text-sm font-medium text-blue-600">
                                Awarded to: {cert.learnerName}
                            </p>
                            <p className="mb-4 text-sm font-medium text-gray-600">
                                {cert.organization}
                            </p>
                            <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="size-4" />
                                {cert.completionDate}
                            </div>
                            <button
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                                onClick={() =>
                                    handleDownloadCertificate(cert.name)
                                }
                            >
                                <Download className="size-4" />
                                Download Certificate
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
