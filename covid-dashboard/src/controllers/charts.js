import {
    select,
    csv,
    scaleLinear,
    max,
    scaleBand,
    axisLeft,
    axisBottom,
    scaleLog,
    format,
    timeFormat
} from 'd3';

export default function drawChart(country, startDate, endDate) {
    const svg = select('.charts')
    .append('svg')
    .attr('width', 900)
    .attr('height', 500);

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
    console.log('from carts| csv: ', csv);
        csv('./assets/covid-data.csv').then((data) => {
        data.forEach( d => {
            d.cases = +d.cases;
            d.date = new Date(d.date);
        });
        render(data);
    });
    // json(`https://api.covid19api.com/country/russia/status/confirmed?from=2020-01-01T00:00:00Z&to=2020-12-01T00:00:00Z`).then((data) => {
    //     const newData = data.map( d => {
    //         return { cases : +d.Cases,
    //                 date : new Date(d.Date)}
    //         });
    //     render(newData);
    // });
    
    return undefined;
}