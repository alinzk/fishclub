import { GRID_SIZE } from '../../constants';
import { animationDuration, calcScale } from '../../helpers';

const calcRotation = (direction, width, height) => {
  const [x, y] = [width/2, height/2];
  switch(direction) {
    case 'UP':    return { rotation:  -90, offsetX: x, offsetY: y, scaleX:  1, x, y };
    case 'DOWN':  return { rotation:  +90, offsetX: x, offsetY: y, scaleX:  1, x, y, };
    case 'LEFT':  return { rotation:   0,  offsetX: x, offsetY: y, scaleX: -1, x, y,  };
    case 'RIGHT': return { rotation:   0,  offsetX: 0, offsetY: 0, scaleX:  1, x: 0, y: 0 };
    default: throw new Error('Invalid direction');
  }
};

const toKonvaProps = ({ direction, row, col, health }) => {
  const scale    = calcScale(health),
        width    = GRID_SIZE * scale,
        height   = GRID_SIZE * scale,
        rotation = calcRotation(direction, width, height);
  return {
    contProps: {
      x:      GRID_SIZE * col,
      y:      GRID_SIZE * row,
      width:  GRID_SIZE,
      height: GRID_SIZE,
    },
    imgProps: {
      width,
      height,
      ...rotation,
    }
  };
};

export const toInitialKonvaProps = (props) => toKonvaProps(props);

export const toTweenKonvaProps = ({ refreshRate, ...rest }) => {
  const { contProps, imgProps } = toKonvaProps(rest);
  const duration = animationDuration(refreshRate);
  return {
    contProps: {
      ...contProps,
      duration,
    },
    imgProps: {
      ...imgProps,
      duration,
    }
  };
};
