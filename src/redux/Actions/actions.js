import axios from "axios";
import {
    SET_USER_DATA,
    CLEAR_USER_DATA,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    GET_SEARCH_BY_NAME,
    NO_EVENTS,
    NEW_HOTEL_REQUEST,
    NEW_HOTEL_SUCCESS,
    NEW_HOTEL_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAILURE,
    SEARCH_PRODUCTS_REQUEST,
    SEARCH_PRODUCTS_SUCCESS,
    SEARCH_PRODUCTS_FAILURE,
    FETCH_PRODUCT_DETAIL_SUCCESS,
    FETCH_PRODUCT_DETAIL_FAILURE,

} from "../action-types/action-types";

export const setUserData = (userData) => {
    return {
      type: SET_USER_DATA,
      payload: userData,
    };
  };
  
  export const clearUserData = () => {
    return {
      type: CLEAR_USER_DATA,
    };
  };

  export const registerUser = (datauser) => async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });
    try {
      const response = await axios.post(
        "http://localhost:3000/users/create",
        datauser
      );
      dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_USER_FAILURE, payload: error.message });
    }
  };

export const searchByName = (name) => {
  return async (dispatch) => {
    try {
      const apiData = await axios.get(`https://back-hostel.onrender.com/products/search/${name}`);
      const searchName = apiData.data;
      return dispatch({
        type: GET_SEARCH_BY_NAME,
        payload: searchName,
      });
    } catch (e) {
      console.log(e.response.data);
      return dispatch({
        type: NO_EVENTS,
        payload: e.response.data,
      });
    }
  };
};

export const newHotel = (hotel) => {
  return (dispatch) => {
    dispatch({ type: NEW_HOTEL_REQUEST });
    axios.post('http://localhost:3000/products/create', hotel)
      .then(response => {
        dispatch({
          type: NEW_HOTEL_SUCCESS,
          payload: response.data // Puedes ajustar según la estructura de datos recibida
        });
      })
      .catch(error => {

        dispatch({
          type: NEW_HOTEL_FAILURE,
          payload: error.message // Puedes ajustar según la estructura de error que recibas
        });
      });
  };
};

  export const getAllProducts = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: GET_ALL_PRODUCTS_REQUEST }); 
        console.log("Fetching products...");
        const response = await axios.get('http://localhost:3000/products/'); 
        const products = response.data;
        console.log("Products received:", products);
        dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: products });
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: error.message });
      }
    };
  };

  export const searchProducts = (name) => async (dispatch) => {
    dispatch({ type: SEARCH_PRODUCTS_REQUEST });
  
    try {
      const response = await fetch(`http://localhost:3000/products/search/${name}`);
      const data = await response.json();
  
      if (response.ok) {
        dispatch({
          type: SEARCH_PRODUCTS_SUCCESS,
          payload: data.productsFound,
        });
      } else {
        throw new Error(data.message || 'Failed to search products');
      }
    } catch (error) {
      dispatch({
        type: SEARCH_PRODUCTS_FAILURE,
        payload: error.message,
      });
    }
  };

  export const fetchProductDetail = (idKey) => async (dispatch) => {
    try {
      const response = await fetch(
        `https://backendrunnersparadise-production.up.railway.app/products/detail/${idKey}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: FETCH_PRODUCT_DETAIL_SUCCESS, payload: data });
    } catch (error) {
      console.error("Error fetching product detail:", error);
      dispatch({ type: FETCH_PRODUCT_DETAIL_FAILURE });
    }
  };