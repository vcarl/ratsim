import React from "react";
import { connect } from "react-redux";
import { withState, compose } from "recompose";

import { feed, water } from "./actions";

class World extends React.Component {
  render() {
    const {
      redux,
      dispatch,
      setFood,
      food,
      setWater,
      waterAmount,
      interval,
      setInterval
    } = this.props;

    return (
      <div>
        <input
          type="number"
          value={interval}
          onChange={({ target }) => setInterval(Number(target.value))}
        />
        <pre>{JSON.stringify(redux, null, 2)}</pre>
        <input
          type="number"
          value={food}
          onChange={({ target }) => setFood(Number(target.value))}
        />
        <button onClick={() => dispatch(feed(food))}>feed</button>
        <input
          type="number"
          value={waterAmount}
          onChange={({ target }) => setWater(Number(target.value))}
        />
        <button onClick={() => dispatch(water(waterAmount))}>water</button>
      </div>
    );
  }
}

const WrappedWorld = compose(
  connect(state => ({redux: state})),
  withState("food", "setFood", 3),
  withState("waterAmount", "setWater", 3)
)(World);

export { WrappedWorld as World };
