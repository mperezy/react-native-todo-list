import { createSlice } from '@reduxjs/toolkit';

import { getUserDataFromLS } from '@utils/localStorageFuncs';

export const initialState = {
  id: getUserDataFromLS().userId || '',
  email: getUserDataFromLS().email || '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, { payload }) => ({
      ...state,
      id: payload.id,
      email: payload.email,
    }),
  },
});

export const { setUserData } = userSlice.actions;

export const selectUserId = (state) => state.user.id;
export const selectUserEmail = (state) => state.user.email;
