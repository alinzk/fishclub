import { createStore } from 'redux'
import reducer from './reducer';

const store = createStore(reducer);

const ticker = () => {
  if(!document.hidden)
    store.dispatch({
      type: 'TICK'
    });

  requestAnimationFrame(ticker);
};

const init = () => {
  const headerHeight = 100;
  store.dispatch({
    type: 'SET_WIDTH_HEIGHT',
    payload: {
      width: window.innerWidth - 50,
      height: window.innerHeight - headerHeight,
    }
  });
};

window.addEventListener('resize', init);
window.addEventListener('load', () => {
  init();
  requestAnimationFrame(ticker);
});

export default store;
