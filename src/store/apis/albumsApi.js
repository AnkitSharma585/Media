import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (results, error, user) => {
          const tags = results.map((album) => {
            return { type: 'Album', id: album.id };
          });
          tags.push({ type: 'User', id: user.id });
          return tags;
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'GET',
            params: {
              userId: user.id,
            },
          };
        },
      }),

      addAlbum: builder.mutation({
        invalidatesTags: (results, error, user) => {
          return [{ type: 'User', id: user.id }];
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      removeAlbum: builder.mutation({
        invalidatesTags: (results, error, album) => {
          return [{ type: 'Album', id: album.id }];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});
export { albumsApi };
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
