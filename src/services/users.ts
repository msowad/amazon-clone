import { PaginatedResponse } from "@/src/types/PaginatedResponse";
import { User } from "@/src/types/User";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      (process.env.NEXT_PUBLIC_API_URL || "https://amazon-clone.up.railway.app/api") +
      "/users",
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query<
      PaginatedResponse<User[]>,
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
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
