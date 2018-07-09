import { map } from "lodash";
import { _fish } from "./fish";
import { _plants } from "./plants";

export * from "./fish";
export * from "./plants";
export * from "./rocks";

export const simulate = (allFish, plants, rocks, rows, cols) => {
  let fishCpy = { ...allFish },
    plantsCpy = { ...plants };

  map(fishCpy, (fish, k) => {
    if (fish.dead) return;

    _fish.turn(fish, fishCpy, plantsCpy, rocks);
    _fish.move(fish);

    _fish.eatPlant(fish, plantsCpy);
    _fish.eatOthers(fish, fishCpy);
    _fish.shrink(fish);
  });

  _plants.removeDead(plantsCpy);
  _plants.grow(plantsCpy);

  fishCpy = _fish.explode(fishCpy, plantsCpy, rocks, rows, cols);
  plantsCpy = _plants.explode(fishCpy, plantsCpy, rocks, rows, cols);

  return { fish: fishCpy, plants: plantsCpy };
};
