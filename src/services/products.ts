import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaginatedResponse } from "../types/PaginatedResponse";
import { Product } from "@/src/types/Product";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api") +
      "/products",
  }),
  tagTypes: ["Products"],
  endpoints: (build) => ({
    getProducts: build.query<
      PaginatedResponse<Product[]>,
      {
        limit: number;
        page: number;
        field: string;
        sort: string;
        search: string;
      }
    >({
      query: ({ page, limit, field, sort, search }) =>
        `/?page=${page}&limit=${limit}&field=${field}&sort=${sort}&search=${search}`,
      providesTags: (results, error, arg) =>
        results
          ? [
              ...results.docs.map(({ _id }) => ({
                type: "Products" as const,
                id: _id,
              })),
              "Products",
            ]
          : ["Products"],
    }),
    addProduct: build.mutation<Product, FormData>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation<Product, FormData>({
      query: (body) => ({
        url: `update`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => [{ type: "Products", id: result?._id }],
    }),
    deleteProduct: build.mutation<any, { id: string }>({
      query: (body) => ({
        url: `delete/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => [{ type: "Products", id: result?._id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
