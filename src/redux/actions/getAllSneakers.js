import { GET_ALL_SNEAKERS } from "../action-types";
import axios from "axios";
export const getSneakers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/sneakers"); //ruta temporal
      const sneakers = response.data;
      dispatch({
        type: GET_ALL_SNEAKERS,
        payload: sneakers,
      });
    } catch (error) {
      console.error("Error al traer las zapatillas:", error);
    }
  };
};
