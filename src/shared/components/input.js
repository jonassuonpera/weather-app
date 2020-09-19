import React, { Component } from "react";

export default class Input extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <input
        type="text"
        className="form-control"
        id={this.props.id}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            this.props.onEnter();
          }
        }}
        data-cy={this.props.cy}
      />
    );
  }
}
