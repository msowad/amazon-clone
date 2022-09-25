import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface OverviewResponse {
  totalSell: number;
  totalOrders: number;
  totalUsersPlaceOrder: number;
  totalUsers: number;
}

export const sellApi = createApi({
  reducerPath: "sellApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api") +
      "/sell",
  }),
  tagTypes: ["Sell"],
  endpoints: (build) => ({
    getOverview: build.query<OverviewResponse, void>({
      query: () => "overview",
    }),
  }),
});

export const { useGetOverviewQuery } = sellApi;
