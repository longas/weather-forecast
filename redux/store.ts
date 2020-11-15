import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { City, CityBasic, Hour } from "../types";
import rootReducer from "./reducers";

export interface IStore {
  cityList: CityBasic[];
  selectedCity: City;
  selectedCityHours: Hour[];
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
