import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "../components/spa/Layout";
import WeekForecast from "../components/spa/WeekForecast";
import store from "../redux/store";

export default function Test() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Route path="/city/:city">
            <WeekForecast />
          </Route>
        </Layout>
      </Router>
    </Provider>
  );
}
