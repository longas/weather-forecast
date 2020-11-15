import React from "react";
import { useSelector } from "react-redux";
import { IStore } from "../../redux/store";
import { Day } from "../../types";

interface WeekForecastListItemProps {
  day: Day;
  selectDay: (day: string) => void;
}

const WeekForecastListItem: React.FC<WeekForecastListItemProps> = ({
  day,
  selectDay,
}) => {
  const selectedDay = useSelector<IStore, string>((state) => state.selectedDay);

  const borderStyle =
    day && selectedDay === day.id
      ? "border-black"
      : "border-gray-300 hover:border-black";

  const backgroundStyle =
    day && selectedDay === day.id ? "bg-gray-100" : "hover:bg-gray-100";

  return (
    <li className="flex-grow">
      <button
        className={`h-full p-4 flex flex-col justify-center items-center border-t ${borderStyle} ${backgroundStyle} disabled:cursor-not-allowed`}
        onClick={() => {
          if (day) selectDay(day.id);
        }}
        disabled={day === undefined}
      >
        {day ? (
          <>
            <span className="text-sm font-mono font-bold capitalize">
              {day.id.slice(0, 3)}
            </span>

            <img
              className="mt-2"
              src={`/images/${day.forecast}.svg`}
              alt={day.forecast}
            />

            <span className="mt-2 font-extrabold">
              {day.average_temperature}ºC
            </span>
          </>
        ) : (
          <span className="font-mono text-xs">No data</span>
        )}
      </button>
    </li>
  );
};

export default WeekForecastListItem;
