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
        "https://back-hostel.onrender.com/users/create",
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
      axios.post('https://back-hostel.onrender.com/products/create', hotel)
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
        const response = await axios.get('https://back-hostel.onrender.com/products/'); 
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
      const response = await fetch(`https://back-hostel.onrender.com/products/search/${name}`);
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


  export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS,
  });


  export const fetchProducts = (filters, page, pageSize) => {
    return async (dispatch) => {
      dispatch({ type: FETCH_PRODUCTS_REQUEST });
      try {
        const response = await axios.get('https://back-hostel.onrender.com/products/filter', {
          params: { ...filters, page: page ||  1, pageSize: pageSize ||  6 },
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        const { products, totalCount, totalPages } = response.data;
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: { products, totalCount, totalPages } });
      } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
      }
    };
  };

  

  export const updateUserProfileRequest = () => ({
    type: UPDATE_USER_PROFILE_REQUEST,
  });
  
  export const updateUserProfileSuccess = (data) => ({
    type: UPDATE_USER_PROFILE_SUCCESS,
    payload: data,
  });
  
  export const updateUserProfileFailure = (error) => ({
    type: UPDATE_USER_PROFILE_FAILURE,
    payload: error,
  });
  
  // Acción para modificar cualquier dato del perfil de usuario
  export const updateUserProfileData =
    (idKey, updatedFields) => async (dispatch) => {
      dispatch(updateUserProfileRequest());
  
      try {
        const response = await axios.put(
          `https://back-hostel.onrender.com/users/perfil/${idKey}`,
          updatedFields
        );
  
        dispatch(updateUserProfileSuccess(response.data));
      } catch (error) {
        console.error("Error al actualizar datos de usuario:", error);
        dispatch(
          updateUserProfileFailure(error.response?.data || "Error en el servidor")
        );
      }
    };



 
    
    export const updatePasswordRequest = () => ({
      type: UPDATE_PASSWORD_REQUEST,
    });
    
    export const updatePasswordSuccess = () => ({
      type: UPDATE_PASSWORD_SUCCESS,
    });
    
    export const updatePasswordFailure = (error) => ({
      type: UPDATE_PASSWORD_FAILURE,
      payload: error,
    });
    
    //action para el pasww
    export const updatePassword = (id, currentPassword, newPassword) => {
      return async (dispatch) => {
        dispatch(updatePasswordRequest());
    
        try {
          const response = await fetch(
            `https://back-hostel.onrender.com/users/perfil/updatepassword/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                currentPassword,
                newPassword,
              }),
            }
          );
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error (${response.status}): ${errorData.message}`);
          }
    
          dispatch(updatePasswordSuccess());
        } catch (error) {
          dispatch(updatePasswordFailure(error.message));
        }
      };
    };
  