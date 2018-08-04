const USER_INFO = 'name';
const ACCESS_TOKEN = 'accessToken';
const DETAILS_STORAGE = 'userDetails';

const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {
  // TO GET STORED TOKEN DATA
  getDetails(key) {
    if (localStorage && parse(localStorage.getItem(DETAILS_STORAGE))) {
      return parse(localStorage.getItem(DETAILS_STORAGE))[key] || null;
    }

    if (sessionStorage && parse(sessionStorage.getItem(DETAILS_STORAGE))) {
      return parse(sessionStorage.getItem(DETAILS_STORAGE))[key] || null;
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
      //   name: userCredentisls.data.name,
      accessToken: userCredentisls.data.accessToken,
      refreshToken: userCredentisls.data.refreshToken,
    };

    localStorage.setItem(DETAILS_STORAGE, stringify(initialDetails));
    console.log(initialDetails);
  },

  // SETTING NEW ACCESS TOKEN AND REFRESH TOKEN
  setNewTokens(tokens) {
    let refreshedDetails = parse(localStorage.getItem(DETAILS_STORAGE));
    refreshedDetails.accessToken = tokens.data.newAccessToken;
    refreshedDetails.refreshToken = tokens.data.newRefreshToken;

    localStorage.setItem(DETAILS_STORAGE, stringify(refreshedDetails));
  },

  // GET USER DETAILS
  getUserDetails(infoKey = USER_INFO) {
    return auth.getDetails(infoKey);
  },

  // CLEARS THE TOKENS FROM STORAGE
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
