import {
  combineReducers,
  createStore as reduxCreateStore
} from "redux";
import { rat } from "./rat/reducers";
// import world from './world/reducers'

const createStore = initialState =>
  reduxCreateStore(
    combineReducers({
      rat
    }),
    initialState
  );

export { createStore };
