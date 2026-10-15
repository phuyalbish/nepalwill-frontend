import { configureStore } from "@reduxjs/toolkit";
import { nepalwillApi } from "@/api/nepalwillApi";
import favoritesReducer, { saveFavorites } from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    [nepalwillApi.reducerPath]: nepalwillApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefault) => getDefault().concat(nepalwillApi.middleware),
});

// Persist favorites whenever the items map changes (reference compare keeps writes rare).
let lastItems = store.getState().favorites.items;
store.subscribe(() => {
  const { items } = store.getState().favorites;
  if (items !== lastItems) {
    lastItems = items;
    saveFavorites(items);
  }
});

export * from "./favoritesSlice";
