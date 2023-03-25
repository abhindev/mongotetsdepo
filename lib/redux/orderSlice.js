import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      const ans = (state.orders.some((obj) => obj._id === action.payload._id))
      console.log(ans)
      console.log(state.orders.some((obj)=>obj._id === action.payload._id))
      console.log(action.payload._id)
      if(ans!==true){
        state.orders.unshift(action.payload);
        console.log("added")
      } else {
        console.log("none")
      }
      // console.log("added")
      // state.orders.push(action.payload);
    },
    removeItem : (state, action)=>{
      const myArray = action.payload.orderItem
      const newarray= myArray.filter(item => item !== action.payload.order);
      state.orders =newarray
      // console.log(newArray)
    },
    reset: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, reset ,removeItem} = orderSlice.actions;
export default orderSlice.reducer;

