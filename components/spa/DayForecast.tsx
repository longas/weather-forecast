import React, { Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { IStore } from "../../redux/store";
import { Hour } from "../../types";
import DayForecastListItem from "./DayForecastListItem";
const TemperaturesChart = React.lazy(() => import("./TemperaturesChart"));

const DayForecast = () => {
  const hours = useSelector<IStore, Hour[]>((state) => state.selectedCityHours);
  const selectedDay = useSelector<IStore, string>((state) => state.selectedDay);
  const dayHours = useMemo(
    () =>
      Array(24)
        .fill(0)
        .map((n, i) => i),
    []
  );

  return hours.length > 0 ? (
    <div
      data-cy="hourly-forecast"
      className="mt-4 bg-white border border-gray-400 shadow-md rounded"
    >
      <h4 className="pt-4 pl-5 font-extrabold capitalize">{selectedDay}</h4>

      <div className="mt-6 px-6">
        <Suspense fallback={null}>
          <TemperaturesChart hours={hours} />
        </Suspense>
      </div>

      <ul className="mt-5 grid grid-cols-4 md:grid-cols-6">
        {dayHours.map((h, i) => {
          const hourString = `${h.toString().padStart(2, "0")}:00`;
          const hourData = hours[i];
          return (
            <DayForecastListItem
              key={i}
              hour={hourString}
              hourData={hourData}
            />
          );
        })}
      </ul>
    </div>
  ) : null;
};

export default DayForecast;
