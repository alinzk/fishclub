import { forEach } from "lodash";
import { MAX_PLANT_SIZE } from "../../../constants";
import { createPair, randInt, whileMax, neighbors } from "../../../helpers";
import { _fish } from "./fish";

export const _plants = {
  grow: plants => {
    forEach(plants, p => {
      if (p.health >= 0) p.health += 1;
    });
  },
  removeDead: plants => {
    forEach(plants, ({ health }, k) => {
      if (health <= 0) plants[k] = false;
    });
  },
  explode: (allFish, plants, rocks, rows, cols) => {
    const map = _fish.generateMap(allFish);
    const cpy = { ...plants };

    forEach(plants, plant => {
      if (!plant || plant.health < MAX_PLANT_SIZE) return;

      const { row, col } = plant;
      const validExLocs = [];

      neighbors(row, col, rows, cols).forEach(n => {
        const pair = createPair(n.row, n.col);
        if (!rocks[pair] && !plants[pair] && !map[pair])
          validExLocs.push({ row: n.row, col: n.col });
      });
      const plantSize = plant.health / validExLocs.length;

      plant.health = 0;

      const r = Math.random();
      forEach(validExLocs, ({ row, col }) => {
        const pair = createPair(row, col);
        cpy[`${r}${pair}`] = _plants._buildPlant(row, col, plantSize);
      });
    });

    return cpy;
  },
  _buildPlant: (row, col, health = 150) => ({
    health,
    row,
    col
  })
};

export const createPlants = (count, usedPairs, rows, cols) => {
  const defProps = {
    health: 150
  };
  const pairs = [],
    plants = {};

  rows -= 1;
  cols -= 1;

  whileMax(
    () => pairs.length < count,
    () => {
      const row = randInt(rows, 1),
        col = randInt(cols, 1),
        pair = createPair(row, col);

      if (pairs.indexOf(pair) < 0 && usedPairs.indexOf(pair) < 0) {
        plants[pair] = {
          ...defProps,
          row,
          col
        };
        pairs.push(pair);
      }
    }
  );

  return { plants, plantPairs: pairs };
};
