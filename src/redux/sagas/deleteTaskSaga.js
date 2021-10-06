import { call, takeLeading } from 'redux-saga/effects';
import { deleteTaskFromFirebase } from 'src/redux/slices/taskSlice';
import { deleteTaskById } from 'src/services/database';

export function* deleteTaskFlow({ payload }) {
  try {
    const { taskId } = payload;

    yield call(deleteTaskById, taskId);
  } catch (exception) {
    console.log({ source: 'Exception from deleteTaskSaga', exception });
  }
}

export const deleteTaskSaga = [takeLeading(deleteTaskFromFirebase.type, deleteTaskFlow)];
