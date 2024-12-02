import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Contact } from "../../types/Contact";

interface ContactsState {
  data: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await axios.get<Contact[]>(
      "https://soar-backend.vercel.app/data/contacts"
    );
    return response.data;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch contacts";
      });
  },
});

export default contactsSlice.reducer;
