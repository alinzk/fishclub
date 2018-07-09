import { combineReducers } from 'redux';
import clubReducer from './components/Club/reducer';
import { GRID_SIZE } from './constants';

const initialState = {
  refreshRate: 300,
  width: 0,
  height: 0,
  rows: 0,
  cols: 0,
  paused: true,
};

const appReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'SET_WIDTH_HEIGHT':
      const { width, height } = action.payload;
      const [ rows, cols ] = [parseInt(height / GRID_SIZE, 10), parseInt(width / GRID_SIZE, 10)];

      return {
        ...state,
        club: clubReducer(state.club, action, { ...state, rows, cols }),
        width,
        height,
        rows,
        cols,
      };

    case 'SET_REFRESH_RATE':
      const refreshRate = action.payload;
      return {
        ...state,
        club: clubReducer(state.club, action, state),
        refreshRate,
      };

    case 'TOGGLE_PAUSE':
      return {
        ...state,
        paused: !state.paused,
      };

    default:
      return {
        ...state,
        club: clubReducer(state.club, action, state),
      };
  }
};

export default combineReducers({
  app: appReducer,
});
