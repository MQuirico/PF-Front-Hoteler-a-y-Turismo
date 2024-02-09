
import {
  SET_USER_DATA,
  CLEAR_USER_DATA,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  NO_EVENTS,
  GET_SEARCH_BY_NAME,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_FAILURE,

} from "../Actions_Type/actions_type";


const initialState = {
  userDataSession: null,
  loading: false,
  error: null,
  newUser: null,
  noEvents: "",
  searchName: [],
  products: [],
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
      case FETCH_PRODUCT_DETAIL_SUCCESS:
        console.log("Detalle del producto:", action.payload);
        return {
          ...state,
          product: {
            ...state.product,
            detail: action.payload,
          },
          error: null,
        };

      case FETCH_PRODUCT_DETAIL_FAILURE:
        return {
          ...state,
          product: {
            ...state.product,
            detail: null,
          },
          error: action.payload,
        };
    

    default:
      return state;
  }
};

export default userDataReducer;