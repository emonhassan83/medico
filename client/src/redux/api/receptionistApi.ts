import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/types/common";
import { TReceptionist } from "@/types/receptionistType";

export const receptionistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReceptionist: build.mutation({
      query: (data) => ({
        url: "/user/create-receptionist",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.receptionist],
    }),

    getAllReception: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/receptionist",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: TReceptionist[], meta: IMeta) => {
        return {
          receptionist: response,
          meta,
        };
      },
      providesTags: [tagTypes.receptionist],
    }),

    //get single receptionist
    getReceptionist: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/receptionist/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.receptionist],
    }),

    deleteReceptionist: build.mutation({
      query: (id) => ({
        url: `/receptionist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.receptionist],
    }),

    softDeleteReceptionist: build.mutation({
      query: (id) => ({
        url: `/receptionist/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.receptionist],
    }),

    // update a doctor
    updateReceptionist: build.mutation({
      query: (data) => {
        return {
          url: `/receptionist/${data.id}`,
          method: "PATCH",
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.receptionist, tagTypes.user],
    }),
  }),
});

export const {
  useCreateReceptionistMutation,
  useGetAllReceptionQuery,
  useGetReceptionistQuery,
  useDeleteReceptionistMutation,
  useSoftDeleteReceptionistMutation,
  useUpdateReceptionistMutation,
} = receptionistApi;
