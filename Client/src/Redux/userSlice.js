import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: JSON.parse(localStorage.getItem("user")) || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload; // Set the user ID when dispatched
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUserId: (state) => {
      state.userId = null; // Clear the user ID when logged out
      localStorage.removeItem("user");
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer;
