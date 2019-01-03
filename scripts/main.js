var link, circ, month;

function RenderMain(){
    // Get selected month from monthSelector
    month = d3.select('#monthSelector').property('value');

    // Read the json, and plot the data
    d3.json('graphData/' + month + '-graph.json', function(error, graph) {
        if (error) throw error;

        // Create the
        link = svg.append('g')
            .classed('link', true)
            .selectAll('line')
            .data(graph.links)
            .enter().append('line');

        var node = svg.append('g')
            .classed('node', true)
            .selectAll('circle')
            .data(graph.nodes)
            .enter();

        circ = node.append('circle')
            .attr('r', function(d) {
                d.radius = NodeRadius(d);
                return d.radius
            })
            .attr('fill', function(d) {
                return d.color;
            })
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));

        circ.append('title')
            .text(function(d){
                return NodeHoverText(d);
            });

        simulation.nodes(graph.nodes)
            .on('tick', ticked);

        simulation.force('link')
            .links(graph.links);
    });
}

function NodeRadius(d){
    return 3*Math.sqrt(d.degree);
}

function NodeHoverText(d) {
    return d.id + '\n' + 'Degree: ' + d.degree;
}

function ticked() {
    circ
        .attr("cx", function(d) {
            return d.x = Math.max(d.radius,
                                  Math.min(width - d.radius, d.x));
        })
        .attr("cy", function(d) {
            return d.y = Math.max(d.radius,
                                  Math.min(height - d.radius, d.y));
        });

    link
        .attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });

}

RenderMain();
