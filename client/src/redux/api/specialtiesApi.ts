import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialty: build.mutation({
      query: (data) => ({
        url: "/specialties",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.specialties],
    }),

    getAllSpecialties: build.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
      }),
      providesTags: [tagTypes.specialties],
    }),
    getSingleSpecialties: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/specialties/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.specialties],
    }),
    updateSpecialties: build.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: `/specialties/${data.id}`,
          method: "PATCH",
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.specialties],
    }),

    deleteSpecialty: build.mutation({
      query: (id) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
  }),
});

export const {
  useCreateSpecialtyMutation,
  useGetAllSpecialtiesQuery,
  useGetSingleSpecialtiesQuery,
  useUpdateSpecialtiesMutation,
  useDeleteSpecialtyMutation,
} = specialtiesApi;
