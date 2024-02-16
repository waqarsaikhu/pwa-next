import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
