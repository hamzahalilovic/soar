import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./slices/cardsSlice";
import transactionsReducer from "./slices/transactionsSlice";
import chartsReducer from "./slices/chartsSlice";
import contactsReducer from "./slices/contactsSlice";

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    transactions: transactionsReducer,
    charts: chartsReducer,
    contacts: contactsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
