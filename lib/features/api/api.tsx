import { Category, Product, User } from "@/app/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["User", "Category", "Product"],
  endpoints(builder) {
    return {
      fetchCategories: builder.query<Category[], number | void>({
        query: (limit = 10) => {
          return { url: `/api/categories/` };
        },
        providesTags: ["Category"],
      }),
      createCategory: builder.mutation<Category, Category>({
        query: (category) => {
          return {
            url: `/api/admin/categories/`,
            method: "POST",
            body: category,
          };
        },
        invalidatesTags: ["Category"],
      }),
      editCategory: builder.mutation<Category, Category>({
        query: (category) => {
          return {
            url: `/api/admin/categories/${category.id}/`,
            method: "PATCH",
            body: category,
          };
        },
        invalidatesTags: ["Category"],
      }),
      deleteCategory: builder.mutation<string, string>({
        query: (id) => {
          return {
            url: `/api/admin/categories/${id}/`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Category"],
      }),
      fetchProducts: builder.query<Product[], number | void>({
        query: (limit = 10) => {
          return {
            url: `/api/products/`,
          };
        },
        providesTags: ["Product"],
      }),
      createProduct: builder.mutation<Product, Product>({
        query: (product: Product) => {
          return {
            url: `/api/admin/products/`,
            method: "POST",
            body: product,
          };
        },
        invalidatesTags: ["Product"],
      }),
      editProduct: builder.mutation<Product, Product>({
        query: (product: Product) => {
          return {
            url: `/api/admin/products/${product.id}/`,
            method: "PATCH",
            body: product,
          };
        },
        invalidatesTags: ["Product"],
      }),
      deleteProduct: builder.mutation<Product, string>({
        query: (id: string) => {
          return {
            url: `/api/admin/products/${id}/`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Product"],
      }),
      fetchUser: builder.query<User, void>({
        query: () => {
          return { url: `/api/users/` };
        },
        providesTags: ["User"],
      }),
      editUser: builder.mutation<User, Partial<User>>({
        query: (user: User) => {
          return {
            url: `/api/users/`,
            method: "PATCH",
            body: user,
          };
        },
        invalidatesTags: ["User"],
      }),
    };
  },
});

export const {
  useFetchCategoriesQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useFetchProductsQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useFetchUserQuery,
  useEditUserMutation,
} = apiSlice;
