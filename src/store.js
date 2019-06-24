import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { logger } from 'redux-logger';

const middleWare = applyMiddleware(thunk);

const store = createStore(
  reducer,
  compose(
    middleWare,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
