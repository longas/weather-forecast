import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { loadCities } from "../../redux/reducers";
import { IStore } from "../../redux/store";
import { CityBasic } from "../../types";
import Footer from "./Footer";

const Layout: React.FC = ({ children }) => {
  const history = useHistory();
  const { city: cityId } = useParams<{ city: string }>();
  const dispatch = useDispatch();
  const cities = useSelector<IStore, CityBasic[]>((state) => state.cityList);

  const selectOptions = useMemo(() => {
    if (!cities.length) return [];

    return cities.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  }, [cities]);

  useEffect(() => {
    dispatch(loadCities());
  }, [dispatch]);

  const selectCity = (ev) => {
    history.push(`/city/${ev.value}`);
  };

  return (
    <div className="p-4 md:p-6 flex flex-col items-center">
      <div className="w-full md:w-forecast">
        <div className="w-full flex justify-between items-center flex-wrap">
          <h1 className="text-4xl font-bold">Weather Forecast</h1>

          {selectOptions.length > 0 && (
            <Select
              defaultValue={selectOptions.find((o) => o.value === cityId)}
              onChange={selectCity}
              className="w-40"
              options={selectOptions}
            />
          )}
        </div>

        <div className="mt-6">{children}</div>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
