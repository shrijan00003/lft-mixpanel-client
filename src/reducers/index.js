import { combineReducers } from 'redux';
import authReducer from './authReducer';
import signupReducer from './signupReducer';

const reducer = combineReducers({
  form: signupReducer,
  auth: authReducer,
});

export default reducer;
