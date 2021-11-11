import { render, remove, RenderPosition } from "../utils.js";
import CountriesComponent from "../components/countries.js";
import DeathsComponent from "../components/deaths.js";
import CasesComponent from "../components/cases.js";
import GlobalComponent from "../components/global.js";
import ChartComponent from "../components/chart/chart-component.js";

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

  onFilterChange(evt, data) {
    evt.preventDefault();
    console.log(evt.target.getAttribute("data-country-name"));
    console.log(data);
    const parent = evt.target.parentElement;
    if (
      parent.classList.contains("deaths") ||
      parent.classList.contains("recoveries") ||
      parent.classList.contains("countries")
    ) {
      return;
    }
    if (
      evt.target.classList.contains("deaths") ||
      evt.target.classList.contains("recoveries") ||
      evt.target.classList.contains("countries")
    ) {
      return;
    }
    if (
      evt.target.classList.contains("county-flag") ||
      evt.target.nodeName === "TR"
    ) {
      return;
    } else {
      const chosenCountry = parent.classList[0].slice(2);
      const newFilter =
        chosenCountry === "world" ? null : chosenCountry.toUpperCase();
        if (this.filter !== newFilter){
          this._filter = newFilter;
          this.countriesRerender(data);
        }
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
