
export const POST_PRODUCT_REQUEST = 'POST_PRODUCT_REQUEST';
export const POST_PRODUCT_SUCCESS = 'POST_PRODUCT_SUCCESS';
export const POST_PRODUCT_FAILURE = 'POST_PRODUCT_FAILURE';

export const postProductRequest = () => ({
  type: POST_PRODUCT_REQUEST,
});

export const postProductSuccess = (product) => ({
  type: POST_PRODUCT_SUCCESS,
  payload: product,
});

export const postProductFailure = (error) => ({
  type: POST_PRODUCT_FAILURE,
  payload: error,
});

export const postProduct = (productData) => {
  return async (dispatch) => {
    try {
      dispatch(postProductRequest());

      // Aquí iría la lógica para enviar la solicitud al backend y crear el producto
      // Puedes usar fetch, axios, u otra librería para manejar la solicitud HTTP

      // Simulación de respuesta exitosa desde el backend (modifica según tu lógica real)
      const newProduct = { id: 1, ...productData };
      dispatch(postProductSuccess(newProduct));

    } catch (error) {
      dispatch(postProductFailure(error.message || 'Error al crear el producto'));
    }
  };
};