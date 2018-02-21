import React from 'react';
import { connect } from 'react-redux';

import './styles.css';

const Header = ({ onRrChange, refreshRate, onTogglePause }) => (
  <div id="header">
    <h1 className="fancy"><span>FISH CLUB</span></h1>
    <br />
    <label>
      Simulation Delay
      <input
        type="range"
        min={50}
        max={500}
        step="25"
        value={refreshRate}
        onChange={(e) => onRrChange(e.target.value)}
      />
      {" "}
      ({refreshRate}ms)
    </label>
    {" "}
    <button onClick={onTogglePause}>
      {"Start/Pause"}
    </button>
    <br />
    <br />
  </div>
);

const connected = connect(({ app: { refreshRate }}) => ({
  refreshRate
}), (dispatch) => ({
  onRrChange: (payload) => {
    dispatch({ type: 'SET_REFRESH_RATE', payload })
  },
  onTogglePause: (payload) => {
    dispatch({ type: 'TOGGLE_PAUSE', payload })
  },
}));

export default connected(Header);
