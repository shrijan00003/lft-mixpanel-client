import { combineReducers } from 'redux';
import authReducer from './authReducer';
import signupReducer from './signupReducer';
import profileReducer from './profileReducer';
import trackReducer from './trackReducer';
import pageReducer from './pageReducer';
import chartReducer from './chartReducer';
import userReducer from './userReducer';
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
