import React from "react";
import { connect } from "react-redux";
import { withState, compose } from "recompose";

import { feed, water } from "./actions";

class World extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <input
          type="number"
          value={this.props.interval}
          onChange={({ target }) =>
            this.props.setInterval(Number(target.value))
          }
        />
        <pre>{JSON.stringify(this.props.rat, null, 2)}</pre>
        <input
          type="number"
          value={this.props.food}
          onChange={({ target }) => this.props.setFood(Number(target.value))}
        />
        <button onClick={() => dispatch(feed(this.props.food))}>feed</button>
        <input
          type="number"
          value={this.props.water}
          onChange={({ target }) => this.props.setWater(Number(target.value))}
        />
        <button onClick={() => dispatch(water(this.props.water))}>water</button>
      </div>
    );
  }
}

const WrappedWorld = compose(
  connect(state => state),
  withState("food", "setFood", 3),
  withState("water", "setWater", 3)
)(World);

export { WrappedWorld as World };
