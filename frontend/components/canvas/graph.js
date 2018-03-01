import React from 'react';
import * as d3 from 'd3';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.createGraph = this.createGraph.bind(this);
    this.restart = this.restart.bind(this);
    // this.width, this.height = window.innerWidth, window.innerHeight;
  }

  componentDidMount() {
    console.log('props',this.props);
    this.createGraph();
  }

  componentDidUpdate() {
    this.restart();

    if (this.props.selected) {
      d3.select('.canvas-flex').classed('compress-canvas', true);
    } else {
      d3.select('.canvas-flex').classed('compress-canvas', false);
      d3.select(".selected").classed("selected", false);
    }
  }

  restart() {
    console.log('graph.restart');
    // Apply the general update pattern to the nodes.
    const node = this.node.data(this.props.nodes, function(d) { return d.id;});
    node.exit().remove();
    node.enter().append("circle").attr("fill", "red").attr("r", 50).merge(node);

    // Apply the general update pattern to the links.
    const link = this.link.data(this.props.links, function(d) { return d.source.id + "-" + d.target.id; });
    link.exit().remove();
    link.enter().append("line").attr("stroke-width", 2).merge(link);

    // Update and restart the simulation.
    this.simulation.nodes(this.props.nodes)
    .force("center_force", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
    .force("charge_force", d3.forceManyBody().strength(-100))
    // .force("link", d3.forceLink(this.props.links));
    // .id(d => d.id));
    this.simulation.alpha(1).restart();
  }

  createGraph() {
    console.log('CREATE GRAPH', this.props);

    this.graph = d3.select('#graph');

    console.log('applying forces');
    this.simulation = d3.forceSimulation(this.props.nodes)
    .force("center_force", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
    .force("charge_force", d3.forceManyBody().strength(-100))
    console.log(this.props.links)
    // .force("link", d3.forceLink(this.props.links));
    // .id(d => d.id));
    // .id(d => {
    //   console.log(d.id);
    //   return d.id;
    // }));
    console.log('finished applying forces');
    const g = this.graph.append("g").attr("class", "everything");

    this.node = g.append("g").attr("class", "nodes")
    .selectAll("circle")
    .data(this.props.nodes)
    .enter()
    .append("circle")
    .attr("r", 50)
    .attr("fill", "red")
    .attr("id", d => d.id)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .text(d => d.title)
    .on("click", (e) => {
      if (!this.props.selected || (this.props.selected.id !== e.id)) {
        d3.select("circle").classed("selected", true);
      }
      this.props.handleNodeClick(e);
    });

    console.log('drawing links');
    this.link = g.append("g").attr("class", "links")
      .selectAll("line")
      .data(this.props.links)
      .enter()
      .append("line")
      .attr("stroke-width", 10)
      .attr("stroke", "yellow");

    this.simulation.on("tick", () => {
      this.node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
      console.log('onTick links');
      // this.link
      // .attr("x1", d => {console.log(d); return d.source.x;})
      // .attr("y1", d => {console.log(d); return d.source.y;})
      // .attr("x2", d => {console.log(d); return d.target.x;})
      // .attr("y2", d => {console.log(d); return d.target.y;});
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
