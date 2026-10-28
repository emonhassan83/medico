import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    getMyProfile: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    changeStatus: build.mutation({
      query: (userData) => ({
        url: `/user/${userData?.id}/status`,
        method: "PATCH",
        data: { status: userData?.status },
      }),
      invalidatesTags: [tagTypes.user],
    }),

    updateMyProfile: build.mutation({
      query: (data) => {
        // console.log(data);

        return {
          url: "/user/update-my-profile",
          method: "PUT",
          data,
        };
      },

      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetMyProfileQuery,
  useChangeStatusMutation,
  useUpdateMyProfileMutation,
} = userApi;
