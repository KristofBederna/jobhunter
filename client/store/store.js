import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from '../src/reducers/userReducer';
import jobReducer from '../src/reducers/jobReducer';

const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
