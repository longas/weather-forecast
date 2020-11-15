import { City, CityBasic, Hour } from "../types";
import { setCities, setCity, setCityFetchTimer, setHours } from "./actions";
import { IStore } from "./store";
import * as type from "./types";

const initialState: IStore = {
  cityList: [],
  selectedCity: null,
  selectedDay: "",
  selectedCityHours: [],
  cityFetchTimerId: 0,
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
    case type.SET_CITY_TIMER:
      return { ...state, cityFetchTimerId: action.payload };
    case type.SET_HOURS:
      return {
        ...state,
        selectedDay: action.payload.day,
        selectedCityHours: action.payload.hours,
      };
    default:
      return state;
  }
}

export const loadCities = () => async (dispatch) => {
  const res = await fetch("/api");
  const data: CityBasic[] = await res.json();
  dispatch(setCities(data));
};

const fetchCity = async (city: string) => {
  const res = await fetch(`/api/${city}`);
  if (res.status === 404) return null;
  const data: City = await res.json();
  return data;
};

export const loadCity = (city: string) => async (dispatch, getState) => {
  // Clear previous timer
  clearInterval(getState().cityFetchTimerId);

  dispatch(setCity(null));
  dispatch(setHours("", []));
  const cityData = await fetchCity(city);
  dispatch(setCity(cityData));

  // Set new timer for periodic data polling
  const timerId = window.setInterval(async () => {
    const cityData = await fetchCity(city);
    const selectedDay = getState().selectedDay;

    // Fetch the selected day aswell
    if (selectedDay) {
      const dayData = await fetchDay(city, selectedDay);
      dispatch(setHours(selectedDay, dayData));
    }

    dispatch(setCity(cityData));
  }, 10000);

  dispatch(setCityFetchTimer(timerId));
};

const fetchDay = async (city: string, day: string) => {
  const res = await fetch(`/api/${city}/${day}`);
  const data: Hour[] = await res.json();
  return data;
};

export const loadDay = (city: string, day: string) => async (dispatch) => {
  const dayData = await fetchDay(city, day);
  dispatch(setHours(day, dayData));
};
