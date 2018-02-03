import { changeActivity } from "../rat/actions";

const feed = food => ({
  type: "eat",
  hunger: food
});

const water = water => ({
  type: "water",
  thirst: water
});

const tick = () => (dispatch, getState) => {
  dispatch({ type: "tick" });
  const { rat } = getState();
  dispatch(changeActivity(rat));
};

export { feed, water, tick };
