import React, { Component } from "react";

export default class weatherListItem extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <li
        className="list-group-item"
        data-cy={`widget-${this.props.name.toLowerCase()}`}
      >
        {this.props.name}: <b>{this.props.value}</b>
      </li>
    );
  }
}
