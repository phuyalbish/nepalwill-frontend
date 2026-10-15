import { createSlice, createSelector } from "@reduxjs/toolkit";

export const FAVORITES_STORAGE_KEY = "nepalwill:favorites";
export const FAVORITE_TYPES = ["event", "program", "story", "blog"];

/** Key for a favorite: `${type}:${slug}`. */
export const favoriteKey = (type, slug) => `${type}:${slug}`;

/** Read persisted favorites. Never throws (private mode, bad JSON, blocked storage). */
export function loadFavorites() {
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const items = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (
        value &&
        FAVORITE_TYPES.includes(value.type) &&
        typeof value.slug === "string" &&
        typeof value.title === "string" &&
        key === favoriteKey(value.type, value.slug)
      ) {
        // Only known fields survive, all coerced to strings, so a hand-edited or old entry cannot crash a card.
        items[key] = {
          type: value.type,
          slug: value.slug,
          title: value.title,
          image_url: typeof value.image_url === "string" ? value.image_url : "",
          ...(typeof value.date === "string" && value.date ? { date: value.date } : {}),
          ...(typeof value.subtitle === "string" && value.subtitle ? { subtitle: value.subtitle } : {}),
        };
      }
    }
    return items;
  } catch {
    return {};
  }
}

/** Write favorites. Never throws. */
export function saveFavorites(items) {
  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable: favorites stay in memory for this session */
  }
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: () => ({ items: loadFavorites() }),
  reducers: {
    /** payload: { type, slug, title, image_url, date?, subtitle? } */
    toggleFavorite(state, { payload }) {
      const key = favoriteKey(payload.type, payload.slug);
      if (state.items[key]) {
        delete state.items[key];
      } else {
        state.items[key] = {
          type: payload.type,
          slug: payload.slug,
          title: payload.title,
          image_url: payload.image_url ?? null,
          ...(payload.date ? { date: payload.date } : {}),
          ...(payload.subtitle ? { subtitle: payload.subtitle } : {}),
        };
      }
    },
    /** payload: key string such as "event:spring-fair" */
    removeFavorite(state, { payload }) {
      delete state.items[payload];
    },
    clearFavorites(state) {
      state.items = {};
    },
    /** payload: the sanitized items map from loadFavorites(); used to sync with other tabs. */
    hydrateFavorites(state, { payload }) {
      state.items = payload;
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites, hydrateFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

const selectItems = (state) => state.favorites.items;

/** Number of saved favorites. */
export const selectFavoriteCount = (state) => Object.keys(state.favorites.items).length;

/** Factory: selectIsFavorite(key)(state) -> boolean. Use with useSelector(selectIsFavorite(key)). */
export const selectIsFavorite = (key) => (state) => Boolean(state.favorites.items[key]);

/** { event: [], program: [], story: [], blog: [] } of favorite objects, in insertion order. */
export const selectFavoritesByType = createSelector([selectItems], (items) => {
  const grouped = { event: [], program: [], story: [], blog: [] };
  for (const item of Object.values(items)) grouped[item.type]?.push(item);
  return grouped;
});
