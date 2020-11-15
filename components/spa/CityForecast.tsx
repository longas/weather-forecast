import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadCity, loadDay } from "../../redux/reducers";
import { IStore } from "../../redux/store";
import { City, Hour } from "../../types";
import WeekForecastList from "./WeekForecastList";

const CityForecast = () => {
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

      <ul className="mt-8">
        {hours.map((h, i) => (
          <li key={i}>{`${i}: ${h.temperature}ºC - ${h.forecast}`}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default CityForecast;
