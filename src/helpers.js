
export const animationDuration = (refreshRate) => (
  refreshRate * 1.1 / 1000
);

export const calcScale = (health) => (
  0.7 + ((0.3 / 1000) * health)
);
