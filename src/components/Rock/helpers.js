import { GRID_SIZE } from '../../constants';

export const toKonvaProps = ({ row, col }) => {
  return {
    x:      GRID_SIZE * col,
    y:      GRID_SIZE * row,
    width:  GRID_SIZE,
    height: GRID_SIZE,
  };
};
