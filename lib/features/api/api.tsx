import { Category, Product, User } from "@/app/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

const token = getCookie("access");
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    // prepareHeaders: (headers) => {
    //   getCookie("access")
    //     ? headers.append("Authorization", `JWT ${getCookie("access")}`)
    //     : null;
    //   return headers;
    // },
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
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
      registerUser: builder.mutation<User, Partial<User>>({
        query: (user) => {
          return { url: `/api/auth/users/`, method: "POST", body: user };
        },
      }),
      loginUser: builder.mutation<User, Partial<User>>({
        query: (user) => {
          return {
            url: `/api/auth/jwt/create/`,
            method: "POST",
            body: user,
            credentials: "include",
          };
        },
      }),
      activateUser: builder.query<any, any>({
        query: (data) => {
          return {
            url: `/api/auth/users/activation/`,
            method: "POST",
            body: data,
          };
        },
      }),
      fetchUser: builder.query<User, void>({
        query: () => {
          return { url: `/api/auth/users/` };
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
  useRegisterUserMutation,
  useEditUserMutation,
  useLoginUserMutation,
  useActivateUserQuery,
} = apiSlice;
