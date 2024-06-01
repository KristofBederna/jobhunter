import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from '../src/reducers/userReducer';
import jobReducer from '../src/reducers/jobReducer';
import applicantReducer from '../src/reducers/applicantReducer';

const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobReducer,
  applicants: applicantReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
