import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
      console.log("add")
    },
    addQuantity: (state, action) => {
      // const index = (action.payload.i)
      state.products[action.payload.i].quantity +=1
      state.total += action.payload.product.price
    },
    removeQuantity: (state, action) => {
      // const index = (action.payload.i)
      state.products[action.payload.i].quantity -=1
      state.total -= action.payload.product.price
    },
    removeItem : (state, action)=>{
      const myArray = action.payload.cartItem
     const newarray= myArray.filter(item => item !== action.payload.product);
      state.products =newarray
      state.total -= action.payload.product.price
      state.quantity -= 1
      // console.log(newArray)
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset, addQuantity, removeQuantity,removeItem, remove } = cartSlice.actions;
export default cartSlice.reducer;