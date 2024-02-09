
import {
  SET_USER_DATA,
  CLEAR_USER_DATA,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  NO_EVENTS,
  GET_SEARCH_BY_NAME,

} from "../Actions_Type/actions_type";


const initialState = {
  userDataSession: null,
  loading: false,
  error: null,
  newUser: null,
  noEvents: "",
  searchName: [],

};


const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userDataSession: action.payload,
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        userDataSession: null,
      };

      case CREATE_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          newUser: action.payload,
          error: null,
        };
      case CREATE_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case GET_SEARCH_BY_NAME:
        return {
          ...state,
          searchName: action.payload,
          noEvents: "",
        };

    default:
      return state;
  }
};

export default userDataReducer;