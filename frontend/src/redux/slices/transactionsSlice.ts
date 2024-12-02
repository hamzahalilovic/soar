import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Transaction } from "../../types/Transaction";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await axios.get<Transaction[]>(
      "https://soar-backend.vercel.app/data/transactions"
    );
    return response.data;
  }
);

interface TransactionsState {
  data: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  data: [],
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch transactions";
      });
  },
});

export default transactionsSlice.reducer;
