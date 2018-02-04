import reduceReducers from "../reduceReducers";
import immer from "immer";

const initialRatState = {
  vitals: {
    hunger: 0,
    thirst: 0,
    fatigue: 0
  },
  feelings: {
    frustration: 0,
    pain: 0
  },
  stats: {
    weight: 0,
    circadian: 0,
    age: 0
  },
  activity: "sleeping"
};

const tickReducer = (state, action) => {
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
        stats.circadian = (stats.circadian + 1) % 240;
        stats.age = stats.circadian === 1 ? stats.age + 1 : stats.age;
        stats.pain = stats.pain;
      });
    case "new activity":
      return immer(state, newState => {
        newState.activity = action.activity;
      });
    default:
      return state;
  }
};

const weightReducer = state => {
  const { vitals: { hunger }, stats: { weight } } = state;
  if (hunger < 0) return weight + 0.1;

  return weight;
};

const behaviorsReducer = (state = initialRatState, action) => {
  switch (action.type) {
    case "eat":
      return immer(state, ({ vitals }) => (vitals.hunger -= action.hunger));
    case "water":
      return immer(state, ({ vitals }) => (vitals.thirst -= action.thirst));
    default:
      return state;
  }
};

const rat = reduceReducers(tickReducer, behaviorsReducer);

export { rat };
