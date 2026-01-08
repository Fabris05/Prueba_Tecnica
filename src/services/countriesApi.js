import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countriesApi = createApi({
    reducerPath: "countriesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1/" }),
    endpoints: (builder) => ({
        getAllCountries: builder.query({
            query: () => "all?fields=name,flags,cca3,region",
        }),

        getCountryByCode: builder.query({
            query: (code) => `alpha/${code}`,
        }),
    }),
});

export const { useGetAllCountriesQuery, useGetCountryByCodeQuery } =
    countriesApi;
