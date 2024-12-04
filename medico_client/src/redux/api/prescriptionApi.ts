import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/types/common";
import { IDoctor } from "@/types/doctor";

export const prescriptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPrescription: build.mutation({
      query: (data) => ({
        url: "/prescription",
        method: "POST",
        contentType: "multipart/form-data",
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
      transformResponse: (response: IDoctor[], meta: IMeta) => {
        return {
          prescription: response,
          meta,
        };
      },
      providesTags: [tagTypes.prescription],
    }),
    getMyPrescription: build.query({
      query: () => ({
        url: "/prescription/my-prescriptions",
        method: "GET",
      }),
      providesTags: [tagTypes.prescription],
    }),
  }),
});

export const {
  useCreatePrescriptionMutation,
  useGetAllPrescriptionQuery,
  useGetMyPrescriptionQuery,
} = prescriptionApi;
