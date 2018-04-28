import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { Rat } from "../rat/Rat";

import { DebugFeed, DebugWater } from "./debug/debugActions";

class World extends React.Component {
  render() {
    const { dispatch, interval, setInterval } = this.props;

    return (
      <div>
        <input
          type="number"
          value={interval}
          onChange={({ target }) => setInterval(Number(target.value))}
        />
        <DebugFeed dispatch={dispatch} />
        <DebugWater dispatch={dispatch} />
        <Rat />
      </div>
    );
  }
}

const WrappedWorld = compose(connect(state => ({ redux: state })))(
  World
);

export { WrappedWorld as World };
