import React, { Component } from "react";

export default class Button extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <button
        type="button"
        className="btn btn-default"
        onClick={this.props.onClick}
        data-cy={this.props.cy}
      >
        {this.props.text}
      </button>
    );
  }
}
