import { shuffle, chain, reduce, forEach } from "lodash";
import { BITE_SIZE, MAX_FISH_SIZE } from "../../../constants";
import { createPair, randInt, whileMax, neighbors } from "../../../helpers";

const DIRECTIONS = ["UP", "DOWN", "LEFT", "RIGHT"];

export const _fish = {
  nextPos: fish => {
    const { row, col } = fish;
    switch (fish.direction) {
      case "UP":
        return { row: row - 1, col };
      case "DOWN":
        return { row: row + 1, col };
      case "LEFT":
        return { row, col: col - 1 };
      case "RIGHT":
        return { row, col: col + 1 };
      default: {
        throw new Error("Invalid direction");
      }
    }
  },
  turn: (fish, allFish, plants, rocks, rows, cols) => {
    rows -= 1;
    cols -= 1;
    const directions = shuffle(DIRECTIONS);

    for (let i = 0; i < directions.length; i++) {
      const { row, col } = _fish.nextPos(fish);
      const nextPair = createPair(row, col);

      if (rocks[nextPair] || row <= 0 || row > rows || col <= 0 || col > cols) {
        fish.direction = directions[i];
      }
    }
  },
  move: fish => {
    const { row, col } = _fish.nextPos(fish);
    fish.row = row;
    fish.col = col;
    fish.currentPair = createPair(row, col);

    return fish.currentPair;
  },
  eatPlant: (fish, plants) => {
    const plant = plants[fish.currentPair];

    if (plant && plant.health > 0) {
      const biteSize = Math.min(plant.health, BITE_SIZE);
      plant.health -= biteSize;
      fish.health += biteSize;
    }
  },
  eatOthers: (fish, allFish) => {
    const other = chain(allFish)
      .values()
      .find(
        ({ currentPair, id }) =>
          currentPair === fish.currentPair && fish.id !== id
      )
      .value();

    if (other && !other.dead) {
      if (fish.health >= other.health) {
        fish.health += other.health;
        other.health = 0;
        other.dead = true;
      } else {
        other.health += fish.health;
        fish.health = 0;
        fish.dead = true;
      }
    }
  },
  shrink: fish => {
    if (!fish.dead) {
      fish.size -= 2;
    }
  },
  generateMap: allFish =>
    reduce(
      allFish,
      (acc, f) => {
        if (!f.dead) acc[f.currentPair] = true;
        return acc;
      },
      {}
    ),
  explode: (allFish, plants, rocks, rows, cols) => {
    const map = _fish.generateMap(allFish);
    const cpy = { ...allFish };

    forEach(allFish, fish => {
      if (fish.health < MAX_FISH_SIZE) return;

      const { row, col } = fish;
      const validExLocs = [];

      neighbors(row, col, rows, cols).forEach(n => {
        const pair = createPair(n.row, n.col);
        if (!rocks[pair] && !plants[pair] && !map[pair])
          validExLocs.push({ row: n.row, col: n.col });
      });
      const fishSize = fish.health / validExLocs.length;

      fish.health = 0;
      fish.dead = true;

      const r = Math.random();
      forEach(validExLocs, ({ row, col }) => {
        const pair = createPair(row, col);
        cpy[`${r}${pair}`] = _fish._buildFish(pair, row, col, pair, fishSize);
      });
    });

    return cpy;
  },
  _buildFish: (id, row, col, currentPair, health = 100) => ({
    dead: false,
    direction: DIRECTIONS[randInt(4)],
    health,
    id,
    row,
    col,
    currentPair
  })
};

export const createFish = (count, usedPairs, rows, cols) => {
  rows -= 1;
  cols -= 1;

  const pairs = [],
    fish = {};

  whileMax(
    () => pairs.length < count,
    () => {
      const row = randInt(rows, 1),
        col = randInt(cols, 1),
        pair = createPair(row, col);

      if (pairs.indexOf(pair) < 0 && usedPairs.indexOf(pair) < 0) {
        fish[pairs.length] = _fish._buildFish(pair, row, col, pair);
        pairs.push(pair);
      }
    }
  );

  return { fish, fishPairs: pairs };
};
