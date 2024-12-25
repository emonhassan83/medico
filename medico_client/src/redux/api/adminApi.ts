import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/types/common";
import { TAdmin } from "@/types/admin";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmin: build.mutation({
      query: (data) => ({
        url: "/user/create-admin",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    getAllAdmin: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/admin",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: TAdmin[], meta: IMeta) => {
        return {
          receptionist: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),

    getAdmin: build.query({
      query: (id: string | undefined) => ({
        url: `/admin/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),

    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    softDeleteAdmin: build.mutation({
      query: (id) => ({
        url: `/admin/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    updateAdmin: build.mutation({
      query: (data) => {
        return {
          url: `/admin/${data.id}`,
          method: "PATCH",
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.admin, tagTypes.user],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAllAdminQuery,
  useGetAdminQuery,
  useDeleteAdminMutation,
  useSoftDeleteAdminMutation,
  useUpdateAdminMutation,
} = adminApi;
