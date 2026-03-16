import axios from "axios";
import { ENDPOINTS } from "@/utils/endpoints";
import useUserStore from "@/context/userStore";

const organisationServices = {
    fetchOrganisation: async (id: string) => {
        try {
            const { getOrganisation } = ENDPOINTS;
            const { token } = useUserStore.getState();

            const organisation = await axios.get(
                getOrganisation.replace(":id", id),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            return {
                success: organisation.data.success,
                data: organisation.data,
                error: organisation.data.message || null,
            };
        } catch (error: any) {
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    error.message ||
                    "Organisation not found",
            };
        }
    },
};

export default organisationServices;
