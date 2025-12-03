import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productsReducer from "./productsSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const toSave = {
      listings: state.products?.listings ?? [],
      cartItems: state.products?.cartItems ?? [],
      auth: {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user, 
      },
    };
    localStorage.setItem("exza_products_v1", JSON.stringify(toSave));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
});

export default store;
