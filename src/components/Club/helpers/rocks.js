import { createPair, randInt, whileMax } from "../../../helpers";

export const createRocks = (count, usedPairs, rows, cols) => {
  const defProps = {};
  const pairs = [],
    rocks = {};

  // Iterate rows to apply first and last column rocks
  for (let i = 0; i < rows; i += 1) {
    const row = i,
      col = cols - 1,
      col2 = 0,
      p1 = createPair(row, col),
      p2 = createPair(row, col2);

    rocks[p1] = { ...defProps, row, col };
    rocks[p2] = { ...defProps, row, col: col2 };

    pairs.push(p1);
    pairs.push(p2);
  }

  // Iterate columns to apply first and last row rocks
  for (let i = 0; i < cols; i += 1) {
    const col = i,
      row = rows - 1,
      row2 = 0,
      p1 = createPair(row, col),
      p2 = createPair(row2, col);

    rocks[p1] = { ...defProps, row, col };
    rocks[p2] = { ...defProps, row: row2, col };

    pairs.push(p1);
    pairs.push(p2);
  }

  whileMax(
    () => pairs.length < count,
    () => {
      const row = randInt(rows, 1),
        col = randInt(cols, 1),
        pair = createPair(row, col);

      if (pairs.indexOf(pair) < 0 && usedPairs.indexOf(pair) < 0) {
        rocks[pair] = {
          ...defProps,
          row,
          col
        };
        pairs.push(pair);
      }
    }
  );

  return { rocks, rockPairs: pairs };
};
