import axios from "axios";

//action types
const GET_USER = "GET_USER";
const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";

//action creators // functions return an object
const gotMe = (user) => ({
  type: GET_USER,
  user,
});

const setFetchingStatus = (isFetching) => ({
  type: SET_FETCHING_STATUS,
  isFetching,
});

//export thunk creators
export const fetchMe = () => {
  return async (dispatch) => {
    dispatch(setFetchingStatus(true));
    try {
      const { data } = await axios.get("/auth/me");
      dispatch(gotMe(data));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setFetchingStatus(false));
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put("/auth/login", credentials);
      dispatch(gotMe(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.delete("/auth/logout");
      dispatch(gotMe({}));
    } catch (error) {
      console.error(error);
    }
  };
};

//intial state
const intialState = {
  user: {
    isFetching: true,
  },
};
function userReducer(state = intialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: {
          ...state.user, //previous users
          ...action.user, //user from axios
        },
      };
    case SET_FETCHING_STATUS:
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: action.isFetching,
        },
      };
    default:
      return state;
  }
}
export default userReducer;
