import { combineReducers } from 'redux';
import authReducer from './authReducer';
import signupReducer from './signupReducer';
import profileReducer from './profileReducer';
import trackReducer from './trackReducer';
import chartReducer from './chartReducer';
import { ACTIONS } from '../constants/authConstants';

const reducer = combineReducers({
  auth: authReducer,
  form: signupReducer,
  profile: profileReducer,
  track: trackReducer,
  chart: chartReducer,
});

const rootReducer = (state, action) => {
  if (action.type === ACTIONS.LOGOUT_FULFILLLED) {
    state = undefined;
  }
  return reducer(state, action);
};

export default rootReducer;
