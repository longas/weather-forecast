export interface CityBasic {
  id: string;
  name: string;
  country: string;
  info: string;
}

export interface Day {
  id: string;
  min_temperature: number;
  max_temperature: number;
  average_temperature: number;
  forecast: string;
}

export interface City extends CityBasic {
  days: Day[];
}

export interface Hour {
  temperature: number;
  forecast: string;
}
