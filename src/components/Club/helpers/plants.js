
export const createPlants = (count, usedPairs, rows, cols) => {
  const defProps = {
    health: 150,
  };
  const pairs  = [],
        plants = {};

  rows -= 1;
  cols -= 1;

  while(pairs.length < count) {
    const [r1, r2] = [Math.random(), Math.random()];
    const row = 1 + parseInt(rows * r1, 10),
          col = 1 + parseInt(cols * r2, 10),
          pair = `${row},${col}`;

    if(pairs.indexOf(pair) < 0 && usedPairs.indexOf(pair) < 0) {
      plants[pair] = {
        ...defProps,
        row,
        col
      };
      pairs.push(pair);
    }
  };

  return { plants, plantPairs: pairs };
};
