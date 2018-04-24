import immer from "immer";
import { rat } from "./reducers";

import {
  changeActivity,
  CHANGE_ACTIVITY,
  needThresholds,
} from "./actions";

global.Math.random = jest
  .fn()
  .mockReturnValueOnce(0.01)
  .mockReturnValue(0.99);

const baseState = rat(undefined, {});

describe("changeActivity", () => {
  it("sleep", () => {
    const initialState = immer(baseState, state => {
      state.vitals.fatigue = needThresholds.fatigue + 1;
    });
    global.Math.random = jest
      .fn()
      .mockReturnValueOnce(0.01)
      .mockReturnValue(0.99);

    changeActivity(initialState)(action => {
      expect(action.type).toBe(CHANGE_ACTIVITY);
      expect(action.activity).toBe("sleeping");
    });
  });
  it("seek food", () => {
    const initialState = immer(baseState, state => {
      state.vitals.hunger = needThresholds.hunger + 1;
    });

    changeActivity(initialState)(action => {
      expect(action.type).toBe(CHANGE_ACTIVITY);
      expect(action.activity).toBe("seek food");
    });
  });
  it("seek water", () => {
    const initialState = immer(baseState, state => {
      state.vitals.fatigue = needThresholds.fatigue + 1;
    });

    changeActivity(initialState)(action => {
      expect(action.type).toBe(CHANGE_ACTIVITY);
      expect(action.activity).toBe("seek water");
    });
  });
});
