import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UrlItem, UrlAnalytics, UrlState } from '@/types/url.types';

const initialState: UrlState = {
  items: [],
  selectedUrl: null,
  activeAnalytics: null,
  searchQuery: '',
  isLoading: false,
  error: null,
};

export const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    setUrls: (state, action: PayloadAction<UrlItem[]>) => {
      state.items = action.payload;
    },
    addUrl: (state, action: PayloadAction<UrlItem>) => {
      state.items.unshift(action.payload);
    },
    removeUrl: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setSelectedUrl: (state, action: PayloadAction<UrlItem | null>) => {
      state.selectedUrl = action.payload;
    },
    setActiveAnalytics: (state, action: PayloadAction<UrlAnalytics | null>) => {
      state.activeAnalytics = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUrls,
  addUrl,
  removeUrl,
  setSelectedUrl,
  setActiveAnalytics,
  setSearchQuery,
  setLoading,
  setError,
} = urlSlice.actions;

export default urlSlice.reducer;
