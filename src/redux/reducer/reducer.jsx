import {
  POST_PRODUCT_REQUEST,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_FAILURE,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_FAILURE,
  CLEAR_PRODUCT_DETAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  CLEAR_CREATE_PRODUCT_STATE,
  
  
} from "../actions/actions";
import { GET_ALL_SNEAKERS, GET_SEARCH_REQUEST, GET_SEARCH_SUCCESS, GET_SEARCH_NOTFOUND,GET_ALL_FILTER,RESET_CURRENTPAGE,BRAND_VALUE } from "../action-types/index";

const initialState = {
  loading: false,
  product: {
    detail: null,
    createdProduct: null,
    loading: false,
    error: null,
  },
  error: null,
  
  sneakers: [],
  allCopySneakers:[],
  filterProducts:[],
  currentPage:[],
  totalSneakers:[],
  brandValue : []
};

const stateSearchBar = {
  data: null,
  loading: false,
  error: null,
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case POST_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: null,
      };

    case POST_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        product: null,
        error: action.payload,
      };

    case GET_ALL_SNEAKERS:
      return {
        ...state,
        sneakers: action.payload.sneakers,
        allCopySneakers:action.payload.sneakers,
        currentPage: action.payload.currentPage,
        totalSneaker: action.payload.totalSneaker,

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

          case CLEAR_PRODUCT_DETAIL:
 return {
   ...state,
   product: {
     ...state.product,
     detail: null,
   },
 };

 case CREATE_PRODUCT_REQUEST:
  return {
    ...state,
    loading: true,
    error: null,
  };

  case CREATE_PRODUCT_SUCCESS:
    return {
      ...state,
      loading: false,
      product: {
        ...state.product,
        createdProduct: action.payload,
      },
      error: null,
    };

case CREATE_PRODUCT_FAILURE:
  return {
    ...state,
    loading: false,
    createdProduct: null,
    error: action.payload,
  };

case CLEAR_CREATE_PRODUCT_STATE:
  return initialState;


  case GET_SEARCH_SUCCESS:
    return{
      ...state,
      loading: false,
      data: action.payload,
      error: null,
    };

  case GET_SEARCH_NOTFOUND:
    return{
      ...state,
      loading: false,
      data: null,
      error: action.payload
    };
    case GET_ALL_FILTER:
  return {
    ...state,
    sneakers: action.payload.sneakers || [...state.sneakers],
    filterProducts: action.payload.sneakers || [...state.sneakers],
    currentPage: action.payload.currentPage,
    totalSneaker: action.payload.totalSneaker,
  };

  case RESET_CURRENTPAGE:
            return {
                ...state,
                currentPage:action.payload
            }

            case BRAND_VALUE:
            return {
                ...state,
                brandValue:action.payload
            }
              
                  default:
                  return state;
  }
};

export default productReducer;