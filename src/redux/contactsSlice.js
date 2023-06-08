import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const pendingReducer = state => {
  state.isLoading = true;
};
const rejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const fetchContactsFulfilledReducer = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload;
};
const addContactFulfilledReducer = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items.splice(0, 0, action.payload);
};
const deleteContactFulfilledReducer = (state, action) => {
  state.isLoading = false;
  state.error = null;
  // state.items = state.items.filter(({ id }) => id !== action.payload);
  const index = state.items.findIndex(({ id }) => id === action.payload.id);
  state.items.splice(index, 1);
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, pendingReducer)
      .addCase(fetchContacts.fulfilled, fetchContactsFulfilledReducer)
      .addCase(fetchContacts.rejected, rejectedReducer)
      .addCase(addContact.pending, pendingReducer)
      .addCase(addContact.fulfilled, addContactFulfilledReducer)
      .addCase(addContact.rejected, rejectedReducer)
      .addCase(deleteContact.pending, pendingReducer)
      .addCase(deleteContact.fulfilled, deleteContactFulfilledReducer)
      .addCase(deleteContact.rejected, rejectedReducer),
});

export const contactsReducer = contactsSlice.reducer;
