import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Certificate } from "@/types/Certificates";
import certificateService from "@/services/certificateService";
import organisationServices from "@/services/OrganisationServices";

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
            loading: true,
            setCertificates: (certificates) => set({ certificates }),
            fetchCertificates: async () => {
                try {
                    const response =
                        await certificateService.fetchCertificates();

                    const incoming: Certificate[] = response.data.certificates;
                    const current = useCertStore.getState().certificates;

                    // If store already has the same certificates, skip enrichment
                    // and avoid triggering a loading state (keeps instant feel)
                    const isSame =
                        incoming.length === current.length &&
                        incoming.every((cert) =>
                            current.some((c) => c._id === cert._id),
                        );

                    if (isSame) return;

                    // Only show loading when we actually need to re-enrich
                    set({ loading: true });

                    const rawCertificates: Certificate[] =
                        response.data.certificates;

                    const enrichedCertificates = await Promise.all(
                        rawCertificates.map(async (certificate) => {
                            console.log(
                                "organisationId:",
                                certificate.organisationId,
                            );
                            try {
                                const organisationDetails =
                                    await organisationServices.fetchOrganisation(
                                        certificate.organisationId,
                                    );

                                console.log(
                                    "organisation data: ",
                                    organisationDetails,
                                );

                                const { name, logo_url, course_name } =
                                    organisationDetails.data.data;

                                // Merge org info into the certificate object
                                return {
                                    ...certificate,
                                    organisationName: name,
                                    organisationLogo: logo_url,
                                    courseName: course_name,
                                };
                            } catch (error) {
                                console.error(
                                    `Failed to fetch organisation for certificate ${certificate._id}:`,
                                    error,
                                );

                                return certificate;
                            }
                        }),
                    );

                    console.log("Enriched certificate: ", enrichedCertificates);
                    set({ certificates: enrichedCertificates });
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
