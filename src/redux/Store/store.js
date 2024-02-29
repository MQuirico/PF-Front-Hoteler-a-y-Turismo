import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from "../reducer/reducer";
import ReservationReducer from "../reducer/reducerBuyReservation";
import storage from 'redux-persist/lib/storage'; 
const rootPersistConfig = {
    key: 'root',
    storage,
    // puedes agregar "whitelist" o "blacklist" si gustas 
  };

  const mainReducer = combineReducers({
    stateA: rootReducer,
    stateB: ReservationReducer
});
/* jdnfkjdk */
  const persistedMainReducer = persistReducer(rootPersistConfig, mainReducer);

  
const middleware = applyMiddleware(thunk);

const store = createStore(persistedMainReducer, composeWithDevTools(middleware));


// Crear el persistor
const persistor = persistStore(store);

// Ahora la exportacion se haria como objeto, entonces deberias cambiar donde estes importando a "store"
export { store, persistor };
export default store;