//dsadsaimport axios from "axios";
import {
    SET_USER_DATA,
    CLEAR_USER_DATA,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    GET_SEARCH_BY_NAME,
    NO_EVENTS


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

export const searchByName = (name) => {
  return async (dispatch) => {
    try {
      const apiData = await axios.get(`http://localhost:3000/products/search/${name}`);
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