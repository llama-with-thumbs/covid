import { render, remove, RenderPosition } from "../utils.js";
import CountriesComponent from "../components/countries.js";
import DeathsComponent from "../components/deaths.js";
import CasesComponent from "../components/cases.js";
import GlobalComponent from "../components/global.js";
import ChartComponent from "../components/chart/chart-component.js";
import {changeCoordinates} from "./map.js";

export default class CountriesController {
  constructor(container, model, filter = null) {
    this._container = container;
    this._model = model;
    this._filter = filter;
    this._countries = null;
    this._deaths = null;
    this._cases = null;
    this._global = null;

    this._chart = null;
  }
  render() {
    const data = this._model.getData();    

    this._global = new GlobalComponent(data, this._filter);
    this._countries = new CountriesComponent(data, this._filter);
    this._deaths = new DeathsComponent(data, this._filter);
    this._cases = new CasesComponent(data, this._filter);
    // console.log("here");
    this._chart = new ChartComponent(data, this._filter);

    this._countries.setClickHandler((evt) => {
      this.countriesClickHandler(evt, data);
    });

    // this._deaths.setClickHandler((evt) => {
    //   this.countriesClickHandler(evt, data);
    // });

    // this._cases.setClickHandler((evt) => {
    //   this.countriesClickHandler(evt, data);
    // });

    this.renderLists();
  }

  countriesClickHandler(evt, data) {
    this.onFilterChange(evt, data);
  }

  countriesRerender(data) {
    this.removeLists();
    this.reCreateLists(data);
    this.render();
  }

  getParent(element) {
    return element.parentElement;
  }
  getCountryCode(element, getParent) {
    if (element.getAttribute("data-region-code")) {
      return element.getAttribute("data-region-code");
    } else {
      return this.getCountryCode(this.getParent(element));
    }
  }

  onFilterChange(evt, data) {    
    evt.preventDefault();
    const countryCode = this.getCountryCode(evt.target);
    const newFilter = countryCode === "world" ? null : countryCode;
    if (this.filter !== newFilter) {
      this._filter = newFilter;

      this.countriesRerender(data);
      changeCoordinates(data, this._filter);
    }
  }

  reCreateLists(data) {
    const newCountries = new CountriesComponent(data, this._filter);
    const newDeaths = new DeathsComponent(data, this._filter);
    const newCases = new CasesComponent(data, this._filter);
    const newGlobal = new GlobalComponent(data, this._filter);
    const chart = new ChartComponent(data, this._filter);
    this._countries = newCountries;
    this._deaths = newDeaths;
    this._cases = newCases;
    this._global = newGlobal;

    this._chart = chart;
  }

  removeLists() {
    remove(this._countries);
    remove(this._deaths);
    remove(this._cases);
    remove(this._global);
    remove(this._chart);
  }

  renderLists() {
    render(this._container, this._countries, RenderPosition.BEFOREEND);
    render(this._container, this._deaths, RenderPosition.BEFOREEND);
    render(this._container, this._cases, RenderPosition.BEFOREEND);
    render(this._container, this._global, RenderPosition.BEFOREEND);
    render(this._container, this._chart, RenderPosition.BEFOREEND);
  }
}
