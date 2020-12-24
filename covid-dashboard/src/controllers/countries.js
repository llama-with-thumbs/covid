import {render, remove, RenderPosition} from '../utils.js';
import CountriesComponent from '../components/countries.js';
import DeathsComponent from '../components/deaths.js';
import RecoveriesComponent from '../components/recoveries.js';
import GlobalComponent from '../components/global.js';
import drawChart from '../components/charts.js';
import ChartsComponent from '../components/charts.js';
export default class CountriesController {

  constructor(container, model, filter = null) {
    this._container = container;
    this._model = model;
    this._filter = filter;
    this._countries = null;
    this._deaths = null;
    this._recoveries = null;
    this._global = null;
    this._charts = null;
  }

  render() {
    const data = this._model.getData();

    this._global = new GlobalComponent(data, this._filter);
    this._countries = new CountriesComponent(data, this._filter);
    this._deaths = new DeathsComponent(data, this._filter);
    this._recoveries = new RecoveriesComponent(data, this._filter);
    this._charts = new ChartsComponent(data, this._filter);

    this._countries.setClickHandler((evt) => {
      this.countriesClickHandler(evt, data);
    });

    this._deaths.setClickHandler((evt) => {
      this.countriesClickHandler(evt, data);
    });

    this._recoveries.setClickHandler((evt) => {
      this.countriesClickHandler(evt, data);
    });

    this.renderLists();
  }

  countriesClickHandler(evt, data) {
    this.onFilterChange(evt);
    this.countriesRerender(evt, data);
  }

  countriesRerender(evt, data) {
    this.removeLists();
    this.reCreateLists(data);
    this.render();
  }

  onFilterChange(evt) {
    evt.preventDefault();
    const parent = evt.target.parentElement;
    if (parent.classList.contains('deaths') || parent.classList.contains('recoveries') || parent.classList.contains('countries')) {
      return;
    }
    if (evt.target.classList.contains('deaths') || evt.target.classList.contains('recoveries') || evt.target.classList.contains('countries')) {
      return;
    } else {
      const chosenCountry = parent.classList[0].slice(2);
      const newFilter = chosenCountry === 'world' ? null : chosenCountry.toUpperCase();
      this._filter = newFilter;
    }
  }

  reCreateLists(data) {
    const newCountries = new CountriesComponent(data, this._filter);
    const newDeaths = new DeathsComponent(data, this._filter);
    const newRecoveries = new RecoveriesComponent(data, this._filter);
    const newGlobal = new GlobalComponent(data, this._filter);
    const newCharts = new ChartsComponent(data, this._filter);
    this._countries = newCountries;
    this._deaths = newDeaths;
    this._recoveries = newRecoveries;
    this._global = newGlobal;
    this._charts = newCharts;
  }

  removeLists() {
    remove(this._countries);
    remove(this._deaths);
    remove(this._recoveries);
    remove(this._global);
    remove(this._charts);
  }

  renderLists() {
    render(this._container, this._countries, RenderPosition.BEFOREEND);
    render(this._container, this._deaths, RenderPosition.BEFOREEND);
    render(this._container, this._recoveries, RenderPosition.BEFOREEND);
    render(this._container, this._global, RenderPosition.BEFOREEND);
    render(this._container, this._charts, RenderPosition.BEFOREEND);
  }

}
