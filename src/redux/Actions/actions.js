import axios from "axios";
import {
    SET_USER_DATA,
    CLEAR_USER_DATA,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
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

} from "../Actions_Type/actions_type";

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


// export const getOffer = (page, pageSize = "8", location, season, pricePerNight) => {
//   return async function (dispatch) {
//     try {
//       const queryParams = {
//         page: encodeURIComponent(page),
//         pageSize: encodeURIComponent(pageSize),
//       };

//       if (location) {
//         queryParams.location = encodeURIComponent(location);
//       }

//       if (season) {
//         queryParams.season = encodeURIComponent(season);
//       }

//       if (pricePerNight) {
//         queryParams.pricePerNight = encodeURIComponent(pricePerNight);
//       }

//       const queryString = Object.entries(queryParams)
//         .map(([key, value]) => `${key}=${value}`)
//         .join("&");

//       const url = `http://localhost:3000/products?${queryString}`;

//       const response = await axios.get(url);
//       const offerData = response.data;

//       // Verifica que la respuesta tenga la estructura esperada
//       if (!offerData || !offerData.paginatedResponse || !offerData.setCurrentPage || !offerData.totalOffers) {
//         throw new Error('La respuesta de la API no tiene la estructura esperada.');
//       }

//       dispatch({
//         type: GET_ALL_OFFERS,
//         payload: {
//           offers: offerData.paginatedResponse,
//           currentPage: offerData.setCurrentPage,
//           totalOffers: offerData.totalOffers,
//         },
//       });
//     } catch (error) {
//       console.error("Error al traer las ofertas:", error);
//       // Dispatch de un error al store para manejarlo en el frontend
//       dispatch({
//         type: 'GET_OFFERS_ERROR',
//         payload: error.message, // Podrías personalizar el mensaje de error según sea necesario
//       });
//     }
//   };
// };



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