import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CityForecast from "../components/spa/CityForecast";
import Layout from "../components/spa/Layout";
import store from "../redux/store";

export default function Test() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/city/:city">
          <Layout>
            <CityForecast />
          </Layout>
        </Route>
      </Router>
    </Provider>
  );
}
