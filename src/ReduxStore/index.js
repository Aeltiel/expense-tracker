import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { expenseSlice } from "./expense/expense-slice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { loggerMiddleware } from "../ReduxStore/middlewares/logger-middleware";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  //whitelist : ["EXPENSE"] ---> permet de persister uniquement les slices que tu veux
};
const rootReducers = combineReducers({ EXPENSE: expenseSlice.reducer });
const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,

  //le middleware, permet de retirer une erreur console lié au redux persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(loggerMiddleware.middleware),
});

const persistor = persistStore(store);
export { store, persistor };
