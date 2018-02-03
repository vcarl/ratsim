import {
  combineReducers,
  createStore as reduxCreateStore,
  applyMiddleware,
  compose
} from "redux";
import thunk from "redux-thunk";
import { rat } from "./rat/reducers";
// import world from './world/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStore = initialState =>
  reduxCreateStore(
    combineReducers({
      rat
    }),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

export { createStore };
