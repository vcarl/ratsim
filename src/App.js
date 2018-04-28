import React from "react";
import { connect } from "react-redux";
import { withState, compose } from "recompose";

import { tick as createTick } from "./world/actions";
import { World } from "./world/World";

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
    return (
      <div>
        <World
          interval={this.props.interval}
          setInterval={this.handleIntervalChange}
        />
      </div>
    );
  }
}

const WrappedApp = compose(
  connect(state => state),
  withState("interval", "setInterval", 100)
)(App);

export { WrappedApp as App };
