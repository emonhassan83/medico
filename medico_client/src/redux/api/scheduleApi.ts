import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/types/common";

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSchedule: build.mutation({
      query: (data) => {
        return {
          url: "/schedule",
          method: "POST",
          data, 
        };
      },
      invalidatesTags: [tagTypes.schedule],
    }),

    getAllSchedules: build.query({
      query: (arg: Record<string, any>) => {
        // console.log(arg);
        
        return {
          url: "/schedule",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.schedule],
    }),

    getSingleSchedule: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/schedule/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.schedule],
    }),

    deleteSchedule: build.mutation({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useGetAllSchedulesQuery,
  useGetSingleScheduleQuery,
  useDeleteScheduleMutation,
} = scheduleApi;
