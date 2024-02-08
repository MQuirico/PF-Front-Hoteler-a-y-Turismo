import {
  SET_USER_DATA,
  CLEAR_USER_DATA,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE

} from "../Actions_Type/actions_type";


const initialState = {
  userDataSession: null,
  loading: false,
  error: null,
  newUser: null,
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

    default:
      return state;
  }
};

export default userDataReducer;