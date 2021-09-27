import { combineReducers } from '@reduxjs/toolkit';

import { userSlice } from './userSlice';
import { taskSlice } from './taskSlice';

const createRootReducer = () =>
  combineReducers({
    user: userSlice.reducer,
    task: taskSlice.reducer,
  });

export default createRootReducer;
