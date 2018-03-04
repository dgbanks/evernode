import React from 'react';
import * as d3 from 'd3';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.createGraph = this.createGraph.bind(this);
    this.restart = this.restart.bind(this);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  componentDidMount() {
    console.log('props',this.props);
    this.createGraph();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');

    if (this.props.selected) {
      d3.select('.canvas-flex').classed('compress-canvas', true);
      this.width = window.innerWidth * .6;
    } else {
      d3.select('.canvas-flex').classed('compress-canvas', false);
      d3.select(".selected").classed("selected", false);
      this.width = window.innerWidth;
    }
    this.restart();
  }

  restart() {
    console.log('graph.restart', window);
    
    // Apply the general update pattern to the links.
    const link = this.link.data(this.props.links, d => d.id);
    link.exit().remove();
    link.enter().append("line").attr("stroke-width", 2).merge(link);

    // Apply the general update pattern to the nodes.
    const node = this.node.data(this.props.nodes, d => d.id);
    node.exit().remove();
    node.enter().append("circle").attr("fill", "red").attr("r", 50).merge(node);

    // Update and restart the simulation.
    this.simulation.nodes(this.props.nodes)
    .force("center_force", d3.forceCenter(this.width / 2, this.height / 2))
    .force("charge_force", d3.forceManyBody().strength(-1000).distanceMin(50))
    .force("link", d3.forceLink(this.props.links).id(d => d.id).distance(300));
    this.simulation.alpha(1).restart();
  }

  createGraph() {

    this.graph = d3.select('#graph');
    console.log('GRAPH', this.graph.size());
    this.simulation = d3.forceSimulation(this.props.nodes)
    .force("center_force", d3.forceCenter(this.width / 2, this.height / 2))
    .force("charge_force", d3.forceManyBody().strength(-1000).distanceMin(50))
    .force("link", d3.forceLink(this.props.links)
      .id(d => d.id)
      .distance(300));

    const g = this.graph.append("g").attr("class", "everything");

    this.link = g.append("g").attr("class", "links")
    .selectAll("line")
    .data(this.props.links)
    .enter()
    .append("line")
    .attr("stroke-width", 10)
    .attr("stroke", "yellow");

    this.node = g.append("g").attr("class", "nodes")
    .selectAll("circle")
    .data(this.props.nodes)
    .enter()
    .append("circle")
    .attr("r", 50)
    .attr("fill", "red")
    .attr("id", d => `node${d.id}`)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .text(d => d.title)
    .on("click", (e) => {
      if (!this.props.selected || (this.props.selected.id !== e.id)) {
        d3.select(`#node${e.id}`).classed("selected", true);
      }
      this.props.handleNodeClick(e);
    });

    this.simulation.on("tick", () => {
      this.node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

      this.link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    });

    /// zoom

    const zoomHandler = d3.zoom().on("zoom", () => {
      g.attr("transform", d3.event.transform);
    });

    zoomHandler(this.graph);

    /// drag

    const dragHandler = d3.drag()
    .on("start", (d) => {
      if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }).on("drag", (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }).on("end", (d) => {
      if (!d3.event.active) this.simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });

    dragHandler(this.node);
  }

  render() {
    return <svg id='graph' width='100%' height='100%'></svg>;
  }
}

export default Graph;
