import React from "react";
import { Hour } from "../../types";

interface DayForecastListItemProps {
  hour: string;
  hourData: Hour;
}

const DayForecastListItem: React.FC<DayForecastListItemProps> = ({
  hour,
  hourData,
}) => {
  return (
    <li className="p-4 flex flex-col justify-center items-center hover:bg-gray-100">
      <span className="font-mono text-xs">{hour}</span>

      <div className="flex-grow flex flex-col justify-center items-center">
        {hourData ? (
          <>
            <img
              className="mt-1"
              src={`/images/${hourData.forecast}.svg`}
              alt={hourData.forecast}
            />

            <span className="text-sm font-bold mt-2">
              {hourData.temperature}ºC
            </span>
          </>
        ) : (
          <span className="font-mono text-xs">No data</span>
        )}
      </div>
    </li>
  );
};

export default DayForecastListItem;
