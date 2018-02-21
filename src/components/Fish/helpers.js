import { GRID_SIZE } from '../../constants';
import { animationDuration, calcScale } from '../../helpers';

const toKonvaProps = ({ direction, row, col, health }) => {
  const scale  = calcScale(health),
        scaleX = direction > 0 ? 1 : -1,
        x      = direction > 0 ? 0 : GRID_SIZE;
  return {
    contProps: {
      x:      GRID_SIZE * col,
      y:      GRID_SIZE * row,
      width:  GRID_SIZE,
      height: GRID_SIZE,
    },
    imgProps: {
      x,
      width:  GRID_SIZE * scale,
      height: GRID_SIZE * scale,
      scaleX,
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
