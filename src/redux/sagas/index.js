import { all } from 'redux-saga/effects';
import { getTasksSaga } from './getTasksSaga';

export default function* IndexSagas() {
  yield all([...getTasksSaga]);
}
