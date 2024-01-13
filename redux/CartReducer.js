import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      // check if item is already in cart: increment quantity or add to state
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const remainingItems = state.cart.filter(
        (item) => item.id !== action.payload.id
      );

      state.cart = remainingItems;
    },

    incrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );

      itemPresent.quantity++;
    },

    decrementQuantity: (state, action) => {
      // find item in cart(state)
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemPresent.quantity === 0) {
        itemPresent.quantity = 0;
        const remainingItems = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = remainingItems;
      } else {
        itemPresent.quantity--;
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
