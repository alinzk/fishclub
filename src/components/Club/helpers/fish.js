import { shuffle } from 'lodash';

const DIRECTIONS = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

const rand = (max, min = 0) => (
  min + parseInt(Math.random() * max, 10)
);

export const _fish = {
  nextPos: (fish) => {
    const { row, col } = fish;
    switch(fish.direction) {
      case 'UP':    return { row: row - 1, col };
      case 'DOWN':  return { row: row + 1, col };
      case 'LEFT':  return { row, col: col - 1 };
      case 'RIGHT': return { row, col: col + 1 };
      default: { throw new Error('Invalid direction'); }
    }
  },
  move: (fish) => {
    const { row, col } = _fish.nextPos(fish);
    fish.row = row;
    fish.col = col;
  },
  eatPlant: (fish, allFish, plants) => {

  },
  turn: (fish, allFish, plants, rocks, rows, cols) => {
    rows -= 1; cols -= 1;
    const directions = shuffle(DIRECTIONS);

    for(let i = 0; i < directions.length; i++) {
      const { row, col } = _fish.nextPos(fish);
      const nextPair = `${row},${col}`;

      if(rocks[nextPair] || row <= 0 || row > rows || col <= 0 || col > cols) {
        fish.direction = directions[i];
      }
    }
  },
  shrink: (fish) => {

  },
  eatOthers: (fish, allFish) => {

  },
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
          direction = DIRECTIONS[rand(4)],
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
