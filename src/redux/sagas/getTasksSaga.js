import { put, select, call, takeLeading } from 'redux-saga/effects';
import { callFirebase, setTasks } from '@reduxStore/slices/taskSlice';
import { selectUserId } from '@reduxStore/slices/userSlice';
import { getTasksByUserId } from '@services/database';

export function* getTasksFlow() {
  try {
    const userId = yield select(selectUserId);
    const tasks = yield call(getTasksByUserId, userId);

    yield put(setTasks({ tasks }));
  } catch (exception) {
    console.log({ exception });
  }
}

export const getTasksSaga = [takeLeading(callFirebase.type, getTasksFlow)];
