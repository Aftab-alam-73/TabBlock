import { apiSlice } from "./apiSlice";
import { GET_ALL_APPLICATIONS } from "./constant";
import { AppResponseType } from "../../types/type";

const appSlice=apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllApplications: builder.query<AppResponseType, void>({
            query: () => ({
                url: GET_ALL_APPLICATIONS,
            }),
        }),
    }),
})
export const {useGetAllApplicationsQuery}=appSlice;