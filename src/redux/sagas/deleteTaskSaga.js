import { put, call, takeLeading } from 'redux-saga/effects';
import { getTasksFromFirebase, deleteTaskFromFirebase } from '@reduxStore/slices/taskSlice';
import { deleteTaskById } from '@services/database';

export function* deleteTaskFlow({ payload }) {
  try {
    const { taskId } = payload;

    yield call(deleteTaskById, taskId);
    yield put(getTasksFromFirebase());
  } catch (exception) {
    console.log({ source: 'Exception from deleteTaskSaga', exception });
  }
}

export const deleteTaskSaga = [takeLeading(deleteTaskFromFirebase.type, deleteTaskFlow)];
