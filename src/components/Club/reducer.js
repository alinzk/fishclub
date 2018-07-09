import {
  createFish,
  simulate,
  createPlants,
  createRocks
} from "./helpers/index";

const initialState = {
  fish: {}
};

const clubReducer = (state = initialState, action, appState) => {
  const { type } = action;
  const { rows, cols } = appState;

  switch (type) {
    case "SET_WIDTH_HEIGHT":
      const area = rows * cols,
        rocksC = parseInt(area * 0.209, 10),
        plantsC = parseInt(area * 0.042, 10),
        fishC = parseInt(area * 0.034, 10);

      const { rocks, rockPairs } = createRocks(rocksC, [], rows, cols);
      const { plants, plantPairs } = createPlants(
        plantsC,
        rockPairs,
        rows,
        cols
      );
      const { fish } = createFish(
        fishC,
        rockPairs.concat(plantPairs),
        rows,
        cols
      );

      return {
        ...state,
        fish,
        plants,
        rocks,
        rockPairs,
        plantPairs
      };

    case "TICK":
      const res = simulate(state.fish, state.plants, state.rocks, rows, cols);
      return {
        ...state,
        ...res
      };

    default:
      return state;
  }
};

export default clubReducer;
