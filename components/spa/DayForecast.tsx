import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { IStore } from "../../redux/store";
import { Hour } from "../../types";
import DayForecastListItem from "./DayForecastListItem";

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

  const chartData = useMemo(() => {
    if (!hours.length) return [];
    return hours.map((h, i) => ({
      name: i,
      temperature: h.temperature,
    }));
  }, [hours]);

  return hours.length > 0 ? (
    <div className="mt-4 bg-white border border-gray-400 shadow-md rounded">
      <h4 className="pt-4 pl-5 font-extrabold capitalize">{selectedDay}</h4>

      <div className="mt-6 px-6">
        <ResponsiveContainer width="100%" height={75}>
          <LineChart data={chartData}>
            <Tooltip />
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="temperature"
              stroke="black"
            />
          </LineChart>
        </ResponsiveContainer>
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
