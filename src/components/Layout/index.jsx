import React from 'react';
import { connect } from 'react-redux';
import { Stage } from 'react-konva';

import Background from '../Background';
import Club from '../Club';
import Header from '../Header';

const Layout = ({ width, height }) => (
  <div>
    <h1>Fishclub</h1>
    <Header />
    <div>
      <Stage width={width} height={height}>
        <Background />
        <Club />
      </Stage>
    </div>
  </div>
);

const mapStateToProps = ({ app: { width, height }}) => ({ width, height });

export default connect(mapStateToProps, null)(Layout);
