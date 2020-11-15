import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCity, loadDay } from "../../redux/reducers";
import { IStore } from "../../redux/store";
import { City } from "../../types";
import WeekForecastList from "./WeekForecastList";

interface WeekForecastProps {
  cityId: string;
}

const WeekForecast: React.FC<WeekForecastProps> = ({ cityId }) => {
  const city = useSelector<IStore, City>((state) => state.selectedCity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCity(cityId));
  }, [cityId, dispatch]);

  const selectDay = (day: string) => {
    dispatch(loadDay(cityId, day));
  };

  console.log(city);

  return city ? (
    <div
      className="bg-white border border-gray-400 shadow-md rounded"
      style={{ width: 500 }}
    >
      <div className="p-3">
        <h1 className="inline text-2xl font-bold">{city.name}</h1>
        <h2 className="inline text-xs uppercase">, {city.country}</h2>
      </div>

      <WeekForecastList city={city} selectDay={selectDay} />
    </div>
  ) : null;
};

export default WeekForecast;
