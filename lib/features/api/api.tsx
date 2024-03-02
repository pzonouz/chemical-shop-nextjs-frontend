import { Category } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BACKEND_URL,
    // prepareHeaders(headers) {
    //   headers.set("", "");
    //   return headers;
    // },
  }),
  endpoints(builder) {
    return {
      fetchCategories: builder.query<Category[], number | void>({
        query(limit = 10) {
          return `/api/categories?limit=${limit}`;
        },
      }),
      deleteCategory: builder.mutation<string, string>({
        query: (id) => ({
          url: `/admin/api/categories/${id}`,
          method: "DELETE",
        }),
      }),
    };
  },
});

export const { useFetchCategoriesQuery, useDeleteCategoryMutation } = apiSlice;
