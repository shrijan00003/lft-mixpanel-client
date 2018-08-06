import store from '../store';
import { refreshLogin } from '../actions/authActions';
import {
  NAME,
  ACCESS_TOKEN,
  DETAILS_STORAGE,
  PARSE,
  STRINGIFY,
} from '../constants/auth/authConstants';

const auth = {
  // TO GET STORED TOKEN DATA
  getDetails(key) {
    if (localStorage && PARSE(localStorage.getItem(DETAILS_STORAGE))) {
      return PARSE(localStorage.getItem(DETAILS_STORAGE))[key] || null;
    }

    if (sessionStorage && PARSE(sessionStorage.getItem(DETAILS_STORAGE))) {
      return PARSE(sessionStorage.getItem(DETAILS_STORAGE))[key] || null;
    }

    return null;
  },

  //  FUNCTION THAT CALLS GET TO GET STORED TOKEN
  getToken(tokenKey = ACCESS_TOKEN) {
    return auth.getDetails(tokenKey);
  },

  // FUNCTON THAT SAVES TOKEN LOCALLY TO AUTHENTICATE USERS
  authenticate(userCredentisls) {
    const initialDetails = {
      id: userCredentisls.data.id,
      name: userCredentisls.data.userName,
      accessToken: userCredentisls.data.accessToken,
      refreshToken: userCredentisls.data.refreshToken,
    };

    localStorage.setItem(DETAILS_STORAGE, STRINGIFY(initialDetails));
  },

  // SETTING NEW ACCESS TOKEN AND REFRESH TOKEN
  setNewTokens(tokens) {
    let refreshedDetails = PARSE(localStorage.getItem(DETAILS_STORAGE));
    refreshedDetails.accessToken = tokens.accessToken;
    refreshedDetails.refreshToken = tokens.refreshToken;

    localStorage.setItem(DETAILS_STORAGE, STRINGIFY(refreshedDetails));
    store.dispatch(
      refreshLogin({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      })
    );
  },

  // GET USER DETAILS
  getUserDetails(infoKey = NAME) {
    return auth.getDetails(infoKey);
  },

  // CLEARS THE STORED VALUES FROM STORAGE
  clear() {
    if (localStorage && localStorage.getItem(DETAILS_STORAGE)) {
      return localStorage.removeItem(DETAILS_STORAGE) || null;
    }

    if (sessionStorage && sessionStorage.getItem(DETAILS_STORAGE)) {
      return sessionStorage.removeItem(DETAILS_STORAGE) || null;
    }

    return null;
  },

  // CALLS CLEAR TO CLEAR TOKENS WHILE SIGNOUT
  clearDetails() {
    return auth.clear();
  },
};

export default auth;
