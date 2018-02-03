const feed = food => ({
  type: "eat",
  hunger: food
});

const water = water => ({
  type: "water",
  thirst: water
});

const tick = () => ({ type: "tick" });

export {
  feed,
  water,
  tick
}
