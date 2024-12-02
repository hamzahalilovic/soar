import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Card } from "../../types/Card";

export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const response = await axios.get<Card[]>("http://localhost:5001/cards");
  return response.data;
});

interface CardsState {
  data: Card[];
  loading: boolean;
  error: string | null;
}

const initialState: CardsState = {
  data: [],
  loading: false,
  error: null,
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cards";
      });
  },
});

export default cardsSlice.reducer;
