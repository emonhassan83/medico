import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const metaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMetaData: build.query({
      query: () => ({
        url: "/meta",
        method: "GET",
      }),
      providesTags: [tagTypes.meta],
    }),
  }),
});

export const { useGetAllMetaDataQuery } = metaApi;
