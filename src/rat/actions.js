const types = {
  CHANGE_ACTIVITY: "new activity",
};

const changeActivity = rat => dispatch => {
  if (shouldChangeActivities(5)) {
    const { activity, ...payload } = findNewActivity(rat);
    dispatch({
      type: types.CHANGE_ACTIVITY,
      activity,
      ...payload,
    });
  }
};

const shouldChangeActivities = percentage =>
  Math.ceil(Math.random() * 100) <= percentage;

const findNewActivity = rat => {
  if (isDead(rat)) {
    return { activity: "dead" };
  }

  const needs = checkNeeds(rat);

  if (hasNeeds(needs)) {
    let need = getRandomNeed(needs);
    return { activity: mapNeedToActivity(need) };
  }
  return {
    activity: "wander",
    target: {
      x: pickBoundedRandom(10),
      y: pickBoundedRandom(10),
    },
  };
};

const isDead = rat => {
  const {
    vitals: { hunger, thirst },
  } = rat;
  if (hunger >= 1000 || thirst >= 1000) {
    return true;
  }
  if (hunger <= -1000 || thirst <= -1000) {
    return true;
  }
  return false;
};

const checkNeeds = rat => {
  const { vitals } = rat;
  let needs = [];

  if (needsSleep(vitals.fatigue)) {
    needs.push("sleep");
  }
  if (needsWater(vitals.thirst)) {
    needs.push("water");
  }
  if (needsFood(vitals.hunger)) {
    needs.push("food");
  }
  return needs;
};

export const needThresholds = {
  thirst: 600,
  hunger: 600,
  fatigue: 300,
};

const needsWater = thirst => thirst > needThresholds.thirst;
const needsFood = hunger => hunger > needThresholds.hunger;
const needsSleep = fatigue => fatigue > needThresholds.fatigue;

const hasNeeds = needs => needs.length > 0;

const getRandomNeed = needs => {
  if (needs.length === 1) {
    return needs[0];
  }
  const index = pickBoundedRandom(needs.length);
  return index < needs.length ? needs[index] : "none";
};

const mapNeedToActivity = need => {
  switch (need) {
    case "sleep":
      return "sleeping";
    case "water":
      return "seek water";
    case "food":
      return "seek food";
    default:
      return "idle";
  }
};

const pickBoundedRandom = bound => Math.floor(Math.random() * bound);

export { changeActivity, types };
