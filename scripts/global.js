var width = window.innerWidth - 20;
var height = window.innerHeight - 40;

var svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);

var simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(function(d) { return d.id; }))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width/2, height/2));

var months = ['2017-05',
              '2017-06',
              '2017-07',
              '2017-08',
              '2017-09',
              '2017-10',
              '2017-11',
              '2017-12',
              '2018-01',
              '2018-02',
              '2018-03'];

var monthSelector = d3.select('#monthSelector')
    .on('change', ChangeMonth);

var options = monthSelector.selectAll('option')
    .data(months).enter()
        .append('option')
            .text(function(d){
                return d;
            });

function ChangeMonth(){
    svg.selectAll('*').remove();
    setTimeout(RenderMain, 100);
}
