import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import pageReducer from './pageReducer';
import trackReducer from './trackReducer';
import chartReducer from './chartReducer';
import signupReducer from './signupReducer';
import profileReducer from './profileReducer';
import { ACTIONS } from '../constants/authConstants';

const reducer = combineReducers({
  auth: authReducer,
  form: signupReducer,
  profile: profileReducer,
  track: trackReducer,
  chart: chartReducer,
  page: pageReducer,
  userData: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === ACTIONS.LOGOUT_FULFILLED) {
    state = undefined;
  }
  return reducer(state, action);
};

export default rootReducer;
