import React from "react";
import { connect } from "react-redux";
import { withState, compose } from "recompose";

import { tick } from "./world/actions";
import { World } from "./world/World";

class App extends React.Component {
  componentDidMount() {
    const { interval } = this.props;
    this.tickEvery(interval);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.interval !== nextProps.interval) {
      const { interval } = nextProps;
      clearInterval(this.interval);
      this.tickEvery(interval);
    }
  }
  tickEvery(ms) {
    const { dispatch } = this.props;
    clearInterval(this.interval);
    this.interval = setInterval(() => dispatch(tick()), ms);
  }
  stopInterval = () => {
    clearInterval(this.interval);
  };
  render() {
    return (
      <div>
        <World
          interval={this.props.interval}
          setInterval={this.props.setInterval}
          stopInterval={this.stopInterval}
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
