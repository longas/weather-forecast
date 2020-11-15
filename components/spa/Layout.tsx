import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadCities } from "../../redux/reducers";
import { IStore } from "../../redux/store";
import { CityBasic } from "../../types";

const Layout: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const cities = useSelector<IStore, CityBasic[]>((state) => state.cityList);

  useEffect(() => {
    dispatch(loadCities());
  }, [dispatch]);

  return (
    <div className="p-6 flex flex-col items-center">
      <ul className="flex space-x-6">
        {cities.map((c) => (
          <li key={c.id}>
            <Link to={`/city/${c.id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>

      <div>{children}</div>
    </div>
  );
};

export default Layout;
