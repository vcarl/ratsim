import React from "react";
import { connect } from "react-redux";
import { withState, compose } from "recompose";

const startedWandering = (activity, nextActivity) =>
  nextActivity === "wander" && activity !== nextActivity;

const stillWandering = (wanderStartTime, currentCircadian) => {
  if (currentCircadian < wanderStartTime) {
    // If the circadian looped back, un-loop it.
    currentCircadian += 240;
  }
  return currentCircadian - wanderStartTime > 21;
};

const doneTravelling = (currentCircadian, startCircadian, travelTime) =>
  currentCircadian - startCircadian === travelTime;

const move = (set, startTime) =>
  set({
    x: pickBoundedRandom(10),
    y: pickBoundedRandom(10),
    startTime
  });
const pickBoundedRandom = bound => Math.floor(Math.random() * bound);

class Rat extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {
      setPosition,
      setTarget,
      target,
      rat: { activity, stats }
    } = this.props;
    const { rat: { activity: nextActivity } } = nextProps;

    if (nextActivity !== "wander") return;
    if (startedWandering(activity, nextActivity)) {
      move(setTarget, stats.circadian);
    } else if (stillWandering(target.startTime, stats.circadian)) {
      setPosition({
        x: target.x,
        y: target.y
      });
      move(setTarget, stats.circadian);
    } else if (doneTravelling(stats.circadian, target.startTime, 15)) {
      setPosition({
        x: target.x,
        y: target.y
      });
    }
  }
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}

const WrappedRat = compose(
  connect(state => ({ rat: state.rat })),
  withState("position", "setPosition", { x: 0, y: 0 }),
  withState("target", "setTarget", {
    x: null,
    y: null,
    startTime: null
  })
)(Rat);

export { WrappedRat as Rat };
