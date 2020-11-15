import React from "react";
import { City } from "../../types";
import { DAYS } from "../../utils";
import WeekForecastListItem from "./WeekForecastListItem";

interface WeekForecastListProps {
  city: City;
  selectDay: (day: string) => void;
}

const WeekForecastList: React.FC<WeekForecastListProps> = ({
  city,
  selectDay,
}) => {
  return (
    <ul className="flex">
      {DAYS.map((d) => {
        const day = city.days.find((cd) => cd.id === d);
        return (
          <WeekForecastListItem
            key={d}
            dayId={d}
            day={day}
            selectDay={selectDay}
          />
        );
      })}
    </ul>
  );
};

export default WeekForecastList;
