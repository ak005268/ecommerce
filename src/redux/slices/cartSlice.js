import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    initialProducts: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    deleteFromCart: (state, action) => {
       toast.warning(`successfully deleted`);
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
       toast.warning(`successfully Clear all cart data`);

      state.items = [];
    },
    setInitialProducts: (state, action) => {
      state.initialProducts = action.payload;
    },
  },
});

export const { addToCart, deleteFromCart, clearCart, setInitialProducts } =
  cartSlice.actions;
export default cartSlice.reducer;
