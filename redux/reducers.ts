import { City, CityBasic, Hour } from "../types";
import { setCities, setCity, setHours } from "./actions";
import { IStore } from "./store";
import * as type from "./types";

const initialState: IStore = {
  cityList: [],
  selectedCity: null,
  selectedCityHours: [],
};

export default function rootReducer(
  state = initialState,
  action: { type: string; payload: any }
): IStore {
  switch (action.type) {
    case type.SET_CITIES:
      return { ...state, cityList: action.payload };
    case type.SET_CITY:
      return { ...state, selectedCity: action.payload };
    case type.SET_HOURS:
      return { ...state, selectedCityHours: action.payload };
    default:
      return state;
  }
}

export const loadCities = () => async (dispatch) => {
  const res = await fetch("/api");
  const data: CityBasic[] = await res.json();
  dispatch(setCities(data));
};

export const loadCity = (city: string) => async (dispatch) => {
  const res = await fetch(`/api/${city}`);
  const data: City = await res.json();
  dispatch(setCity(data));
  dispatch(setHours([]));
};

export const loadDay = (city: string, day: string) => async (dispatch) => {
  const res = await fetch(`/api/${city}/${day}`);
  const data: Hour[] = await res.json();
  dispatch(setHours(data));
};
