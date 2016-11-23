riot.tag2('animation', '<h3>{opts.title}</h3> <svg class="chart" id="{chartId}"></svg>', '.bar { fill: steelblue; } .bar:hover { fill: brown; } .axis { font: 10px sans-serif; } .axis path { shape-rendering: crispEdges; }', '', function(opts) {
'use strict';

this.on('mount', function () {
  var data = opts.stocks.map(function (s) {
    return { 'title': s.title, 'price': s.price };
  });

  createChart(data, this.chartId, opts.height, opts.width);
});

this.chartId = opts.chart_id || 'chart-1';

this.on('mount', function () {
  var data = opts.stocks.map(function (s) {
    return { 'title': s.title, 'price': s.price };
  });

  createChart(data, this.chartId, opts.height, opts.width);
});

function createChart(data, chartId) {
  var aHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var aWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 960;

  var margin = { top: 20, right: 30, bottom: 30, left: 40 },
      width = aWidth - margin.left - margin.right,
      height = aHeight - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1).align(0.1);

  var y = d3.scaleLinear().rangeRound([height, 0]);

  var chart = d3.select("#" + chartId).attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(data.map(function (d) {
    return d.title;
  }));

  y.domain([0, d3.max(data, function (d) {
    return d.price;
  })]);

  chart.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));

  chart.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y).ticks(10, "s")).append("text").attr("x", 2).attr("y", y(y.ticks(10).pop())).attr("dy", "0.35em").attr("text-anchor", "start").attr("fill", "#000").text("Price");

  chart.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function (d) {
    return x(d.title);
  }).attr("y", function (d) {
    return y(d.price);
  }).attr("height", function (d) {
    return height - y(d.price);
  }).attr("width", x.bandwidth());
}
});