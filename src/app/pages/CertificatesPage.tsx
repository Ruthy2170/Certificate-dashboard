import {
    Award,
    Calendar,
    Download,
    Filter,
    Share2,
    Linkedin,
    Twitter,
    Facebook,
    Link,
} from "lucide-react";
import { useState, useEffect } from "react";
import useUserStore from "@/context/userStore";
import useCertStore from "@/context/certificateStore";
import certificateServices from "@/services/certificateService";
import { Certificate } from "@/types/Certificates";
import { formatDate } from "@/utils/dateUtils";
import { toast } from "sonner";
import CardSkeleton from "@/app/components/cardSkeleton";

export default function CertificatesPage() {
    const [filter, setFilter] = useState("all");
    const [shareMenuOpen, setShareMenuOpen] = useState<string | null>(null);
    const { user, token } = useUserStore();
    const { certificates, fetchCertificates, loading } = useCertStore();
    const orgs = [...new Set(certificates?.map((c) => c.organisationName))];

    useEffect(() => {
        if (token) {
            fetchCertificates();
        }
    }, [token, fetchCertificates]);

    const handleDownloadCertificate = async (cert: Certificate) => {
        toast.promise<{ name: string }>(
            () =>
                new Promise(async (resolve, reject) => {
                    try {
                        const response =
                            await certificateServices.fetchCertificate(
                                cert._id,
                            );

                        if (response.success) {
                            const url = response.data.signedUrl;
                            const link = document.createElement("a");
                            link.href = url;
                            link.target = "_blank";
                            link.download = `${cert.courseName}.pdf`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            resolve({ name: cert.courseName });
                        } else {
                            reject(new Error(response.error));
                        }
                    } catch (error) {
                        console.error("Certificate download failed:", error);
                        reject(error);
                    }
                }),
            {
                loading: "Downloading certificate...",
                success: (data) =>
                    `${data.name} certificate downloaded successfully`,
                error: "Failed to download certificate",
                position: "top-center",
            },
        );
    };

    const handleShareToLinkedIn = (cert: Certificate) => {
        const text = `I'm excited to share that I've earned my ${cert.courseName} certification from ${cert.organisationName}! 🎓`;
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
        window.open(url, "_blank", "width=600,height=600");
        setShareMenuOpen(null);
    };

    const handleShareToTwitter = (cert: Certificate) => {
        const text = `I'm excited to share that I've earned my ${cert.courseName} certification from ${cert.organisationName}! 🎓`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(url, "_blank", "width=600,height=600");
        setShareMenuOpen(null);
    };

    const handleShareToFacebook = (cert: Certificate) => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        window.open(url, "_blank", "width=600,height=600");
        setShareMenuOpen(null);
    };

    const handleCopyLink = (cert: Certificate) => {
        const certificateUrl = `${window.location.origin}/certificates/${cert._id}`;
        navigator.clipboard.writeText(certificateUrl).then(() => {
            toast.info("Certificate link copied to clipboard!");
            setShareMenuOpen(null);
        });
    };

    const filteredCerts =
        filter === "all"
            ? certificates
            : certificates?.filter((cert) => cert.organisationName === filter);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    My Certifications
                </h1>
                <p className="text-gray-600">
                    View and download all your earned certificates
                </p>
            </div>

            {/* Stats Overview */}
            <div className="mb-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                            <Award className="size-6 text-white" />
                        </div>
                    </div>
                    <p className="mb-1 text-sm font-medium text-purple-100">
                        Total Certificates
                    </p>
                    <p className="text-3xl font-bold text-white">
                        {certificates?.length}
                    </p>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                            <Calendar className="size-6 text-white" />
                        </div>
                    </div>
                    <p className="mb-1 text-sm font-medium text-purple-100">
                        This Year
                    </p>
                    <p className="text-3xl font-bold text-white">
                        {
                            certificates?.filter((c) =>
                                c.issuedAt.includes(
                                    String(new Date().getFullYear()),
                                ),
                            ).length
                        }
                    </p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="mb-6 flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
                <Filter className="size-5 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter("all")}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                            filter === "all"
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        All
                    </button>
                    {orgs?.map((orgName) => (
                        <button
                            key={orgName}
                            onClick={() => setFilter(orgName)}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                                filter === orgName
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {orgName}
                        </button>
                    ))}
                </div>
            </div>

            {/* Certificates Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {loading && certificates.length === 0 ? (
                    <>
                        <CardSkeleton />
                        <CardSkeleton />
                    </>
                ) : (
                    filteredCerts?.map((cert: Certificate) => (
                        <div
                            key={cert._id}
                            className="group rounded-xl border-2 border-gray-300 bg-gradient-to-br from-white to-gray-50 p-6 shadow-c transition-all hover:border-blue-200 hover:shadow-lg"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex size-14 items-center justify-center rounded-xl shadow-lg">
                                    <img src={cert.organisationLogo} sizes="" />
                                </div>
                            </div>
                            <h3 className="mb-2 font-bold text-gray-900">
                                {cert.courseName}
                            </h3>
                            <p className="mb-2 text-sm font-medium text-blue-600">
                                Awarded to: {user?.name}
                            </p>
                            <p className="mb-2 text-sm font-medium text-gray-600">
                                {cert.organisationName}
                            </p>
                            <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="size-4" />
                                {formatDate(cert.issuedAt)}
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                                    onClick={() =>
                                        handleDownloadCertificate(cert)
                                    }
                                >
                                    <Download className="size-4" />
                                    Download Certificate
                                </button>

                                {/* Share Button with Dropdown */}
                                <div className="relative">
                                    <button
                                        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-600 transition-all hover:border-blue-300 hover:bg-blue-50"
                                        onClick={() =>
                                            setShareMenuOpen(
                                                shareMenuOpen === cert._id
                                                    ? null
                                                    : cert._id,
                                            )
                                        }
                                    >
                                        <Share2 className="size-4" />
                                        Share Certificate
                                    </button>

                                    {/* Share Dropdown Menu */}
                                    {shareMenuOpen === cert._id && (
                                        <>
                                            {/* Backdrop */}
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() =>
                                                    setShareMenuOpen(null)
                                                }
                                            />

                                            {/* Menu */}
                                            <div className="absolute right-0 top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                                                <button
                                                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50"
                                                    onClick={() =>
                                                        handleShareToLinkedIn(
                                                            cert,
                                                        )
                                                    }
                                                >
                                                    <div className="flex size-8 items-center justify-center rounded-lg bg-[#0077B5]">
                                                        <Linkedin className="size-4 text-white" />
                                                    </div>
                                                    <span>
                                                        Share on LinkedIn
                                                    </span>
                                                </button>

                                                <button
                                                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50"
                                                    onClick={() =>
                                                        handleShareToTwitter(
                                                            cert,
                                                        )
                                                    }
                                                >
                                                    <div className="flex size-8 items-center justify-center rounded-lg bg-[#1DA1F2]">
                                                        <Twitter className="size-4 text-white" />
                                                    </div>
                                                    <span>
                                                        Share on Twitter
                                                    </span>
                                                </button>

                                                <button
                                                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50"
                                                    onClick={() =>
                                                        handleShareToFacebook(
                                                            cert,
                                                        )
                                                    }
                                                >
                                                    <div className="flex size-8 items-center justify-center rounded-lg bg-[#1877F2]">
                                                        <Facebook className="size-4 text-white" />
                                                    </div>
                                                    <span>
                                                        Share on Facebook
                                                    </span>
                                                </button>

                                                <button
                                                    className="flex w-full items-center gap-3 border-t border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                                    onClick={() =>
                                                        handleCopyLink(cert)
                                                    }
                                                >
                                                    <div className="flex size-8 items-center justify-center rounded-lg bg-gray-100">
                                                        <Link className="size-4 text-gray-600" />
                                                    </div>
                                                    <span>Copy Link</span>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {!loading && filteredCerts?.length === 0 && (
                <div className="rounded-xl bg-white p-12 text-center shadow-sm">
                    <Award className="mx-auto mb-4 size-16 text-gray-300" />
                    <p className="text-gray-600">
                        No certificates found in this category.
                    </p>
                </div>
            )}
        </div>
    );
}
