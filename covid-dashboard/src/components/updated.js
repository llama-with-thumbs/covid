import AbstractComponent from './abstract-component.js';

export const makeUpdatedMarkup = (date) => {
  // console.log(date, typeof date);
  const month = +date.getMonth() + 1;
  const year = date.getFullYear();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}`;
  return (
    `<div class="updated">
      <p>Last updated at</p>
      <h4>${formattedDate}</h4>
    </div>`
  );
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