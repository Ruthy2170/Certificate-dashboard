import axios from "axios";
import { ENDPOINTS } from "@/utils/endpoints";
import useUserStore from "@/context/userStore";

const certificateServices = {
    fetchCertificate: async (id: string) => {
        try {
            const { getCertificate } = ENDPOINTS;
            const { token } = useUserStore.getState();

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
            const { token } = useUserStore.getState();

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
