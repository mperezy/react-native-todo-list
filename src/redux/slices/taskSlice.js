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
    unsetTasks: () => ({ ...initialState }),
    getTasksFromFirebase: () => {},
    setTask2Firebase: () => {},
    deleteTaskFromFirebase: () => {},
  },
});

export const {
  setTasks,
  unsetTasks,
  getTasksFromFirebase,
  setTask2Firebase,
  deleteTaskFromFirebase,
} = taskSlice.actions;

export const selectTasks = (state) => state.task.tasks;
