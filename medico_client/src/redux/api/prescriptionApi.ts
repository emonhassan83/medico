import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const prescriptionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPrescription: build.mutation({
      query: (data) => ({
        url: "/prescription",
        method: "POST",
        data,
      }),
       invalidatesTags: [tagTypes.prescription],
    }),

    getAllPrescriptions: build.query({
      query: () => ({
        url: "/prescription",
        method: "GET",
      }),
        providesTags: [tagTypes.prescription],
    }),

    myPrescription: build.query({
      query: () => ({
        url: `/prescription/my-prescription`,
        method: "GET",
      }),
      providesTags: [tagTypes.prescription],
    }),
  }),
});

export const {
  useCreatePrescriptionMutation,
  useGetAllPrescriptionsQuery,
  useMyPrescriptionQuery,
} = prescriptionsApi;
