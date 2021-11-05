import AbstractComponent from './abstract-component.js';
import {filterById} from '../utils.js';

export const makeDeathRow = (countryData) => {
  const name = countryData.country;
  const todayDeaths = countryData.newDeaths.toLocaleString();
  const totalDeaths = countryData.totalDeaths.toLocaleString();
  const id = countryData.countryCode;
  const trName = `c-${id}`;
  return (
    `<tr class="${trName}">
      <td class="country__name">${name}<br>
      ${totalDeaths} died<br>
      (${todayDeaths} today)
      </td>
    </tr>`
  );
};

export const makeDeathsTableMarkup = (data, filter) => {
  const dataFiltered = filterById(data, filter);
  const sum = data.global.totalDeaths;
  const countries = dataFiltered.countries;
  const rows = countries.map((item) => makeDeathRow(item)).join('');
  
  return (
    `<div class="deaths">
    <h3 class="death__header">Deaths</h3>
    <hr>
      <table class="deaths__table">
        ${rows}
      </table>
    </div>`
  );
};

export default class Deaths extends AbstractComponent {

 constructor(data, filter) {
  super();
  this._data = data;
    this._filter = filter;

  }

  getTemplate() {
    return makeDeathsTableMarkup(this._data, this._filter);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', handler);
  }

  recoveryListeners() {
    this.setClickHandler();
  }
}