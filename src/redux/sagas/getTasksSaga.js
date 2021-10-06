import { put, select, call, takeLeading } from 'redux-saga/effects';
import { getTasksFromFirebase, setTasks } from 'src/redux/slices/taskSlice';
import { selectUserId } from 'src/redux/slices/userSlice';
import { getTasksByUserId } from 'src/services/database';

export function* getTasksFlow() {
  try {
    const userId = yield select(selectUserId);
    const tasks = yield call(getTasksByUserId, userId);

    yield put(setTasks({ tasks }, {}));
  } catch (exception) {
    console.log({ source: 'Exception from getTasksSaga', exception });
  }
}

export const getTasksSaga = [takeLeading(getTasksFromFirebase.type, getTasksFlow)];
