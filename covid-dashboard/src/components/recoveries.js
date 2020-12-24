import AbstractComponent from './abstract-component.js';
import {filterById} from '../utils.js';

export const makeRecRow = (countryData) => {
  const name = countryData.country;
  const totalRec = countryData.totalRecovered;
  const todayRec = countryData.newRecovered;
  const id = countryData.countryCode;
  const trName = `c-${id}`;
  return (
    `<tr class="${trName}">
      <td>${totalRec} recovered<br>
      (${todayRec} today)<br>
      ${name}</td>
    </tr>`
  );
};

export const makeRecoveriesTableMarkup = (data, filter) => {
  const dataFiltered = filterById(data, filter);
  const sum = data.global.totalRecovered;
  const countries = dataFiltered.countries;
  const rows = countries.map((item) => makeRecRow(item, filter)).join('');
  
  return (
    `<div class="recoveries">
      <p>Global recoveries</p>
      <h3>${sum}</h3>
      <table class="recov__table">
        ${rows}
      </table>
    </div>`
  );
};

export default class Recoveries extends AbstractComponent {

 constructor(data, filter) {
  super();
  this._data = data;
  this._filter = filter;
  }

  getTemplate() {
    return makeRecoveriesTableMarkup(this._data, this._filter);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', handler);
  }

  recoveryListeners() {
    this.setClickHandler();
  }
}