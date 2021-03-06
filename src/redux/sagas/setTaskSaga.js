import { select, call, takeLeading } from 'redux-saga/effects';
import { setTask2Firebase } from 'src/redux/slices/taskSlice';
import { selectUserId } from 'src/redux/slices/userSlice';
import { sendTask2Firebase } from 'src/services/database';

export function* setTaskFlow({ payload }) {
  try {
    const userId = yield select(selectUserId);
    const { task } = payload;

    yield call(sendTask2Firebase, task, userId);
  } catch (exception) {
    console.log({ source: 'Exception from setTaskSaga', exception });
  }
}

export const setTaskSaga = [takeLeading(setTask2Firebase.type, setTaskFlow)];
