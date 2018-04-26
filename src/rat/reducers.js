import reduceReducers from "../reduceReducers";
import immer from "immer";

const initialRatState = {
  movement: {
    speed: 15,
    position: {
      x: 0,
      y: 0,
    },
    target: {
      x: undefined,
      y: undefined,
      startTime: undefined,
    },
  },
  vitals: {
    hunger: 0,
    thirst: 0,
    fatigue: 0,
  },
  stats: {
    weight: 0,
    circadian: 0,
    age: 0,
  },
  activity: "sleeping",
};

const TICKS_PER_DAY = 240;

const ratReducer = (state = initialRatState, action) => {
  switch (action.type) {
    case "tick":
      if (state.activity === "dead") {
        return state;
      }
      return immer(state, newState => {
        const { vitals, stats } = newState;
        vitals.hunger += 1;
        vitals.thirst += 1;
        vitals.fatigue =
          newState.activity === "sleeping"
            ? vitals.fatigue - 1
            : vitals.fatigue + 1;
        stats.weight = weightReducer(newState);
        stats.circadian = (stats.circadian + 1) % TICKS_PER_DAY;
        stats.age = stats.circadian === 1 ? stats.age + 1 : stats.age;

        if (
          doneTravelling(
            newState.stats.circadian,
            newState.movement.target.startTime,
            newState.movement.speed
          )
        ) {
          newState.activity = "idle";
          newState.movement.position.x = newState.movement.target.x;
          newState.movement.position.y = newState.movement.target.y;
          newState.movement.target = initialRatState.movement.target;
        }
      });
    case "eat":
      return immer(state, ({ vitals }) => {
        vitals.hunger -= action.hunger;
      });
    case "water":
      return immer(state, ({ vitals }) => {
        vitals.thirst -= action.thirst;
      });
    case "new activity":
      return immer(state, newState => {
        if (startedWandering(newState.activity, action.activity)) {
          newState.movement.target = {
            x: action.target.x,
            y: action.target.y,
            startTime: newState.stats.circadian,
          };
        }
        newState.activity = action.activity;
      });
    default:
      return state;
  }
};

const startedWandering = (activity, nextActivity) =>
  nextActivity === "wander" && activity !== nextActivity;

const doneTravelling = (
  currentCircadian,
  startCircadian,
  travelTime
) => {
  if (currentCircadian < startCircadian) {
    // If the circadian looped back, un-loop it.
    currentCircadian += TICKS_PER_DAY;
  }
  return currentCircadian - startCircadian === travelTime;
};

const weightReducer = state => {
  const {
    vitals: { hunger },
    stats: { weight },
  } = state;
  if (hunger < 0) return weight + 0.1;

  return weight;
};

const rat = ratReducer;

export { rat };
