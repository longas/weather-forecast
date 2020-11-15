import { useParams } from "react-router-dom";
import DayForecast from "./DayForecast";
import WeekForecast from "./WeekForecast";

const CityForecast = () => {
  const { city: cityId } = useParams<{ city: string }>();

  return (
    <div className="mt-4">
      <WeekForecast cityId={cityId} />
      <DayForecast />
    </div>
  );
};

export default CityForecast;
