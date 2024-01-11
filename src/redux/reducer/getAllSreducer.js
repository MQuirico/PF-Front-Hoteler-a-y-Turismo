import { GET_ALL_SNEAKERS } from "../action-types";

let initialState = {
  sneakers: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SNEAKERS:
      return {
        ...state,
        sneakers: action.payload,
      };
    default:
      return state;
  }
};
