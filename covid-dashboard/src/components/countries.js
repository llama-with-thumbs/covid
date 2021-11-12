import AbstractComponent from "./abstract-component.js";

export const makeCountryRow = (countryData, filter) => {
  const name = countryData.country;
  const totalCases = countryData.totalConfirmed.toLocaleString();
  const todayCases = countryData.newConfirmed.toLocaleString();
  const id = countryData.countryCode.toLowerCase();
  const trName = `c-${id}`;
  const isActive = countryData.countryCode === filter ? `active` : ``;
  const countryCode = countryData.countryCode === "XK" ? "EU" : countryData.countryCode;
  return `<tr class="${trName} ${isActive}" data-region-code="${countryCode}">
      <td class="quantity">${totalCases}</td>
      <td class="country-name">
        ${name}<img class="county-flag" src="https://www.countryflagicons.com/FLAT/24/${countryCode}.png" height="20" width="20" alt="flag">
      </td>
    </tr>`;
};

export const makeWorldRow = (data, filter) => {
  const totalCases = data.global.totalConfirmed.toLocaleString();
  const todayCases = data.global.newConfirmed.toLocaleString();
  const isActive = filter === null ? `active` : ``;
  return `<tr class="c-world" ${isActive} data-region-code="world">
    <td class="quantity">${totalCases}</td>
    <td class="country-name">Worldwide <span class="county-flag">🌎</span></td>
    </tr>`;
};

export const makeCountriesTableMarkup = (data, filter) => {
  const countries = data.countries;
  const rows = countries.map((item) => makeCountryRow(item, filter)).join("");
  const world = makeWorldRow(data, filter);
  return `<div class="countries">
      <h4 class="countries__header">Cases by Country</h4>
      <hr class="line">
      <table class="countries__table">
        ${world}
        ${rows}
      </table>
    </div>`;
};

export default class Countries extends AbstractComponent {
  constructor(data, filter) {
    super();
    this._data = data;
    this._filter = filter;
  }

  getTemplate() {
    return makeCountriesTableMarkup(this._data, this._filter);
  }

  recoveryListeners(handler) {
    this.setClickHandler(handler);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(".countries__table").addEventListener("click", handler);
  }
}
