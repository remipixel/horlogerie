import React from 'react';

export default function randomNumber() {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { random: 0 };
  }

  handleClick() {
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);
    this.setState({ random: this.state.random + rand });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>Click</button>
        <div>The number is: {this.state.random}</div>
      </div>
    );
  }
}