import React from "react";
import { connect } from "react-redux";
import { withState, compose } from "recompose";

import { tick as createTick } from "./world/actions";
import { World } from "./world/World";
import { Rat } from "./rat/Rat";
import { DebugFeed, DebugWater } from "./world/debug/debugActions";

class App extends React.Component {
  lastTimeout = undefined;

  componentDidMount() {
    this.tick(this.props.interval);
  }

  tick = interval => {
    this.lastTimeout = setTimeout(() => {
      this.props.dispatch(createTick());
      this.tick(this.props.interval);
    }, interval);
  };

  handleIntervalChange = newInterval => {
    clearTimeout(this.lastTimeout);
    this.tick(newInterval);
    this.props.setInterval(newInterval);
  };

  render() {
    const { dispatch, setInterval, interval } = this.props;
    return (
      <div>
        <input
          type="number"
          value={interval}
          onChange={({ target }) => setInterval(Number(target.value))}
        />
        <DebugFeed dispatch={dispatch} />
        <DebugWater dispatch={dispatch} />
        <World />
        <Rat />
      </div>
    );
  }
}

const WrappedApp = compose(
  connect(),
  withState("interval", "setInterval", 100)
)(App);

export { WrappedApp as App };
