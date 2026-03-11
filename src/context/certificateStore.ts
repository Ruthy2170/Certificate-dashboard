import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Certificate } from "@/types/Certificates";
import certificateService from "@/services/certificateService";

interface CertState {
    certificates: Certificate[];
    loading: boolean;
    setCertificates: (certificates: Certificate[]) => void;
    fetchCertificates: () => Promise<void>;
    clearCertificates: () => void;
}

const useCertStore = create<CertState>()(
    persist(
        (set) => ({
            certificates: [],
            loading: false,
            setCertificates: (certificates) => set({ certificates }),
            fetchCertificates: async () => {
                set({ loading: true });
                try {
                    const response =
                        await certificateService.fetchCertificates();
                    set({ certificates: response.data.certificates });
                    console.log("cert output: ", response.data);
                } catch (error) {
                    console.error("Failed to fetch certificates", error);
                } finally {
                    set({ loading: false });
                }
            },
            clearCertificates: () => set({ certificates: [] }),
        }),
        {
            name: "cert-storage",
            partialize: (state) => ({ certificates: state.certificates }),
        },
    ),
);

export default useCertStore;
