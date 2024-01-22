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
  GET_ALL_SNEAKERS, GET_SEARCH_REQUEST, GET_SEARCH_SUCCESS, GET_SEARCH_NOTFOUND,RESET_CURRENTPAGE,BRAND_VALUE,COLOR_VALUE,ORDER_PRICE,SIZE_VALUE,CLEAR_CREATE_PRODUCT_STATE,STATE_DATA_PAGE
  
  
} from "../action-types/action-types";


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
  currentPage:[],
  totalSneakers:[],
  brandValue : [],
  colorValue :[],
  sizeValue:[],
  orderPrice:[],
  dataSearch:[]
};

const stateSearchBar = {
  data: null,
  page: 0,
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
          allCopySneakers: action.payload.sneakers,
          currentPage: action.payload.currentPage,
          totalSneaker: action.payload.totalSneaker,
          page:0,
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
      createdProduct: action.payload,
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
  return{ initialState};


case GET_SEARCH_SUCCESS:
  return {
    ...state,
    sneakers:action.payload.sneakers,
    page: action.payload.currentPage,
    totalSneaker:action.payload.totalSneaker,
    brandValue:[],
    colorValue:[]
  };

  case GET_SEARCH_NOTFOUND:
    return{
      ...state,
      loading: false,
      data: null,
      error: action.payload
    };

  case RESET_CURRENTPAGE:
            return {
                ...state,
                currentPage:action.payload
            }

            case BRAND_VALUE:
            return {
                ...state,
                brandValue:action.payload,
                dataSearch:[]
            }

            case COLOR_VALUE:
            return {
                ...state,
                colorValue:action.payload
            }

            case SIZE_VALUE:
            return {
                ...state,
                sizeValue:action.payload
            }

            case ORDER_PRICE:
            return {
                ...state,
                orderPrice:action.payload
            }

            case STATE_DATA_PAGE:
            return {
                ...state,
                dataSearch:action.payload
            }

            case 'RESET_SEARCH':
              return {
                ...state,
                sneakers: state.allCopySneakers,
                currentPage: 1,
              };
              
                  default:
                  return state;
  }
};

export default productReducer;