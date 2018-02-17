import { combineReducers } from 'redux';
import clubReducer from './components/Club/reducer';

const initialState = {
  refreshRate: 200,
  width: 400,
  height: 300,
};

const appReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'SET_WIDTH_HEIGHT':
      const { width, height } = action.payload;
      return {
        ...state,
        club: clubReducer(state.club, action, state),
        width,
        height,
      };

    case 'SET_REFRESH_RATE':
      const refreshRate = action.payload;
      return {
        ...state,
        club: clubReducer(state.club, action, state),
        refreshRate,
      }

    default:
      return {
        ...state,
        club: clubReducer(state.club, action, state),
      }
  }
};

export default combineReducers({
  app: appReducer,
});
