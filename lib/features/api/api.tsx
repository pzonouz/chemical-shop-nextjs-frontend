import { Cart, Category, Product, User } from "@/app/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    credentials: "include",
    mode: "same-origin",
  }),
  tagTypes: ["User", "Category", "Product", "Cart"],
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
      fetchProduct: builder.query<Product, number | null>({
        query: (id) => {
          return {
            url: `/api/products/${id}`,
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
      fetchCartItems: builder.query<Cart[], void>({
        query: () => {
          return {
            url: `/api/cart-items/`,
          };
        },
        providesTags: ["Cart"],
      }),
      addToCart: builder.mutation<Cart, Partial<Cart>>({
        query: (cart: Cart) => {
          return {
            url: `/api/cart-items/`,
            method: "POST",
            body: cart,
          };
        },
        invalidatesTags: ["Cart"],
      }),
      registerUser: builder.mutation<User, Partial<User>>({
        query: (user) => {
          return { url: `/api/auth/users/`, method: "POST", body: user };
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
      //
      fetchUser: builder.query<User, void>({
        query: () => {
          return { url: `/api/auth/users/me` };
        },
        providesTags: ["User"],
      }),
      editUser: builder.mutation<User, Partial<User>>({
        query: (user: User) => {
          return {
            url: `/api/auth/users/me/`,
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
  useFetchProductQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useFetchUserQuery,
  useRegisterUserMutation,
  useEditUserMutation,
  useActivateUserQuery,
  useFetchCartItemsQuery,
  useAddToCartMutation,
} = apiSlice;
