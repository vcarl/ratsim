import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

class World extends React.Component {
  render() {
    const { world, dispatch, interval, setInterval } = this.props;

    return <pre>{JSON.stringify(world, null, 2)}</pre>;
  }
}

const WrappedWorld = compose(
  connect(state => ({ world: state.world }))
)(World);

export { WrappedWorld as World };
