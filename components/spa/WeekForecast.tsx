import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
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

  return city ? (
    <div
      data-cy="city-forecast"
      className="bg-white border border-gray-400 shadow-md rounded"
    >
      <div className="px-5 py-3 flex justify-between items-center">
        <div>
          <h2 className="inline text-2xl font-bold">{city.name}</h2>
          <h3 className="inline text-sm uppercase">, {city.country}</h3>
        </div>

        <div>
          <Link href="/info">
            <a
              data-cy="info"
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              +info
            </a>
          </Link>
        </div>
      </div>

      <WeekForecastList city={city} selectDay={selectDay} />
    </div>
  ) : (
    <p className="font-mono">Loading city...</p>
  );
};

export default WeekForecast;
