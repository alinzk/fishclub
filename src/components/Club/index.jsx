import React from 'react';
import { connect } from 'react-redux';
import { Layer, Group } from 'react-konva';
import { map } from 'lodash';

import Fish from '../Fish';

const Club = ({ fish }) => (
  <Layer>
    <Group>
    {
      map(fish, (v, k) => <Fish {...v} key={k} />)
    }
    </Group>
  </Layer>
);

export default connect(({ app: { club: { fish } }}) => ({
  fish
}))(Club);
