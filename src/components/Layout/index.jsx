import React from 'react';
import { connect } from 'react-redux';
import { Stage } from 'react-konva';

import Background from '../Background';
import Club from '../Club';
import Header from '../Header';

import './styles.css';

const Layout = ({ width, height }) => (
  <div>
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
