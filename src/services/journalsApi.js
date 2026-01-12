import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const journalsApi = createApi({
    reducerPath: "journalsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com/",
    }),
    tagTypes: ["Trips"],
    endpoints: (builder) => ({
        getTrips: builder.query({
            query: () => "posts?_limit=10",
            providesTags: ["Trips"],
        }),

        addTrip: builder.mutation({
            query: (newTrip) => ({
                url: "posts",
                method: "POST",
                body: newTrip,
            }),
            async onQueryStarted(newTrip, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    journalsApi.util.updateQueryData(
                        "getTrips",
                        undefined,
                        (draft) => {
                            draft.unshift({ id: Date.now(), ...newTrip });
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        deleteTrip: builder.mutation({
            query: (id) => ({
                url: `posts/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    journalsApi.util.updateQueryData(
                        "getTrips",
                        undefined,
                        (draft) => {
                            return draft.filter((trip) => trip.id !== id);
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        updateTrip: builder.mutation({
            query: ({ id, ...updateTrip }) => ({
                url: `posts/${id}`,
                method: "PATCH",
                body: updateTrip,
            }),
            async onQueryStarted(
                { id, ...updateTrip },
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    journalsApi.util.updateQueryData(
                        "getTrips",
                        undefined,
                        (draft) => {
                            const trip = draft.find((t) => t.id === id);
                            if (trip) {
                                Object.assign(trip, { ...updateTrip });
                            }
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetTripsQuery,
    useAddTripMutation,
    useDeleteTripMutation,
    useUpdateTripMutation,
} = journalsApi;
