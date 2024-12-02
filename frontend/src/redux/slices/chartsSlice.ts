import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ChartData } from "../../types/Chart";

export const fetchCharts = createAsyncThunk("charts/fetchCharts", async () => {
  const response = await axios.get<ChartData>("http://localhost:5001/charts");
  return response.data;
});

interface ChartsState {
  data: ChartData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChartsState = {
  data: null,
  loading: false,
  error: null,
};

const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCharts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch charts";
      });
  },
});

export default chartsSlice.reducer;
