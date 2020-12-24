import AbstractComponent from './abstract-component.js';
import Chart from "chart.js";
import {filterById} from '../utils.js';

import {
  select,
  csv,
  json,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  scaleLog,
  format,
  timeFormat
} from 'd3';

export const getCountryName = (data, filter) => {
  if (filter === null) return;
  const dataFiltered = filterById(data, filter);
  // console.log(dataFiltered);
  const countryData = dataFiltered.countries[0];
  const name = countryData.country;
  // console.log(name);
  return name;
};

export function drawChart(country) {
  
  //clean section charts
  const charts = document.querySelector('.charts');
  charts.innerHTML = '';
  const chartWrapper = document.createElement('div');
  chartWrapper.classList.add('csv__wrapper');
  charts.appendChild(chartWrapper);

  const svg = select('.csv__wrapper')
  .append('svg')
  .attr('width', 480)
  .attr('height', 300);

  const width = +svg.attr('width')
  const height = +svg.attr('height');

  const render = data => {
      const xValue = d => d.date;
      const yValue = d => d.cases;
      const margin = { top: 20, right: 20, bottom: 20, left: 40};
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const g = svg.append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

      const yScale = scaleLinear()
          .domain([0, max(data, yValue)])
          .range([innerHeight, 0]);

      const yAxisTickFormat = d => format('.2s')(d);     

      const xScale = scaleBand()
          .domain(data.map(xValue))
          .range([0, innerWidth])
          .padding(0.1);

      const xAxis = axisBottom(xScale)
          .tickSize(-innerHeight)
          .tickFormat(timeFormat('%b'))
          .tickValues(xScale.domain().filter((d, i) => !(i%30)))

      const yAxis = axisLeft(yScale)
          .tickFormat(yAxisTickFormat)
          .tickSize(-innerWidth)

      g.append('g').attr('class', 'y axis').call(yAxis);
      g.append('g').attr('class', 'x axis').call(xAxis)
          .attr('transform', `translate(0,${innerHeight})`);

      const rect = g.append('g').selectAll('rect').data(data)
          .enter().append('rect')
              .attr('x', d => xScale(xValue(d)))
              .attr('height', d => (innerHeight - yScale(yValue(d))))
              .attr('width', xScale.bandwidth())
              .attr('y', d => yScale(yValue(d)));
              
      rect.append("svg:title")
          .text((d) => `${d.date.toLocaleDateString('en-US')} : ${format('.3s')(d.cases)}`);

      rect.on('click', function() {
          event.stopPropagation();
      });
      rect.on('mouseover', function() {
          select(this).style('fill', '#676767');
          
      });
      rect.on('mouseleave', function() {
          select(this).style('fill', 'steelblue');
      });
  };

  if(country === undefined) {
    csv('./assets/covid-data.csv').then((data) => {
      data.forEach( d => {
          d.cases = +d.cases;
          d.date = new Date(d.date);
      });
      render(data);
    });
  } else {
    const currDate = new Date();
    let newCountry = country.toLowerCase();
    json(`https://api.covid19api.com/country/${newCountry}/status/confirmed?from=2020-01-01T00:00:00Z&to=${currDate}`).then((data) => {
    const newData = data.map( d => {
      return { cases : +d.Cases,
              date : new Date(d.Date)}
      });
    render(newData);
  });
  }
  
  return undefined;
};

export const makeChartsMarkup = (data, filter) => {
  const name = getCountryName(data, filter);
  const markup = drawChart(name);
  return markup;
};

export default class Charts extends AbstractComponent {

  constructor(data, filter) {
    super();
    this._data = data;
    this._filter = filter;
  }

  getTemplate() {
    return makeChartsMarkup(this._data, this._filter);
  }

}