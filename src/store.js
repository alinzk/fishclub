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
