import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import Editor from './editor';
import { fetchCanvas } from '../../actions/canvas_actions';

class CanvasShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.props.fetchCanvas(this.props.match.params.canvasId)
      .then(action => {
        const svg = d3.select("#canvas").append("svg")
          .attr("height", "100vh")
          .attr("width", "100vw")
          .on("click", (x, y, z) => {
            console.log('SVG CLICKED', x, y, z);
            if (this.state.selected) {
              // g.selectAll(".selected").classed("selected", false);
            }
          });

        const simulation = d3.forceSimulation()
          .nodes(action.canvas.data.nodes)
          .force("center_force", d3.forceCenter(
            window.innerWidth / 2,
            window.innerHeight / 2
          )).force("charge_force", d3.forceManyBody().strength(-100));

        const g = svg.append("g").attr("class", "everything");

        const node = g.append("g").attr("class", "nodes")
          .selectAll("circle")
          .data(action.canvas.data.nodes)
          .enter()
          .append("circle")
          .attr("r", 50)
          .attr("fill", "red")
          .attr("id", d => `node${d.id}`)
          .on("click", (e) => {
            console.log('NODE CLICKED', e);
            g.selectAll(".selected").classed("selected", false);
            if (!this.state.selected || (this.state.selected.id !== e.id)) {
              g.select(`#node${e.id}`).classed("selected", true);
            }
            this.setState({ selected: this.state.selected === e ? null : e });
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
      });
  }

  navbar() {
    // <i className="fas fa-times"></i>
    return (
      <div className='canvas-nav'>
        <div className='x' onClick={() => this.props.history.goBack()}>
        </div>
        <div className='canvas-title'>
          <h1>Canvas: {this.props.canvas.title}</h1>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.selected) {
      d3.select('#canvas').classed('compress-canvas', true);
    } else {
      d3.select('#canvas').classed('compress-canvas', false);
    }

    console.log('render');
    console.log(this.state);
    if (!this.props.canvas) {
      // <i className="fas fa-spinner fa-pulse"></i>
      return (
        <div style={{backgroundColor:'black'}} className='spinner-div'>
        </div>
      );
    } else {
      return (
        <div style={{
          display:'flex',
          alignItems:'center',
          backgroundColor: 'black'
        }}>
          <div className='canvas' id='canvas'>
            {this.navbar()}
          </div>
          {this.state.selected ? <Editor node={this.state.selected} /> : <div/>}
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
