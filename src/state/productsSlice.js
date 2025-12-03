import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const raw = localStorage.getItem('exza_products_v1');
    if (!raw) return { listings: [], cartItems: [] };
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load products from localStorage', e);
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
      const payload = action.payload || {};
      if (!payload.createdAt) payload.createdAt = new Date().toISOString();

      const existingIndex = state.listings.findIndex((p) => p.id === payload.id);

      if (existingIndex !== -1) {
        state.listings.splice(existingIndex, 1);
        state.listings.unshift(payload);
        return;
      }

      state.listings.unshift(payload);
    },

    updateProduct: (state, action) => {
      const updated = action.payload;
      if (!updated || !updated.id) return;

      const idx = state.listings.findIndex((p) => String(p.id) === String(updated.id));
      
      if (idx !== -1) {
        state.listings[idx] = { ...state.listings[idx], ...updated };
      } else {
        state.listings.unshift(updated);
      }

      state.cartItems = state.cartItems.map((ci) => {
        if (String(ci.id) === String(updated.id)) {
          return {
            ...ci,
            title: updated.title ?? ci.title,
            price: updated.price ?? ci.price,
            imageUrl: updated.imageUrl ?? ci.imageUrl,
            status: updated.status ?? ci.status,
            quantity: ci.quantity ?? 1,
          };
        }
        return ci;
      });
    },

    deleteProduct(state, action) {
      const id = action.payload;
      if (!id) return;
      state.listings = state.listings.filter(p => String(p.id) !== String(id));
      state.cartItems = state.cartItems.filter(ci => String(ci.id) !== String(id));
    },

    removeProduct(state, action) {
      state.listings = state.listings.filter((p) => p.id !== action.payload);
    },

    addToCart: (state, action) => {
      const item = action.payload;
      if (!item || !item.id) return;

      const listing = state.listings.find((l) => l.id === item.id);
      if (listing && listing.status === 'sold') return;

      const idx = state.cartItems.findIndex((ci) => ci.id === item.id);
      const addQty = (n) => {
        const p = Number(n);
        return Number.isFinite(p) && p > 0 ? p : 1;
      };

      if (idx === -1) {
        state.cartItems.unshift({ ...item, quantity: addQty(item.quantity) });
      } else {
        state.cartItems[idx].quantity =
          (Number(state.cartItems[idx].quantity) || 0) + addQty(item.quantity);
        const [moved] = state.cartItems.splice(idx, 1);
        state.cartItems.unshift(moved);
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.id !== id);
    },

    markAsSold: (state, action) => {
      const id = action.payload;
      const listing = state.listings.find((p) => p.id === id);
      if (listing) listing.status = 'sold';
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addProduct,
  updateProduct,
  addToCart,
  deleteProduct,
  removeFromCart,
  updateCartQuantity,
  markAsSold,
  clearCart,
} = productsSlice.actions;

export default productsSlice.reducer;
