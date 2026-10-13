import { configureStore } from '@reduxjs/toolkit';

// dummy reducer with empty state
const dummyReducer = (state = {}) => state;

export const store = configureStore({
  reducer: dummyReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
