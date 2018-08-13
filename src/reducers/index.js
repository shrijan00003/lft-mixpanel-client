import { combineReducers } from 'redux';
import authReducer from './authReducer';
import signupReducer from './signupReducer';
import profileReducer from './profileReducer';

const reducer = combineReducers({
  auth: authReducer,
  form: signupReducer,
  profile: profileReducer,
});

export default reducer;
