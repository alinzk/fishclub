export const animationDuration = refreshRate => (refreshRate * 1.1) / 1000;

export const neighbors = (row, col, rows, cols) => {
  return [
    { row, col: col + 1 },
    { row, col: col - 1 },
    { row: row + 1, col },
    { row: row - 1, col },
    { row: row + 1, col: col + 1 },
    { row: row + 1, col: col - 1 },
    { row: row - 1, col: col + 1 },
    { row: row - 1, col: col - 1 }
  ].filter(n => n.row > 1 && n.row < rows && n.col > 0 && n.col < cols);
};

export const calcScale = health => {
  if (health <= 0) {
    return 0.00000001;
  } else {
    const scale = 0.7 + (0.3 / 1000) * health;
    return Math.min(scale, 1);
  }
};

export const whileMax = (condFn, fn, maxItrs = 5000) => {
  let i = 0;
  while (condFn() && i < maxItrs) {
    fn();
    i += 1;
  }

  if (i >= maxItrs) {
    throw new Error("Max iterations reached!");
  }
};

export const createPair = (row, col) => `${row},${col}`;
export const randInt = (max, min = 0) =>
  min + parseInt(Math.random() * max, 10);
