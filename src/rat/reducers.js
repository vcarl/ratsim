import reduceReducers from "../reduceReducers";

const initialRatState = {
  hunger: 0,
  thirst: 0,
  fatigue: 0,
  frustration: 0,
  pain: 0,
  weight: 0,
  circadian: 0,
  age: 0,
  activity: "sleeping"
};

const tickReducer = (state, action) => {
  switch (action.type) {
    case "tick":
      if (state.activity === "dead") {
        return state;
      }
      return {
        ...state,
        hunger: state.hunger + 1,
        thirst: state.thirst + 1,
        fatigue: state.fatigue + 1,
        frustration: state.frustration + 1,
        weight: weightReducer(state),
        circadian: (state.circadian + 1) % 240,
        age: state.circadian === 1 ? state.age + 1 : state.age,
        pain: state.pain,
        activity: activityReducer(state)
      };
    default:
      return state;
  }
};

const activityReducer = state => {
  const { hunger, thirst } = state;

  if (hunger > 1000 || thirst > 1000) return "dead";
  else return "sleeping";
};

const weightReducer = state => {
  const { hunger, weight } = state;
  if (hunger < 0) return weight + 0.1;

  return weight;
};

const behaviorsReducer = (state = initialRatState, action) => {
  switch (action.type) {
    case "eat":
      return {
        ...state,
        hunger: state.hunger - action.hunger
      };
    case "water":
      return {
        ...state,
        thirst: state.thirst - action.thirst
      };
    default:
      return state;
  }
};

const rat = reduceReducers(tickReducer, behaviorsReducer);

export { rat };
