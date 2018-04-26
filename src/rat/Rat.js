import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

class Rat extends React.Component {
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}

const WrappedRat = compose(connect(state => ({ rat: state.rat })))(
  Rat
);

export { WrappedRat as Rat };
