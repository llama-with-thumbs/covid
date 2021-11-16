import AbstractComponent from './abstract-component.js';
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
<<<<<<< HEAD

  return `<div class="updated">
      <p>Data as of ${month} ${day} at ${h}:${m}</p>
    </div>`;
=======
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}`;
  return (
    `<div class="updated">
      <p>Last updated at</p>
      <h4>${formattedDate}</h4>
    </div>`
  );
>>>>>>> stash@{1}
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
