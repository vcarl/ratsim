const changeActivity = rat => (dispatch, getState) => {
  const rand = Math.ceil(Math.random() * 100);
  if (rand < 5) {
    dispatch({ type: "new activity", activity: findNewActivity(rat) });
  }
};

const findNewActivity = rat => {
  if (isDead(rat)) {
    return "dead";
  }

  const needs = checkNeeds(rat);

  if (hasNeeds(needs)) {
    let need = getRandomNeed(needs);
    return mapNeedToActivity(need);
  }
  return "wander";
};

const isDead = rat => {
  const { vitals: { hunger, thirst } } = rat;
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

const needsWater = thirst => thirst > 600;
const needsFood = hunger => hunger > 600;
const needsSleep = fatigue => fatigue > 300;

const hasNeeds = needs => needs.length > 0;

const getRandomNeed = needs => {
  const index = Math.floor(Math.random() * (needs.length + needs.length / 2));
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
      return "wander";
  }
};

export { changeActivity };
