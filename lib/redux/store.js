import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer,orderReducer)
const orderPersistedReducer =persistReducer(persistConfig,orderReducer)
export const store = configureStore({
  reducer: { cart: persistedReducer, order:orderPersistedReducer},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

// export default configureStore({
//     reducer: {
//       cart: persistedReducer,
//     },
//   });

  