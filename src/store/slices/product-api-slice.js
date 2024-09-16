import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApiSlice = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    //? Get all products, can be filtered by category
    getProducts: builder.query({
      query: ({ category }) => {
        if (category === "all") {
          return "/products";
        } else if (category) {
          return `/products/category/${category}`;
        } else {
          return "/products";
        }
      },
      providesTags: ["Products"],
    }),

    //? Get a single product by id
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),

    getProductCategory: builder.query({
      query: () => "/products/categories",
    }),

    //? Create a new product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useGetProductCategoryQuery,
} = productsApiSlice;
