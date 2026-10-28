import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/types/common";

export const appointmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAppointment: build.mutation({
      query: (data) => ({
        url: "/appointment",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.appointment],
    }),

    getAllAppointments: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/appointment",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: [], meta: IMeta) => {
        return {
          appointments: response,
          meta,
        };
      },
      providesTags: [tagTypes.appointment],
    }),

    getMyAppointments: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/appointment/my-appointment",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: [], meta: IMeta) => {
        return {
          appointments: response,
          meta,
        };
      },
      providesTags: [tagTypes.appointment],
    }),

    getAppointment: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/appointment/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.appointment],
    }),

    appointmentStatusChange: build.mutation({
      query: ({ id, status }) => ({
        url: `/appointment/status/${id}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: [tagTypes.appointment],
    }),

    deleteAppointment: build.mutation({
      query: (id) => ({
        url: `/appointment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.appointment],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetAllAppointmentsQuery,
  useGetMyAppointmentsQuery,
  useGetAppointmentQuery,
  useAppointmentStatusChangeMutation,
  useDeleteAppointmentMutation,
} = appointmentApi;
