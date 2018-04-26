import immer from "immer";
import { rat } from "./reducers";

import { types } from "./actions";

const initialState = immer(rat(undefined, {}), ({ vitals }) => {
  vitals.hunger = 100;
  vitals.thirst = 100;
});

describe("rat", () => {
  it("changes activities", () => {
    const acceptableActivities = [
      { activity: "dead" },
      { activity: "sleeping" },
      { activity: "seek water" },
      { activity: "seek food" },
      { activity: "wander", target: { x: 0, y: 0 } },
    ];
    acceptableActivities.forEach(activity => {
      const newState = rat(initialState, {
        type: types.CHANGE_ACTIVITY,
        activity,
      });

      expect(newState.activity).toEqual(activity);
    });
  });
  it("eats", () => {
    const newState = rat(initialState, { type: "eat", hunger: 10 });
    expect(newState.vitals.hunger).toEqual(90);
  });
  it("drinks", () => {
    const newState = rat(initialState, { type: "water", thirst: 10 });
    expect(newState.vitals.thirst).toEqual(90);
  });
  it("ticks", () => {
    const localInitialState = immer(initialState, state => {});
    const state = rat(localInitialState, { type: "tick" });

    const { stats: originalStats } = localInitialState;
    const { stats } = state;
    expect(stats.circadian).toEqual(originalStats.circadian + 1);
    expect(stats.weight).toEqual(originalStats.weight);
    expect(stats.weight).toEqual(originalStats.weight);
  });
});
