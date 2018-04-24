import React from "react";
import { withState } from "recompose";
import { feed, water } from "../actions";

const DebugFeedComponent = ({ food, setFood, dispatch }) => (
  <div>
    <input
      type="number"
      value={food}
      onChange={({ target }) => setFood(Number(target.value))}
    />
    <button onClick={() => dispatch(feed(food))}>feed</button>
  </div>
);

const DebugWaterComponent = ({ waterAmount, setWater, dispatch }) => (
  <div>
    <input
      type="number"
      value={waterAmount}
      onChange={({ target }) => setWater(Number(target.value))}
    />
    <button onClick={() => dispatch(water(waterAmount))}>
      water
    </button>
  </div>
);

const DebugFeed = withState("food", "setFood", 10)(
  DebugFeedComponent
);
const DebugWater = withState("waterAmount", "setWater", 10)(
  DebugWaterComponent
);

export { DebugFeed, DebugWater };
