import {
  Cart,
  Category,
  Favorite,
  Order,
  Process,
  Product,
  User,
} from "@/app/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    credentials: "include",
    mode: "same-origin",
    headers: { "Content-Type": "application/json" },
  }),
  tagTypes: ["User", "Category", "Product", "Cart", "Order", "Favorite"],
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
      fetchCartItem: builder.query<Cart, number>({
        query: (id: number) => {
          return {
            url: `/api/cart-items/${id}`,
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
      editCart: builder.mutation<Cart, Partial<Cart>>({
        query: (cart: Cart) => {
          return {
            url: `/api/cart-items/${cart.id}/`,
            method: "PATCH",
            body: cart,
          };
        },
        invalidatesTags: ["Cart"],
      }),
      deleteCart: builder.mutation<Cart, number>({
        query: (id: number) => {
          return {
            url: `/api/cart-items/${id}/`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Cart"],
      }),
      fetchOrders: builder.query<Order[], void>({
        query: () => {
          return {
            url: `/api/orders/`,
          };
        },
        providesTags: ["Order"],
      }),
      fetchAdminOrders: builder.query<Order[], void>({
        query: () => {
          return {
            url: `/api/admin/orders/`,
          };
        },
        providesTags: ["Order"],
      }),
      fetchOrder: builder.query<Order, number>({
        query: (id: number) => {
          return {
            url: `/api/orders/${id}`,
          };
        },
        providesTags: ["Order"],
      }),
      createOrder: builder.mutation<Order, Partial<Order>>({
        query: (order: Order) => {
          return {
            url: `/api/orders/`,
            method: "POST",
            body: order,
          };
        },
        invalidatesTags: ["Order", "Cart"],
      }),
      deleteOrder: builder.mutation<Order, number>({
        query: (id: number) => {
          return {
            url: `/api/admin/orders/${id}/`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Order", "Cart"],
      }),
      OrderNext: builder.mutation<Order, Partial<Process>>({
        query: (process: Process) => {
          return {
            url: `/api/admin/processes/`,
            method: "POST",
            body: process,
          };
        },
        invalidatesTags: ["Order"],
      }),
      registerUser: builder.mutation<User, Partial<User>>({
        query: (user) => {
          return { url: `/api/auth/users/`, method: "POST", body: user };
        },
      }),
      fetchFavorites: builder.query<Favorite[], void>({
        query: () => {
          return {
            url: `/api/favorites/`,
          };
        },
        providesTags: ["Favorite"],
      }),
      toggleFavorite: builder.mutation<void, Number>({
        query: (id: Number) => {
          return {
            url: `/api/favorites/`,
            method: "POST",
            body: { product: id },
          };
        },
        invalidatesTags: ["Favorite", "Product"],
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
          return { url: `/api/auth/users/me` };
        },
        providesTags: ["User"],
      }),
      fetchUsers: builder.query<User[], void>({
        query: () => {
          return { url: `/api/admin/users/` };
        },
        providesTags: ["User"],
      }),
      editUserProfile: builder.mutation<User, Partial<User>>({
        query: (user: User) => {
          return {
            url: `/api/admin/users/${user.id}/`,
            method: "PATCH",
            body: user,
          };
        },
        invalidatesTags: ["User"],
      }),
      disableUser: builder.mutation<User, Partial<User>>({
        query: (user: User) => {
          user.is_active = false;
          return {
            url: `/api/admin/users/${user.id}/`,
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
  useFetchUsersQuery,
  useRegisterUserMutation,
  useEditUserProfileMutation,
  useDisableUserMutation,
  useActivateUserQuery,
  useFetchCartItemsQuery,
  useAddToCartMutation,
  useEditCartMutation,
  useDeleteCartMutation,
  useFetchCartItemQuery,
  useFetchOrdersQuery,
  useFetchOrderQuery,
  useOrderNextMutation,
  useFetchAdminOrdersQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useFetchFavoritesQuery,
  useToggleFavoriteMutation,
} = apiSlice;
