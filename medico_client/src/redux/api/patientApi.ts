import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/types/common";
import { IPatient } from "@/types/patientType";

export const patientApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPatient: build.mutation({
      query: (data) => ({
        url: "/user/create-patient",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.patient],
    }),
    
    getAllPatient: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/patient",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IPatient[], meta: IMeta) => {
        return {
          patients: response,
          meta,
        };
      },
      providesTags: [tagTypes.patient],
    }),

    getSinglePatient: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/patient/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.patient],
    }),

    deletePatient: build.mutation({
      query: (id) => ({
        url: `/patient/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.patient],
    }),
    softDeletePatient: build.mutation({
      query: (id) => ({
        url: `/patient/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.patient],
    }),

    // update a patient
    updatePatient: build.mutation({
      query: (data) => {
        return {
          url: `/patient/${data.id}`,
          method: "PATCH",
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.patient, tagTypes.user],
    }),
  }),
});

export const {
  useCreatePatientMutation,
  useGetAllPatientQuery,
  useGetSinglePatientQuery,
  useDeletePatientMutation,
  useSoftDeletePatientMutation,
  useUpdatePatientMutation,
} = patientApi;
