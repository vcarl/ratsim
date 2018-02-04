import React from "react";
import { connect } from "react-redux";
import { withState, compose } from "recompose";

import { DebugFeed, DebugWater } from './debug/debugActions'

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
        <DebugFeed dispatch={dispatch} />
        <DebugWater dispatch={dispatch} />
        <pre>{JSON.stringify(redux, null, 2)}</pre>
      </div>
    );
  }
}

const WrappedWorld = compose(
  connect(state => ({redux: state}))
)(World);

export { WrappedWorld as World };
