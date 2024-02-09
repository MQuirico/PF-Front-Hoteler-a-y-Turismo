import {
  SET_USER_DATA,
  CLEAR_USER_DATA,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  NO_EVENTS,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_FAILURE,
  
} from "../action-types/action-types";

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


        case GET_ALL_PRODUCTS_REQUEST:
          return { ...state, loading: true, error: null };
        case GET_ALL_PRODUCTS_SUCCESS:
          return { ...state, products: action.payload, loading: false, error: null };
        case GET_ALL_PRODUCTS_FAILURE:
          return { ...state, loading: false, error: action.payload };

          case SEARCH_PRODUCTS_REQUEST:
            return {
              ...state,
              loading: true,
              error: null,
            };
            case SEARCH_PRODUCTS_SUCCESS:
              return {
                ...state,
                products: [...state.products, ...action.payload], 
                loading: false,
                error: null,
              };
          case SEARCH_PRODUCTS_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };

          case FETCH_PRODUCT_DETAIL_SUCCESS:
            console.log("Detalle del producto:", action.payload);
            return {
              ...state,
              product: {
                ...state.products,
                detail: action.payload,
              },
              error: null,
            };

          case FETCH_PRODUCT_DETAIL_FAILURE:
            return {
              ...state,
              product: {
                ...state.products,
                detail: null,
              },
              error: action.payload,
            };

    default:
      return state;
  }
};

export default userDataReducer;