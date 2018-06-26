const initialState = {
  isLoggedIn: false,
  user: {
    name: null,
    uid: null,
    jwt: null,
  },
};

function authenticationReducer(state = initialState, action) {
  return state;
}

export default authenticationReducer;
