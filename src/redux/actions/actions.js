import axios from "axios";
import {
  GET_ALL_SNEAKERS,
  GET_SEARCH_REQUEST,
  GET_SEARCH_NOTFOUND,
  GET_SEARCH_SUCCESS,
  POST_PRODUCT_FAILURE,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_REQUEST,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CLEAR_PRODUCT_DETAIL,
  CLEAR_CREATE_PRODUCT_STATE,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_FAILURE,
} from "../action-types/action-types";

export const registerUser = (datauser) => async (dispatch) => {
  dispatch({ type: CREATE_USER_REQUEST });
  try {
    const response = await axios.post('http://localhost:3000/users/create', datauser);
    dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_USER_FAILURE, payload: error.message });
  }
}


export const postProductRequest = () => ({
  type: POST_PRODUCT_REQUEST,
});

export const clearProductDetail = () => ({
  type: CLEAR_PRODUCT_DETAIL,
 });

export const postProductSuccess = (product) => ({
  type: POST_PRODUCT_SUCCESS,
  payload: product,
});

export const postProductFailure = (error) => ({
  type: POST_PRODUCT_FAILURE,
  payload: error,
});


export const fetchProductDetail = (idKey) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3000/products/detail/${idKey}`);
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


export const getSneakers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        "http://localhost:3000/products?page=1&pageSize=4"
      );
      const sneakers = response.data;
      console.log("La respuesta es:", sneakers);

      dispatch({
        type: GET_ALL_SNEAKERS,
        payload: sneakers,
      });
    } catch (error) {
      console.error("Error al traer las zapatillas:", error);
    }
  };
};

export const createProductRequest = () => ({
  type: CREATE_PRODUCT_REQUEST,
});

export const createProductSuccess = (product) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: product,
});

export const createProductFailure = (error) => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error,
});

export const clearCreateProductState = () => ({
  type: CLEAR_CREATE_PRODUCT_STATE,
});

export const postCreateProduct = (productData) => async (dispatch) => {
  dispatch(createProductRequest());
  try {
    // Lógica para enviar la solicitud al backend y crear el producto
    const response = await axios.post("http://localhost:3000/products/create", productData);

    // Si la solicitud fue exitosa
    dispatch(createProductSuccess(response.data));
  } catch (error) {
    // Si la solicitud falla
    dispatch(createProductFailure(error.message || "Error al crear el producto"));
  };
}

export const getSearchRequest = () => ({
  type: GET_SEARCH_SUCCESS, // Cambiado de GET_SEARCH_REQUEST a GET_SEARCH_SUCCESS
});

export const getSearchSuccess = (data) => ({
  type: GET_SEARCH_SUCCESS,
  payload: data,
});

export const getSearchNotFound = (error) => ({
  type: GET_SEARCH_NOTFOUND,
  payload: error,
});

export const searchBar = (searchTerm) => {
  return async (dispatch) => {
    try {
      dispatch(getSearchRequest());

      const response = await axios.get(`http://localhost:3000/products/search/${searchTerm}`);

      if (response.data && response.data.length > 0) {
        dispatch(getSearchSuccess(response.data));

        // Actualiza la lista de sneakers con los resultados de la búsqueda
        dispatch({
          type: GET_ALL_SNEAKERS,
          payload: response.data,
        });
      } else {
        dispatch(getSearchNotFound('No hay resultados que concuerden con tu búsqueda'));
      }
    } catch (error) {
      dispatch(getSearchNotFound(error.message || 'Error en la búsqueda'));
    }
  };
};