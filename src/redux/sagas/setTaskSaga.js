import { put, select, call, takeLeading } from 'redux-saga/effects';
import { getTasksFromFirebase, setTask2Firebase } from '@reduxStore/slices/taskSlice';
import { selectUserId } from '@reduxStore/slices/userSlice';
import { sendTask2Firebase } from '@services/database';

export function* setTaskFlow({ payload }) {
  try {
    const userId = yield select(selectUserId);
    const { task } = payload;

    yield call(sendTask2Firebase, task, userId);

    yield put(getTasksFromFirebase());
  } catch (exception) {
    console.log({ source: 'Exception from setTaskSaga', exception });
  }
}

export const setTaskSaga = [takeLeading(setTask2Firebase.type, setTaskFlow)];
