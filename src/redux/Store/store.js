import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import rootReducer from "../reducer/reducer";
import ReservationReducer from "../reducer/reducerBuyReservation";

const mainReducer = combineReducers({
    stateA: rootReducer,
    stateB: ReservationReducer
});

const middleware = applyMiddleware(thunk);

const store = createStore(mainReducer, composeWithDevTools(middleware));

export default store;