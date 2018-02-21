import { GRID_SIZE } from '../../constants';
import { animationDuration, calcScale } from '../../helpers';

const toKonvaProps = ({ row, col, health }) => {
  const scale = calcScale(health);
  return {
    x:      GRID_SIZE * col,
    y:      GRID_SIZE * row,
    width:  GRID_SIZE * scale,
    height: GRID_SIZE * scale,
  }
};

export const toInitialKonvaProps = (props) => toKonvaProps(props);

export const toTweenKonvaProps = ({ refreshRate, ...rest }) => {
  const props = toKonvaProps(rest);
  return {
    ...props,
    duration: animationDuration(refreshRate),
  };
};
