function RenderMain(){
    d3.json('graphData/' + month + '-graph.json', function(error, graph) {
      if (error) throw error;

      var link = svg.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(graph.links)
            .enter().append('line');

      var node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(graph.nodes)
            .enter();

      var circ = node.append('circle')
            .attr('r', function(d) { 
                return NodeRadius(d); 
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

        function ticked() {
            link
                .attr('x1', function(d) { return d.source.x; })
                .attr('y1', function(d) { return d.source.y; })
                .attr('x2', function(d) { return d.target.x; })
                .attr('y2', function(d) { return d.target.y; });

            circ
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; });
        }
    });
}

function NodeRadius(d){
    return 3*Math.sqrt(d.degree);
}

function NodeHoverText(d) { 
    return d.id + '\n' + 'Degree: ' + d.degree; 
}

RenderMain();