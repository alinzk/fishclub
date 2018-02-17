import { createFish, createAnimator } from './helpers';

const initialState = {
  animator: () => {},
  fish: {},
};

const clubReducer = (state=initialState, action, appState) => {
  const { payload, type } = action;

  switch(type) {
    case 'SET_WIDTH_HEIGHT':
      const { width, height } = payload;
      return {
        ...state,
        fish: createFish(15, width, height),
      };

    case 'SET_REFRESH_RATE':
      return {
        ...state,
        animator: createAnimator(payload, appState.width, appState.height),
      }

    case 'TICK':
      return {
        ...state,
        fish: state.animator(state.fish) || state.fish,
      };

    default:
      return state;
  }
};

export default clubReducer;
