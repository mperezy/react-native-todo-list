import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, { payload }) => ({
      ...state,
      tasks: payload.tasks,
    }),
    callFirebase: () => {},
  },
});

export const { setTasks, callFirebase } = taskSlice.actions;

export const selectTasks = (state) => state.task.tasks;
