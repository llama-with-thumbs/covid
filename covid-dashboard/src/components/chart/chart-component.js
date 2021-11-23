import AbstractComponent from "../abstract-component.js";
import { filterById } from "../../utils.js";
import dailyChart from "./daily-chart/daily-chart.js";
import sumChart from "./sum-chart/sum-chart.js";

const Chart = (countyName) => {
  // console.log(countyName);
  dailyChart(countyName);
  sumChart(countyName);
  return " ";
};

export const getCountryName = (data, filter) => {
  if (filter === "world") return "total";
  const dataFiltered = filterById(data, filter);
  const countryData = dataFiltered.countries[0];
  const name = countryData.country;
  return name;
};

export const makeChartsMarkup = (data, filter) => {
  const name = getCountryName(data, filter);

  // console.log(data, filter);
  const markup = Chart(name);
  return markup;
};

export default class Charts extends AbstractComponent {
  constructor(data, filter) {
    super();
    this._data = data;
    this._filter = filter;
  }

  getTemplate() {
    return makeChartsMarkup(this._data, this._filter);
  }
}
