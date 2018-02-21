import { createStore } from 'redux'
import reducer from './reducer';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

let lastTime = Date.now();
const ticker = () => {
  const now = Date.now();
  const { app: { refreshRate, paused } } = store.getState();

  if(!document.hidden && !paused && (now - lastTime) >= refreshRate) {
    store.dispatch({
      type: 'TICK'
    });
    lastTime = now;
  };

  requestAnimationFrame(ticker);
};

const init = () => {
  const headerHeight = document.getElementById('header').offsetHeight;
  const body = document.getElementsByTagName('body')[0];

  store.dispatch({
    type: 'SET_WIDTH_HEIGHT',
    payload: {
      width: body.offsetWidth,
      height: body.offsetHeight - headerHeight,
    }
  });
};

window.addEventListener('resize', init);
window.addEventListener('load', () => {
  init();
  requestAnimationFrame(ticker);
});

export default store;
