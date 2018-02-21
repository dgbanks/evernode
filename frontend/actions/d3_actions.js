import * as d3 from 'd3';

export const d3action = (action) => {
  const svg = d3.select("#canvas").append("svg")
    .attr("height", "100vh")
    .attr("width", "100vw");

  const simulation = d3.forceSimulation()
    .nodes(action.canvas.data.nodes)
    .force("center_force", d3.forceCenter(
      window.innerWidth / 2,
      window.innerHeight / 2
    )).force("charge_force", d3.forceManyBody());

  const g = svg.append("g").attr("class", "everything");

  const node = g.append("g").attr("class", "nodes")
    .selectAll("circle")
    .data(action.canvas.data.nodes)
    .enter()
    .append("circle")
    .attr("r", 50)
    .attr("fill", "red")
    .on("click", () => this.setState({ selected: d3.event.target.__data__}));
    // .on("click", () => d3.select(d3.event.target).attr("id", "selected"));

  simulation.on("tick", () => {
    node
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; });
  });

/// zoom

  const zoomHandler = d3.zoom().on("zoom", () => {
    g.attr("transform", d3.event.transform);
  });

  zoomHandler(svg);

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
};
