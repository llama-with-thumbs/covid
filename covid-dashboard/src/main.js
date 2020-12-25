import {renameObjKeys} from './utils.js';
import UpdatedController from './controllers/updated.js';
import CountriesController from './controllers/countries.js';
import CovidModel from './models/covid.js';
import drawMap from "./controllers/map";
// import drawChart from './controllers/charts.js';

const END_POINT = `https://api.covid19api.com`;
const main = document.querySelector('#main');

const covidModel = new CovidModel();

const loadData = () => {
  fetch(`${END_POINT}/summary`)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      const api = JSON.parse(text);
      renameObjKeys(api);
      renameObjKeys(api.global);
      api.countries.map((item) => renameObjKeys(item));
      covidModel.setData(api);
      const updated = new UpdatedController(main, covidModel);
      const countries = new CountriesController(main, covidModel);
      updated.render();
      countries.render();
    });
 };

//отрисовка чарта

// drawChart();

drawMap();

loadData();

// setTimeout(function(){ 
//   const eConteiner = document.querySelector('.grid-container');
//   console.log(document.getElementById('text'));


// }, 100);
