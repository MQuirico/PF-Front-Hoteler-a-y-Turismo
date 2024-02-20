import {
    START_RESERVATION_FAILURE,
    START_RESERVATION_SUCCESS,
    START_RESERVATION_PROCESS,
    CONCLUDE_RESERVATION
} from "../action-types/action-types-BuyReservation"

const initialState = {
    reservData:{
        reservation:{},
        loading: null,
        error: null
    }
}

const ReservationReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_RESERVATION_PROCESS:
            return {
                ...state,
                reservData: {
                    ...state.reservData,
                    loading: true,
                    error: null
                }
            };
        case START_RESERVATION_SUCCESS:
            return {
                ...state,
                reservData: {
                    reservation: action.payload,
                    loading: false,
                    error: null
                }
            };
        case START_RESERVATION_FAILURE:
            return {
                ...state,
                reservData: {
                    ...state.reservData,
                    loading: false,
                    error: action.payload
                }
            };
        case CONCLUDE_RESERVATION:
            return {
                ...state,
                reservData: {
                    reservation: {},
                    loading: null,
                    error: null
                }
            };
        default:
            return state;
    }
};

export default ReservationReducer;