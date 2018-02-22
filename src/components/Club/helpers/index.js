import { map } from 'lodash';
import { _fish } from './fish';

export * from './fish';
export * from './plants';
export * from './rocks';

export const simulate = (allFish, plants, rocks, rows, cols) => {
  const cpy = { ...allFish };

  map(cpy, (fish, k) => {
    _fish.turn(fish, cpy, plants, rocks);
    _fish.move(fish);
    // _fish.eatPlant(fish, allFish, plants);
    // _fish.eatOther(fish, allFish);
    // _fish.shrink(fish);
    // _fish.removeDead(allFish);
    // _plants.removeDead(plants);
    // _plants.grow(plants);
    // _fish.explode(allFish);
    // _plants.explode(plants);
  });

  return cpy;
};
