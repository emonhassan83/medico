import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/types/common";

export const prescriptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPrescription: build.mutation({
      query: (data) => ({
        url: "/prescription",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.prescription],
    }),

    getAllPrescription: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/prescription",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          prescription: response,
          meta,
        };
      },
      providesTags: [tagTypes.prescription],
    }),
   
    getMyPrescription: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/prescription/my-prescriptions",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          prescription: response,
          meta,
        };
      },
      providesTags: [tagTypes.prescription],
    }),

    deletePrescription: build.mutation({
      query: (id) => ({
        url: `/prescription/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.prescription],
    }),
  }),
});

export const {
  useCreatePrescriptionMutation,
  useGetAllPrescriptionQuery,
  useGetMyPrescriptionQuery,
  useDeletePrescriptionMutation
} = prescriptionApi;
