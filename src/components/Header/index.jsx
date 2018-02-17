import React from 'react';
import { connect } from 'react-redux';

import './styles.css';

const Header = ({ onRrChange, refreshRate }) => (
  <div id="header">
    <h1 className="fancy"><span>FISH CLUB</span></h1>
    <br />
    <label>
      Refresh rate
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
    <br />
    <br />
  </div>
);

const connected = connect(({ app: { refreshRate }}) => ({
  refreshRate
}), (dispatch) => ({
  onRrChange: (payload) => {
    dispatch({ type: 'SET_REFRESH_RATE', payload })
  }
}));

export default connected(Header);
