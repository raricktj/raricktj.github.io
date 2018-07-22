var width = window.innerWidth - 20;
var height = window.innerHeight - 20;

var svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);

var simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(function(d) { return d.id; }))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width/2, height/2));

var month = '2018-02';