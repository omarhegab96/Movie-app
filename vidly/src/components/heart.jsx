import React, { Component } from "react";

class Heart extends Component {
  state = {
    isWhite: true,
  };

  handleColorChange = () => {
    this.setState({ ...this.state, isWhite: !this.state.isWhite });
  };

  render() {
    return (
      <>
        <i
          onClick={this.handleColorChange}
          className={ `fa ${this.state.isWhite ? "fa-heart-o" : "fa-heart"}`}
          aria-hidden="true"
        />
      </>
    );
  }
}

export default Heart;
