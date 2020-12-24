import AbstractComponent from './abstract-component.js';
import {filterById} from '../utils.js';

export const makeGlobalMarkup = (data, filter) => { 
  let sum = 0;
  let todaySum = 0;
  let region = 'WHOLE WORLD';
  if (filter === null) {
    sum = data.global.totalConfirmed;
    todaySum = data.global.newConfirmed;
  } else {
    const countryData = filterById(data, filter);
    sum = countryData.countries[0].totalConfirmed;
    todaySum = countryData.countries[0].newConfirmed;
    region = countryData.countries[0].country;
  }
  return (
    `<div class="global_cases">
      <h2>${region}</h2>
      <h4>Global Cases</h4>
      <h2>${sum}</h2>
      <h4>New cases for today</h4>
      <h2>${todaySum}</h2>
    </div>`
  );
};

export default class Global extends AbstractComponent {

  constructor(data, filter) {
    super();
    this._data = data;
    this._filter = filter;
  }

  getTemplate() {
    return makeGlobalMarkup(this._data, this._filter);
  }

}