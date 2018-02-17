import { map, throttle } from 'lodash';

export const moveFish = (fish, width=200) => {
  const cpy = { ...fish };

  map(cpy, (_fish, k) => {
    if(_fish.x >= width || _fish.x <= 0)
      _fish.direction *= -1;

    _fish.x += _fish.direction;
    _fish.rotation *= -1;
  });

  return cpy;
};

export const createFish = (count=10, width, height) => {
  const defProps = {
    width: 25,
    height: 25,
    offsetX: 12.5,
    offsetY: 12.5,
    rotation: 3,
    health: 1,
  };
  const fish = (new Array(count)).fill().map(() => {
    const [r1, r2] = [Math.random(), Math.random()];
    const x = parseInt(width  * r1),
          y = parseInt(height * r2),
          direction = (Math.ceil(r2 * 10) % 2 ? 1 : -1);

    return {
      ...defProps,
      direction,
      x: defProps.offsetX + x,
      y: defProps.offsetY + y,
    };
  });
  return fish;
};

export const createAnimator = (refreshRate, width, height) => {
  return throttle((fish) => {
    return moveFish(fish, width, height);
  }, refreshRate);
};
