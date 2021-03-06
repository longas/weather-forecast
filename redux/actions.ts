import { City, CityBasic, Hour } from "../types";
import * as types from "./types";

export function setCities(cities: CityBasic[]) {
  return {
    type: types.SET_CITIES,
    payload: cities,
  };
}

export function setCity(city: City) {
  return {
    type: types.SET_CITY,
    payload: city,
  };
}

export function setCityFetchTimer(id: number) {
  return {
    type: types.SET_CITY_TIMER,
    payload: id,
  };
}

export function setHours(day, hours: Hour[]) {
  return {
    type: types.SET_HOURS,
    payload: { day, hours },
  };
}
