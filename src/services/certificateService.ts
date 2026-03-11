import axios from "axios";
import { ENDPOINTS } from "@/utils/endpoints";

const certificateServices = {
    fetchCertificate: async (id: string) => {
        try {
            const { getCertificate } = ENDPOINTS;
            const token = localStorage.getItem("token");

            const certificate = await axios.get(
                getCertificate.replace(":certificateId", id),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            return {
                success: certificate.data.success,
                data: certificate.data,
                error: certificate.data.message || null,
            };
        } catch (error: any) {
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    error.message ||
                    "Certificate not found",
            };
        }
    },

    fetchCertificates: async () => {
        try {
            const { getCertificates } = ENDPOINTS;
            const token = localStorage.getItem("token");

            const certificates = await axios.get(getCertificates, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return {
                success: certificates.data.success,
                data: certificates.data,
                error: certificates.data.message || null,
            };
        } catch (error: any) {
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    error.message ||
                    "Certificate not found",
            };
        }
    },
};

export default certificateServices;
