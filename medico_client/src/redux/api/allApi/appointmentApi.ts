import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const appointmentRequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAppointment: build.mutation({
      query: (data) => ({
        url: "/appointment",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.appointment],
    }),

    getAllAppointment: build.query({
      query: () => ({
        url: "/appointment",
        method: "GET",
      }),
      providesTags: [tagTypes.appointment],
    }),
  }),
});

export const { useCreateAppointmentMutation, useGetAllAppointmentQuery } =
  appointmentRequestApi;
