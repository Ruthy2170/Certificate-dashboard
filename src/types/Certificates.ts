export interface Certificate {
    _id: string;
    userId: string;
    organisationId: string;
    certificateKey: string;
    issuedAt: string;
    status: "release" | "withhold";
    createdAt: string;
    updatedAt: string;
    _v: number;
}
