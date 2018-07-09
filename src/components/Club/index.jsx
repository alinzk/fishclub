import React from "react";
import { connect } from "react-redux";
import { Layer, Group } from "react-konva";
import { map } from "lodash";

import Fish from "../Fish";
import Plant from "../Plant";
import Rock from "../Rock";

const renderLayer = (collection, key, Comp) => (
  <Layer key={key}>
    <Group>{map(collection, (v, k) => v && <Comp {...v} key={k} />)}</Group>
  </Layer>
);

const Club = ({ fish, plants, rocks }) => [
  renderLayer(plants, 1, Plant),
  renderLayer(rocks, 2, Rock),
  renderLayer(fish, 3, Fish)
];

export default connect(({ app: { club: { fish, plants, rocks } } }) => ({
  fish,
  plants,
  rocks
}))(Club);
