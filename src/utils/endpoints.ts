const BASE_URL = import.meta.env.VITE_BASE_URL;

export const ENDPOINTS = {
    login: `${BASE_URL}/auth/login`,
    signup: `${BASE_URL}/auth/register`,
    updateDetails: `${BASE_URL}/auth/updateDetails`,
    getCertificates: `${BASE_URL}/certificate/`,
    getCertificate: `${BASE_URL}/certificate/:certificateId`,
    getOrganisation: `${BASE_URL}/organisation/:id/organisation`,
};
