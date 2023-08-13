import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        providesTags: (results, error, users) => {
          const tags = results.map((user) => {
            return { type: 'User', id: user.id };
          });
          tags.push({ type: 'Users', id: users.id });
          return tags;
        },
        query: (users) => {
          return {
            url: '/users',
            method: 'GET',
            params: {
              userId: users.id,
            },
          };
        },
      }),
      addUser: builder.mutation({
        invalidatesTags: (results, error, users) => {
          return [{ type: 'Users', id: users.id }];
        },
        query: (users) => {
          return {
            url: '/users',
            method: 'POST',
            body: {
              userId: users.id,
              title: faker.person.fullName(),
            },
          };
        },
      }),
      removeUser: builder.mutation({
        invalidatesTags: (results, error, user) => {
          return [{ type: 'User', id: user.id }];
        },
        query: (user) => {
          return {
            url: `/users/${user.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } =
  usersApi;
export { usersApi };
