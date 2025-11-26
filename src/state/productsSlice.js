import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const raw = localStorage.getItem('exza_products_v1');
    if (!raw) return { listings: [], cartItems: [] };
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load products from localStorage", e);
    return { listings: [], cartItems: [] };
  }
};

const initial = loadState();

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    listings: initial.listings || [],
    cartItems: initial.cartItems || [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.listings.push(action.payload);
    },


    addToCart: (state, action) => {
      const item = action.payload;
      const listing = state.listings.find(l => l.id === item.id);

      if (listing && listing.status === 'sold') return;

      const exists = state.cartItems.find(ci => ci.id === item.id);

      if (!exists) {
        state.cartItems.push({ ...item, quantity: item.quantity ? Number(item.quantity) : 1 });
      } else {
        exists.quantity = (Number(exists.quantity) || 0) + (Number(item.quantity) || 1);
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(i => i.id !== id);
    },

    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const q = Number(quantity) || 0;
      if (q <= 0) {
        state.cartItems = state.cartItems.filter(i => i.id !== id);
      } else {
        const item = state.cartItems.find(i => i.id === id);
        if (item) item.quantity = q;
      }
    },

    markAsSold: (state, action) => {
      const id = action.payload;
      const listing = state.listings.find(p => p.id === id);
      if (listing) listing.status = 'sold';
      state.cartItems = state.cartItems.filter(item => item.id !== id);
    },

    clearCart: (state) => {
      state.cartItems = [];
    }
  },
});

export const {
  addProduct,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  markAsSold,
  clearCart
} = productsSlice.actions;

export default productsSlice.reducer;
