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
  CLEAR_SEARCH_RESULTS,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_PAYMONTH_FAILURE,
  UPDATE_USER_PAYMONTH_SUCCESS,
  UPDATE_USER_PAYMONTH_REQUEST,
  FETCH_REVIEWS_FAILURE,
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  GET_FAVORITES_FAILURE,
  GET_FAVORITES_REQUEST,
  GET_FAVORITES_SUCCESS,
  DELETE_FAVSTATE,
  CREATE_RESERVATION_FAILURE,
  CREATE_RESERVATION_SUCCESS,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  CHECK_GOOGLEUSER_EXISTANCE_REQUEST,
  CHECK_GOOGLEUSER_EXISTANCE_SUCCESS,
  CHECK_GOOGLEUSER_EXISTANCE_FAILURE,
  RETRIEVE_RESERVATIONS_REQUEST,
  RETRIEVE_RESERVATIONS_SUCCESS,
  RETRIEVE_RESERVATIONS_FAILURE,
  FETCH_TOP_LOCATIONS_REQUEST,
  FETCH_TOP_LOCATIONS_SUCCESS,
  FETCH_TOP_LOCATIONS_FAILURE
} from "../action-types/action-types";

const initialState = {
  userDataSession: null,
  loading: false,
  error: null,
  newUser: null,
  noEvents: "",
  searchName: [],
  products: [],
  allProducts: null,
  searchResults: [],
  topLocations: null,
  filteredProducts: [],
  totalPages:  0,
  updateUserError: null,
  passwordAndEmailUpdating: false,
  passwordAndEmailUpdateError: null,
  reviews: {
    data: null,
    loading: false,
    error: null
  },
  favorites:{
    data: [],
    loading: false,
    error: null
  }, 
  checkGoogle:{
    data: null,
    loading: false,
    error: null
  },
  reservation: null,
  resPerProduct:{
    data: null,
    loading: false,
    error: null
  }

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
      return { ...state, allProducts: action.payload, loading: false, error: null };
    case GET_ALL_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true/* jdngjkdfngkjfdn */
        };
    case FETCH_PRODUCTS_SUCCESS:
          return {
              ...state,
              products: action.payload.products || [],
              totalPages: action.payload.totalPages,
              loading: false,
              error: null
          };
    case FETCH_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
    case SEARCH_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
    case SEARCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          searchResults: action.payload,  
          loading: false,
          error: null,
        };
    case SEARCH_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    case UPDATE_USER_PROFILE_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
          };
    case UPDATE_USER_PROFILE_SUCCESS:
          return {
            ...state,
            loading: false,
            data: action.payload,
          };
        case UPDATE_USER_PROFILE_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
          case UPDATE_PASSWORD_REQUEST:
            return {
              ...state,
              passwordAndEmailUpdating: true,
              passwordAndEmailUpdateError: null,
            };
      
          case UPDATE_PASSWORD_SUCCESS:
            return {
              ...state,
              passwordAndEmailUpdating: false,
            };
      
          case UPDATE_PASSWORD_FAILURE:
            return {
              ...state,
              passwordAndEmailUpdating: false,
              passwordAndEmailUpdateError: action.payload,
            };

            case UPDATE_USER_REQUEST:
              return {
                ...state,
                loading: true,
                updateUserError: null, 
              };
              case UPDATE_USER_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  user: action.payload,
                };
            case UPDATE_USER_FAILURE:
              return {
                ...state,
                loading: false,
                error: action.payload,
              };

              case UPDATE_USER_PAYMONTH_REQUEST:
                return {
                  ...state,
                  loading: true,
                  error: null,
                  success: false,
                };
              case UPDATE_USER_PAYMONTH_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  error: null,
                  success: true,
                };
              case UPDATE_USER_PAYMONTH_FAILURE:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                  success: false,
                };
                case FETCH_REVIEWS_REQUEST:
                  return {
                    ...state,
                    reviews:{
                      ...state.reviews,
                    loading: true,
                    error: null}
                  };
                case FETCH_REVIEWS_SUCCESS:
                  return {
                    ...state,
                    reviews:{
                      ...state.reviews,
                      loading: false,
                    data: action.payload 
                  }
                  };
                case FETCH_REVIEWS_FAILURE:
                  return {
                    ...state,
                    reviews:{
                    ...state.reviews,
                    loading: false,
                    error: action.payload
                    }
                    
                  };
                  case GET_FAVORITES_REQUEST:
                      return {
                        ...state,
                        favorites: {
                          ...state.favorites,
                          loading: true,
                          error: null
                        }
                      };
                    case GET_FAVORITES_SUCCESS:
                      return {
                        ...state,
                        favorites: {
                          data: action.payload,
                          loading: false,
                          error: null
                        }
                      };
                    case GET_FAVORITES_FAILURE:
                      return {
                        ...state,
                        favorites: {
                          ...state.favorites,
                          loading: false,
                          error: action.payload
                        }
                      };
                      case DELETE_FAVSTATE:
                      return {
                        ...state,
                        favorites: {
                          data: [],
                          loading: false,
                          error: null
                        }
                      };

                      case CREATE_RESERVATION_SUCCESS:
                        return {
                          ...state,
                          reservation: action.payload,
                          error: null,
                        };
                      case CREATE_RESERVATION_FAILURE:
                        return {
                          ...state,
                          reservation: null,
                          error: action.payload,
                        };
                      case CHECK_GOOGLEUSER_EXISTANCE_REQUEST:
                        return{
                          ...state,
                          checkGoogle:{
                            data:{},
                            loading: true,
                            error: null
                          }
                        }
                      case CHECK_GOOGLEUSER_EXISTANCE_SUCCESS:
                        return{
                          ...state,
                          checkGoogle:{
                            data:action.payload,
                            loading: false,
                            error: null
                          }
                        }
                      case CHECK_GOOGLEUSER_EXISTANCE_FAILURE:
                        return{
                          ...state,
                          checkGoogle:{
                            data:{},
                            loading: false,
                            error: action.payload
                          }
                        }
                        

                        case GET_ALL_USERS_REQUEST:
                          return { ...state,
                             loading: true,
                              error: null 
                            };
                          case GET_ALL_USERS_SUCCESS:
                          return { ...state, users: action.payload, loading: false, error: null };
                          case GET_ALL_USERS_FAILURE:
                          return { ...state, loading: false, error: action.payload };

                        case RETRIEVE_RESERVATIONS_REQUEST:
                        return {
                          ...state,
                          resPerProduct:{
                            data:null,
                            loading: true,
                            error: null
                          }
                        }
                        case RETRIEVE_RESERVATIONS_SUCCESS:
                        return {
                          ...state,
                          resPerProduct:{
                            data:action.payload,
                            loading: true,
                            error: null
                          }
                         }
                         case RETRIEVE_RESERVATIONS_FAILURE:
                          return {
                            ...state,
                            resPerProduct:{
                              data:null,
                              loading: true,
                              error: action.payload
                            }
                           }
                           case FETCH_TOP_LOCATIONS_REQUEST:
                            return {
                              ...state,
                              loading: true,
                              error: null
                            };
                            case FETCH_TOP_LOCATIONS_SUCCESS:
                              console.log('Datos recibidos:', action.payload); // Agrega esta línea para depurar
                              return {
                                ...state,
                                loading: false,
                                topLocations: action.payload,
                                error: null
                              };
                          case FETCH_TOP_LOCATIONS_FAILURE:
                            return {
                              ...state,
                              loading: false,
                              error: action.payload
                            };
    default:
      return state;
  }
};

export default userDataReducer;