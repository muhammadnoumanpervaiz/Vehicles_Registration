import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const VehicleApi = createApi({
  reducerPath: "Vehicle",
  tagTypes: ['Vehicle'],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/vehicle/" }),
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: () => `allvehicle`,
      providesTags : ["Vehicle"]
    }),
    createVahicle: builder.mutation({
        query: (values) => ({
          url: 'addVehicle',
          method: 'POST',
          body: values,
        }),
        invalidatesTags: ['Vehicle'],
      }),
    deletVehicle: builder.mutation({
        query: (id) => ({
            url: `${id}`,
            method: 'DELETE',
        }),
      invalidatesTags: ['Vehicle'],
      }),
      updateVehicle: builder.mutation({
        query: (values) => ({
          url: `updateVehicle`,
          method: 'PUT',
          body: values,
        }),
        invalidatesTags: ['Vehicle'],
      }),
  }),
});

export const CategoryApi = createApi({
    reducerPath: "category",
    tagTypes: ['Cateory'],
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/category/" }),
    endpoints: (builder) => ({
      getCategories: builder.query({
        query: () => `allcategories`,
        providesTags : ["Cateory"]
      }),
      createCategory: builder.mutation({
        query: (values) => ({
          url: 'addCategory',
          method: 'POST',
          body: values,
        }),
        invalidatesTags: ['Cateory'],
      }),
      deleteCategory: builder.mutation({
        query: (id) => ({
            url: `${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Cateory'],
      }),
      updateCategory: builder.mutation({
        query: (values) => ({
          url: `updateCategory`,
          method: 'PUT',
          body: values,
        }),
        invalidatesTags: ['Cateory'],
      }),
    }),
  });

  export const AuthApi = createApi({
    reducerPath: "Auth",
    tagTypes: ['Authentication'],
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth/" }),
    endpoints: (builder) => ({
      getUser: builder.query({
        query: () => `auth`,
        providesTags : ["Authentication"]
      }),
      createUserAccount: builder.mutation({
        query: (values) => ({
          url: 'signUp',
          method: 'POST',
          body: values,
        }),
        invalidatesTags: ['Authentication'],
      }),
      makeLoginPossible: builder.mutation({
        query: (values) => ({
          url: 'login',
          method: 'POST',
          body: values,
        }),
        invalidatesTags: ['Authentication'],
      }),
    })
  })
export const { useGetVehiclesQuery, useDeletVehicleMutation, useCreateVahicleMutation, useUpdateVehicleMutation } = VehicleApi;
export const {useGetCategoriesQuery, useDeleteCategoryMutation, useCreateCategoryMutation, useUpdateCategoryMutation} = CategoryApi;
export const {useCreateUserAccountMutation, useMakeLoginPossibleMutation} = AuthApi;