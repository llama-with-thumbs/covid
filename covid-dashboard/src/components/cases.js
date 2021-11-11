import AbstractComponent from './abstract-component.js';
import {filterById} from '../utils.js';

export const makeRecRow = (countryData) => {
  const name = countryData.country;
  // console.log(countryData);
  const totalCases = countryData.totalConfirmed;
  const todayCases = countryData.newConfirmed;
  const id = countryData.countryCode;
  const trName = `c-${id}`;
  return (
    `<tr class="${trName}">
      <td>
      <span class="country__name">${name}</span><br>
      Total number of cases:${totalCases}<br>
      Number of cases today:${todayCases}<br>
      </td>
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
      <h3 class="recovered__header">Cases</h3>
      <hr>
      <table class="recov__table">
        ${rows}
      </table>
    </div>`
  );
};

export default class Cases extends AbstractComponent {

 constructor(data, filter) {
  super();
  this._data = data;
  this._filter = filter;
  }

  getTemplate() {
    return makeRecoveriesTableMarkup(this._data, this._filter);
  }

  // setClickHandler(handler) {
  //   this.getElement().addEventListener('click', handler);
  // }

  // recoveryListeners() {
  //   this.setClickHandler();
  // }
}