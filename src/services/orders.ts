import { Order } from "@/src/types/Order";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaginatedResponse } from "../types/PaginatedResponse";

const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ||
    "https://amazon-clone.up.railway.app/api") + "/orders";

const createRequest = (url: string) => ({ url: url });

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query<
      PaginatedResponse<Order[]>,
      {
        limit: number;
        page: number;
        field: string;
        sort: string;
        user?: boolean;
      }
    >({
      query: ({ page, limit, field, sort, user = false }) =>
        user
          ? "/user"
          : "" + `?page=${page}&limit=${limit}&field=${field}&sort=${sort}`,
      providesTags: ["Orders"],
    }),
    getOrderDetails: builder.query<Order, { id: string }>({
      query: ({ id }) => createRequest(`/${id}`),
      providesTags: ["Orders"],
    }),
    getOrderDetailsForAdmin: builder.query<Order, { id: string }>({
      query: ({ id }) => createRequest(`/admin/${id}`),
      providesTags: ["Orders"],
    }),
    updatePaymentStatus: builder.mutation<any, { id: string }>({
      query: (body) => ({
        url: `/update/payment`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => [{ type: "Orders", id: result?._id }],
    }),
    updateDeliveryStatus: builder.mutation<any, { id: string }>({
      query: (body) => ({
        url: `/update/delivery`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => [{ type: "Orders", id: result?._id }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useUpdatePaymentStatusMutation,
  useUpdateDeliveryStatusMutation,
  useGetOrderDetailsForAdminQuery,
} = ordersApi;
