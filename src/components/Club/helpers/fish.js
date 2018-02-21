import { map } from 'lodash';

export const moveFish = (fish, rows, cols) => {
  const cpy = { ...fish };

  map(cpy, (_fish, k) => {
    if(_fish.col > cols || _fish.col < 0)
      _fish.direction *= -1;

    _fish.col += _fish.direction;

    if(_fish.health <= 0) {
      delete cpy[k];
    }
  });

  return cpy;
};

export const createFish = (count, usedPairs, rows, cols) => {
  rows -= 1; cols -= 1;
  const defProps = { health: 100 };
  const pairs = [],
        fish  = {};

  while(pairs.length < count) {
    const [r1, r2] = [Math.random(), Math.random()];
    const row = 1 + parseInt(rows * r1, 10),
          col = 1 + parseInt(cols * r2, 10),
          direction = (Math.ceil(r2 * 10) % 2 ? 1 : -1),
          pair = `${row},${col}`;

    if(pairs.indexOf(pair) < 0 && usedPairs.indexOf(pair) < 0) {
      fish[pair] = {
        ...defProps,
        direction,
        row,
        col
      };
      pairs.push(pair);
    }
  };

  return { fish, fishPairs: pairs };
};
