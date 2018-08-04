import { combineReducers } from 'redux';
import signupReducer from './signupReducer';

const reducer = combineReducers({
  form: signupReducer,
});

export default reducer;
