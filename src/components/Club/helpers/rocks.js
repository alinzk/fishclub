
export const createRocks = (count, usedPairs, rows, cols) => {
  const defProps = {};
  const pairs = [],
        rocks = {};

  // Iterate rows to apply first and last column rocks
  for(let i = 0; i < rows; i += 1) {
    const row  = i,
          col  = cols - 1,
          col2 = 0,
          p1 = `${row},${col}`,
          p2 = `${row},${col2}`;

    rocks[p1] = { ...defProps, row, col  };
    rocks[p2] = { ...defProps, row, col: col2 };

    pairs.push(p1);
    pairs.push(p2);
  }

  // Iterate columns to apply first and last row rocks
  for(let i = 0; i < cols; i += 1) {
    const col  = i,
          row  = rows - 1,
          row2 = 0,
          p1 = `${row},${col}`,
          p2 = `${row2},${col}`;

    rocks[p1] = { ...defProps, row,  col };
    rocks[p2] = { ...defProps, row: row2, col };

    pairs.push(p1);
    pairs.push(p2);
  }

  while(pairs.length < count) {
    const [r1, r2] = [Math.random(), Math.random()];
    const row = parseInt(rows * r1, 10),
          col = parseInt(cols * r2, 10),
          pair = `${row},${col}`;

    if(pairs.indexOf(pair) < 0 && usedPairs.indexOf(pair) < 0) {
      rocks[pair] = {
        ...defProps,
        row,
        col
      };
      pairs.push(pair);
    }
  };

  return { rocks, rockPairs: pairs };
};
