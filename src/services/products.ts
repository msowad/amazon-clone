import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../types/Product';

export interface ProductResponse {
  docs: Product[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
}

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api') +
      '/products',
  }),
  tagTypes: ['Products'],
  endpoints: (build) => ({
    getProducts: build.query<ProductResponse, { limit: number; page: number }>({
      query: ({ page, limit }) => `/?page=${page}&limit=${limit}`,
      providesTags: (results, error, arg) =>
        results
          ? [
              ...results.docs.map(({ _id }) => ({
                type: 'Products' as const,
                id: _id,
              })),
              'Products',
            ]
          : ['Products'],
    }),
    addProduct: build.mutation<Product, FormData>({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: build.mutation<Product, FormData>({
      query: (body) => ({
        url: `update`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => [{ type: 'Products', id: result?._id }],
    }),
    deleteProduct: build.mutation<any, { id: string }>({
      query: (body) => ({
        url: `delete/${body.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result) => [{ type: 'Products', id: result?._id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
