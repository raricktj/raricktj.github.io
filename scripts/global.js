var width = 1000;
var height = 1000;

var zoom = d3.zoom()
    .scaleExtent([0.5, 2])
    .on('zoom',function(){
        svg.transition()
            .ease(d3.easeQuadOut)
            .attr('transform', d3.event.transform);
    });

var svg = d3.select('div#content').append('svg')
    .attr('id', 'mainWindow')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 1000 1000')
    .attr('preserveAspectRatio', 'xMidYMid')
    .call(zoom)
    .on('contextmenu', function(){
        d3.event.preventDefault();
        d3.select('#mainWindow').call(zoom.transform, d3.zoomIdentity);
    })
    .append('g');

var simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(function(d) { return d.id; }))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width/2, height/2));
//    .size([width, height]);

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
    RenderMain();
}
