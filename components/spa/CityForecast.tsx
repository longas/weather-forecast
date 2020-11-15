import { useParams } from "react-router-dom";
import DayForecast from "./DayForecast";
import WeekForecast from "./WeekForecast";

const CityForecast = () => {
  const { city: cityId } = useParams<{ city: string }>();

  return (
    <>
      <WeekForecast cityId={cityId} />
      <DayForecast />
    </>
  );
};

export default CityForecast;
