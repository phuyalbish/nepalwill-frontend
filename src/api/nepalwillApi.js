import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * RTK Query client for the NepalWill Django API. All GET responses are plain,
 * unpaginated JSON. Mutations reject with {status, data}; use `.unwrap()` and read
 * error.data.detail (409 on a full event also carries registered_count and capacity).
 */
export const nepalwillApi = createApi({
  reducerPath: "nepalwillApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL || "/api",
  }),
  tagTypes: ["Program", "Event", "Story", "Contribution", "Site", "Gallery"],
  endpoints: (build) => ({
    getPrograms: build.query({
      query: () => "programs/",
      providesTags: [{ type: "Program", id: "LIST" }],
    }),
    getProgram: build.query({
      query: (slug) => `programs/${slug}/`,
      providesTags: (result, error, slug) => [{ type: "Program", id: slug }],
    }),

    /** arg: { upcoming?: boolean } */
    getEvents: build.query({
      query: ({ upcoming } = {}) => ({
        url: "events/",
        params: { upcoming: upcoming ? 1 : undefined },
      }),
      providesTags: [{ type: "Event", id: "LIST" }],
    }),
    getEvent: build.query({
      query: (slug) => `events/${slug}/`,
      providesTags: (result, error, slug) => [{ type: "Event", id: slug }],
    }),
    /** arg: { slug, name, email, attendees, message } */
    registerForEvent: build.mutation({
      query: ({ slug, ...body }) => ({
        url: `events/${slug}/register/`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: "Event", id: slug },
        { type: "Event", id: "LIST" },
      ],
    }),

    /** arg: { kind?: 'story'|'blog', category?: 'contributor'|'life_changed', featured?: boolean } */
    getStories: build.query({
      query: ({ kind, category, featured } = {}) => ({
        url: "stories/",
        params: { kind, category, featured: featured ? 1 : undefined },
      }),
      providesTags: [{ type: "Story", id: "LIST" }],
    }),
    getStory: build.query({
      query: (slug) => `stories/${slug}/`,
      providesTags: (result, error, slug) => [{ type: "Story", id: slug }],
    }),

    getContributions: build.query({
      query: () => "contributions/",
      providesTags: [{ type: "Contribution", id: "LIST" }],
    }),
    getSite: build.query({
      query: () => "site/",
      providesTags: ["Site"],
    }),
    getGallery: build.query({
      query: () => "gallery/",
      providesTags: ["Gallery"],
    }),

    /** arg: { name, email, phone?, inquiry_type, extra?, message } */
    createContact: build.mutation({
      query: (body) => ({ url: "contacts/", method: "POST", body }),
    }),
  }),
});

export const {
  useGetProgramsQuery,
  useGetProgramQuery,
  useGetEventsQuery,
  useGetEventQuery,
  useRegisterForEventMutation,
  useGetStoriesQuery,
  useGetStoryQuery,
  useGetContributionsQuery,
  useGetSiteQuery,
  useGetGalleryQuery,
  useCreateContactMutation,
} = nepalwillApi;
