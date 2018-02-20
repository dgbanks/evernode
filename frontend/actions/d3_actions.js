import * as d3 from 'd3';

export const tickActions = (node) => {
  node
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
};

export const zoomActions = (arg) => {
  arg.attr("transform", d3.event.transform);
};

export const dragStart = (d) => {
  if (d3.event) {

  }
  d.fx =
};
