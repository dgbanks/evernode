import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import * as d3Actions from '../../actions/d3_actions';
import { fetchCanvas } from '../../actions/canvas_actions';

class CanvasShow extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, d3, window, document);
    this.svg, this.simulation, this.node, this.link;
  }

  componentWillMount() {

    this.props.fetchCanvas(this.props.match.params.canvasId)
      .then(action => {
        const svg = d3.select("#canvas").append("svg")
          .attr("height", "100vh")
          .attr("width", "100vw")
          .attr("fill", "white");
        const simulation = d3.forceSimulation()
          .nodes(action.canvas.data.nodes)
          .force("center_force", d3.forceCenter(
            window.innerWidth / 2,
            window.innerHeight / 2
          )).force("charge_force", d3.forceManyBody());

        const node = svg.append("g").attr("class", "nodes")
          .selectAll("circle")
          .data(action.canvas.data.nodes)
          .enter()
          .append("circle")
          .attr("r", 50)
          .attr("fill", "red");

        simulation.on("tick", () => d3Actions.tickActions(node));
      });

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

  render() {
    console.log('render');
    if (!this.props.canvas) {
      return (
        <div style={{backgroundColor:'black'}} className='spinner-div'>
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      );
    } else {
      return (
        <div className='canvas' id='canvas'>
          {this.navbar()}

        </div>
      );
    }

  }
}

const mapStateToProps = (state, ownProps) => ({
  canvas: state.entities.canvases[ownProps.match.params.canvasId]
});

const mapDispatchToProps = dispatch => ({
  fetchCanvas: canvasId => dispatch(fetchCanvas(canvasId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CanvasShow));
