import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { fetchCanvas } from '../../actions/canvas_actions';

class CanvasShow extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, d3);
  }

  componentDidMount() {
    this.props.fetchCanvas(this.props.match.params.canvasId);
    d3.select('svg').append("p").text("something");

  }

  navbar() {
    return(
      <div className='canvas-nav'>
        <div className='x' onClick={() => this.props.history.goBack()}>
          <i className="fas fa-times"></i>
        </div>
        <div className='canvas-title'>
          <h1>Canvas: {this.props.canvas.title}</h1>
        </div>
      </div>
    );
  }

  tick(e) {
    node.attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .call(force.drag);

    link.attr('x1', function(d) { return d.source.x; })
      .attr('y1', function(d) { return d.source.y; })
      .attr('x2', function(d) { return d.target.x; })
      .attr('y2', function(d) { return d.target.y; })
  }

  render() {
    if (!this.props.canvas) {
      return (
        <div style={{backgroundColor:'black'}} className='spinner-div'>
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      );
    }

    const svg = d3.select("body")
      .append("svg")
      .attr('width', 500)
      .attr('height', 500);

    const force = d3.layout.force()
      .size([500, 500])
      .nodes(d3.values(this.props.nodes))
      .links(this.props.links)
      .on('tick', this.tick)
      .linkDistance(300)
      .start();

    const link = svg.selectAll('.link').data(this.props.links).enter().append('line').attr('class', 'link');

    const node = svg.selectAll('.node').data(force.nodes()).enter().append('circle').attr('class', 'node').attr('r', 5);



    // return (
    //   <div className='canvas' id='canvas'>
    //     {this.navbar()}
    //     <svg className='svg' width='500' height='500'>
    //       <circle r='50'></circle>
    //     </svg>
    //     <p>something</p>
    //   </div>
    // );
  }
}

const mapStateToProps = (state, ownProps) => ({
  canvas: state.entities.canvases[ownProps.match.params.canvasId]
});

const mapDispatchToProps = dispatch => ({
  fetchCanvas: canvasId => dispatch(fetchCanvas(canvasId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CanvasShow));
