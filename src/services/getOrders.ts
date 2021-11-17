import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order } from '@/src/types/Order';

const baseUrl = process.env.API_URL || 'http://localhost:3000/api';

const createRequest = (url: string) => ({ url: url });

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], {}>({
      query: () => createRequest(`/orders`),
    }),
    getOrderDetails: builder.query<Order, { id: string }>({
      query: ({ id }) => createRequest(`/orders/${id}`),
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderDetailsQuery } = ordersApi;
