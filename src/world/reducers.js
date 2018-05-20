export const materials = {
  WATER: "water",
  FOOD: "food",
};

const initialState = {
  map: {
    width: 10,
    length: 10,
    height: 1,
  },
  items: {
    waterBottle: {
      capacity: 100,
      provides: materials.WATER,
      location: { x: 0, y: 0 },
    },
    foodBowl: {
      capacity: 100,
      provides: materials.FOOD,
      location: { x: 9, y: 0 },
    },
  },
};

export const world = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
