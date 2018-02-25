import React from 'react';
import * as d3 from 'd3';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.createGraph = this.createGraph.bind(this);
  }

  componentDidMount() {
    console.log('props',this.props);
    this.createGraph();
  }

  componentDidUpdate() {
    // this.createGraph();

    if (this.props.selected) {
      d3.select('#graph').classed('compress-canvas', true);
    } else {
      d3.select('#graph').classed('compress-canvas', false);
      d3.select(".selected").classed("selected", false);
    }
  }

  createGraph() {
    // const graph = d3.select('#graph');

    const graph = d3.select("#graph").append("svg")
    .attr("height", "100vh")
    .attr("width", "100vw");

    const simulation = d3.forceSimulation()
    .nodes(this.props.nodes)
    .force("center_force", d3.forceCenter(
      window.innerWidth / 2,
      window.innerHeight / 2
    )).force("charge_force", d3.forceManyBody().strength(-100));

    const g = graph.append("g").attr("class", "everything");

    d3.select(node)
      .selectAll('circle')
      .data(this.props.nodes)
      .enter()
      .append('circle');

   d3.select(node)
      .selectAll('rect')
      .data(this.props.nodes)
      .exit()
      .remove();

    const node = g.append("g").attr("class", "nodes")
    .selectAll("circle")
    .data(this.props.nodes)
    .enter()
    .append("circle")
    .attr("r", 50)
    .attr("fill", "red")
    .attr("id", d => `node${d.id}`)
    .text(d => d.title)
    .on("click", (e) => {
      if (!this.props.selected || (this.props.selected.id !== e.id)) {
        d3.select(`#node${e.id}`).classed("selected", true);
      }
      this.props.handleNodeClick(e);
    });

    simulation.on("tick", () => {
      node
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; });
    });

    /// zoom

    const zoomHandler = d3.zoom().on("zoom", () => {
      g.attr("transform", d3.event.transform);
    });

    zoomHandler(graph);

    /// drag

    const dragHandler = d3.drag()
    .on("start", (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }).on("drag", (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }).on("end", (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });

    dragHandler(node);
  }

  render() {
    return (
      <div id='graph'></div>
    );
  }
}

export default Graph;
