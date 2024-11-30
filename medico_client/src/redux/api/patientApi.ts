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
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.patient],
    }),
    // getAllPatient: build.query({
    //   query: () => ({
    //     url: "/patient",
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.patient],
    // }),

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
  }),
});

export const { useCreatePatientMutation, useGetAllPatientQuery } = patientApi;
