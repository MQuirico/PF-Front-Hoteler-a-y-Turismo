import {
    POST_PRODUCT_REQUEST,
    POST_PRODUCT_SUCCESS,
    POST_PRODUCT_FAILURE,
  } from "../actions/actions";
  
  const initialState = {
    loading: false,
    product: null,
    error: null,
  };
  
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
  
      default:
        return state;
    }
  };
  
  export default productReducer;