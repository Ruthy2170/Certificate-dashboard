export interface Certificate {
    _id: string;
    userId: string;
    courseName: string;
    organisationName: string;
    organisationId: string;
    organisationLogo: string;
    certificateKey: string;
    issuedAt: string;
    status: "release" | "withhold";
    createdAt: string;
    updatedAt: string;
    _v: number;
}
