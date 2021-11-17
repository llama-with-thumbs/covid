import AbstractComponent from "./abstract-component.js";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const makeUpdatedMarkup = (date) => {
  const month = monthNames[+date.getMonth()];

  let h = date.getHours();
  h = h < 10 ? "0" + h : h;

  let m = date.getMinutes();
  m = m < 10 ? "0" + m : m;

  const day = date.getDate();

  return `<div class="updated">
      <p>Data as of <span>${month} ${day} at ${h}:${m}</span></p>

      <div class="box">
        <a class="button" href="#popup1">Data source</a>
      </div>
      
      <div id="popup1" class="overlay">
        <div class="popup">
          <a class="close" href="#">&times;</a>
          <div class="content">
            <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank">Data is sourced from Johns Hopkins CSSE</a>
          </div>
        </div>
      </div>
    </div>`;
};

export default class Updated extends AbstractComponent {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return makeUpdatedMarkup(this._data);
  }
}
