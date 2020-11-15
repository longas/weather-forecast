import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadCity, loadDay } from "../../redux/reducers";
import { IStore } from "../../redux/store";
import { City, Hour } from "../../types";
import { DAYS } from "../../utils";

const WeekForecast = () => {
  const { city: cityId } = useParams<{ city: string }>();
  const dispatch = useDispatch();
  const city = useSelector<IStore, City>((state) => state.selectedCity);
  const hours = useSelector<IStore, Hour[]>((state) => state.selectedCityHours);

  useEffect(() => {
    dispatch(loadCity(cityId));
  }, [cityId, dispatch]);

  const selectDay = (day: string) => {
    dispatch(loadDay(cityId, day));
  };

  return city ? (
    <div className="mt-4">
      <h1 className="text-2xl font-bold">{city.name}</h1>
      <h2 className="text-xl">{city.country}</h2>

      <ul>
        {DAYS.map((d) => {
          const day = city.days.find((cd) => cd.id === d);

          return (
            <li key={d}>
              {day ? (
                <button
                  onClick={() => selectDay(d)}
                >{`${day.id}: ${day.average_temperature}ºC - ${day.forecast}`}</button>
              ) : (
                "No data"
              )}
            </li>
          );
        })}
      </ul>

      <ul className="mt-8">
        {hours.map((h, i) => (
          <li key={i}>{`${i}: ${h.temperature}ºC - ${h.forecast}`}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default WeekForecast;
