import { renameObjKeys } from "./utils.js";
import UpdatedController from "./controllers/updated.js";
import CountriesController from "./controllers/countries.js";
import CovidModel from "./models/covid.js";
import drawMap from "./controllers/map.js";
// import drawChart from './controllers/charts.js';

const END_POINT = `https://api.covid19api.com`;
const main = document.querySelector("#main");

const covidModel = new CovidModel();

const loadData = () => {
  fetch(`${END_POINT}/summary`)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      const api = JSON.parse(text);
      // console.log(api);

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

const loadMapData = () => {
  fetch(`https://corona.lmao.ninja/v2/countries`)
    .then((res) => res.json())
    .then((data) => {
      drawMap(data);
      // console.log(data);
    });
};

const checkCpia = (country) => {
  fetch("../public/assets/CPIA.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(country);
      console.log(data);
    });
};

// checkCpia();

loadMapData();
loadData();
