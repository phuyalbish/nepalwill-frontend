import { configureStore } from "@reduxjs/toolkit";
import { nepalwillApi } from "@/api/nepalwillApi";
import favoritesReducer, {
  FAVORITES_STORAGE_KEY,
  hydrateFavorites,
  loadFavorites,
  saveFavorites,
} from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    [nepalwillApi.reducerPath]: nepalwillApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefault) => getDefault().concat(nepalwillApi.middleware),
});

// Persist favorites whenever the items map changes (reference compare keeps writes rare).
let lastItems = store.getState().favorites.items;
let hydrating = false;
store.subscribe(() => {
  const { items } = store.getState().favorites;
  if (items !== lastItems) {
    lastItems = items;
    if (!hydrating) saveFavorites(items);
  }
});

// Keep tabs in sync: another tab wrote (or cleared) the favorites, so rehydrate without writing back.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key !== null && event.key !== FAVORITES_STORAGE_KEY) return;
    hydrating = true;
    try {
      store.dispatch(hydrateFavorites(loadFavorites()));
    } finally {
      hydrating = false;
    }
  });
}

export * from "./favoritesSlice";
