import { all } from 'redux-saga/effects';
import { getTasksSaga } from './getTasksSaga';
import { setTaskSaga } from './setTaskSaga';
import { deleteTaskSaga } from './deleteTaskSaga';

export default function* IndexSagas() {
  yield all([...getTasksSaga, ...setTaskSaga, ...deleteTaskSaga]);
}
