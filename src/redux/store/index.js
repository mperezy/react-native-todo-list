import { configureStore } from '@reduxjs/toolkit';
import IndexSagas from 'src/redux/sagas/index';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from 'src/redux/slices/rootReducer';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: createRootReducer(),
  middleware,
});

sagaMiddleware.run(IndexSagas);

export default store;
