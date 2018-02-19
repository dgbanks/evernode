import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { fetchCanvas } from '../../actions/canvas_actions';

class CanvasShow extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, d3, window);
    this.svg, this.simulation, this.node, this.link;
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.props.fetchCanvas(this.props.match.params.canvasId)
      .then(action => {
        this.svg = d3.select("svg");
        this.simulation = d3.forceSimulation().nodes(action.canvas.data.nodes)
          .force("charge_force", d3.forceManyBody())
          .force("center_force", d3.forceCenter(500,500));
        this.node = this.svg.append("g").attr("class", "nodes")
          .selectAll("circle")
          .data(action.canvas.data.nodes)
          .enter()
          .append("circle")
          .attr("r", 50)
          .attr("fill", "red");
        // this.simulation.on("tick", this.tick);
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

  tick(e) {
    console.log(e);
    this.node
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; });
      // .call(this.force.drag);

    // this.link.attr('x1', function(d) { return d.source.x; })
    //   .attr('y1', function(d) { return d.source.y; })
    //   .attr('x2', function(d) { return d.target.x; })
    //   .attr('y2', function(d) { return d.target.y; });
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
          <svg style={{backgroundColor:'white'}} height="100vh" width="100vw">
          </svg>
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


// this.svg = d3.select("body")
//   .append("svg")
//   .attr('width', 500)
//   .attr('height', 500);
//
// this.force = d3.layout.force()
//   .size([500, 500])
//   .nodes(d3.values(this.props.nodes))
//   .links(this.props.links)
//   .on('tick', this.tick)
//   .linkDistance(300)
//   .start();
//
// this.link = this.svg.selectAll('.link')
//   .data(this.props.links)
//   .enter()
//   .append('line')
//   .attr('class', 'link');
//
// this.node = this.svg.selectAll('.node')
//   .data(this.force.nodes())
//   .enter()
//   .append('circle')
//   .attr('class', 'node')
//   .attr('r', 5);
