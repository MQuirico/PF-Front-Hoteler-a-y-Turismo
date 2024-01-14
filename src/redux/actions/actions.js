
export const POST_PRODUCT_REQUEST = 'POST_PRODUCT_REQUEST';
export const POST_PRODUCT_SUCCESS = 'POST_PRODUCT_SUCCESS';
export const POST_PRODUCT_FAILURE = 'POST_PRODUCT_FAILURE';
export const FETCH_PRODUCT_DETAIL_SUCCESS = "FETCH_PRODUCT_DETAIL_SUCCESS";
export const FETCH_PRODUCT_DETAIL_FAILURE = "FETCH_PRODUCT_DETAIL_FAILURE";
export const CLEAR_PRODUCT_DETAIL = "CLEAR_PRODUCT_DETAIL";
export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";
export const CLEAR_CREATE_PRODUCT_STATE = "CLEAR_CREATE_PRODUCT_STATE";
import axios from "axios";
import { GET_ALL_SNEAKERS,GET_SEARCH_REQUEST, GET_SEARCH_NOTFOUND, GET_SEARCH_SUCCESS,GET_ALL_FILTER,RESET_CURRENTPAGE,BRAND_VALUE,COLOR_VALUE,SIZE_VALUE,ORDER_PRICE } from "../action-types";

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

export const getSneakers = ( page, pageSize="3", brand,colors,size,price) => {
  return async function (dispatch) {
     try {
      const queryParams = {
        page: encodeURIComponent(page),
        pageSize: encodeURIComponent(pageSize),
      };

      if (brand) {
        queryParams.brand = encodeURIComponent(brand);
      }

      if (colors) {
        queryParams.colors = encodeURIComponent(colors);
      }

      if(size){
        queryParams.size = encodeURIComponent(size);
      }

      if (price) {
        queryParams.price = encodeURIComponent(price);
      }

      const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const url = `http://localhost:3000/products?${queryString}`;

      console.log(url);
      const response = await axios.get(url);
      const sneakers = response.data;
      console.log("La respuesta es:", sneakers);

      dispatch({
        type: GET_ALL_SNEAKERS,
        payload: {
          sneakers: sneakers.paginatedResponse,
          currentPage: sneakers.setCurrentPage,
          totalSneaker: sneakers.totalSneaker,
        },
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
  }
}

  export const getSearchRequest = () => ({
    type: GET_SEARCH_REQUEST,
})

export const getSearchSuccess = (data) => ({
    type: GET_SEARCH_SUCCESS,
    payload: data
})

export const getSearchNotFound = (error) => ({
    type: GET_SEARCH_NOTFOUND,
    payload: error
})

export const searchBar = (searchTerm) => {
  return async (dispatch) => {
    try {
      dispatch(getSearchRequest());

      const response = await axios.get(`http://localhost:3000/products/search/${searchTerm}`);



      if (response.data && response.data.length > 0) {
        
        dispatch(getSearchSuccess(response.data));
      } else {
        dispatch(getSearchNotFound('No hay resultados que concuerden con tu búsqueda'));
      }
    } catch (error) {
      dispatch(getSearchNotFound(error.message || 'Error en la búsqueda'));
    }
  };
};

export const filterProducts= ( brand,page,pageSize )=>{
  return async function (dispatch) {
    try {
      const url = `http://localhost:3000/products/?page=${page}&pageSize=${pageSize}&brand=${brand}`
      console.log('URL:', url);

      const response = await axios.get(url);
      const sneakers = response.data;
      console.log("La respuesta es:", sneakers);

      dispatch({
        type: GET_ALL_FILTER,
        payload: {
          sneakers: sneakers.paginatedResponse,
          currentPage: sneakers.currentPage,
          totalSneaker: sneakers.totalSneaker,
        },
      });
    } catch (error) {
      console.error("Error al traer las zapatillas:", error);
    }
  };
   
}


export const resetCurrentPage = (page) => {
  return {
      type:RESET_CURRENTPAGE,
      payload:page
  }
}

export const brandValue = (value) => {
  return {
      type:BRAND_VALUE,
      payload:value
  }
}

export const colorValue = (value) => {
  return {
      type:COLOR_VALUE,
      payload:value
  }
}

  export const sizeValue = (value) => {
    return {
        type:SIZE_VALUE,
        payload:value
    }
}

  export const orderPrice = (value) => {
    return {
        type:ORDER_PRICE,
        payload:value
    }
}
