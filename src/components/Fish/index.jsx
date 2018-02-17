import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as konva from 'react-konva';

const fishSvgData = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDIwNC41MzIgMjA0LjUzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjA0LjUzMiAyMDQuNTMyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBkPSJNMTk5LjU0OCw4Ny42OTRjMi4yMjktMC43OTQsMy45NTMtMi41OTMsNC42NS00Ljg1NGMwLjY5Ny0yLjI2MSwwLjI4Ny00LjcxOS0xLjEwOC02LjYzDQoJYy0xMi43OTctMTcuNTQ0LTM3LjU1OC0yOC40NDMtNjQuNjE5LTI4LjQ0M2MtMTkuMTY4LDAtMzcuMjgxLDUuMzgzLTUxLDE1LjE1OEM3OS40NzYsNjguNjIsNzMuNDc1LDc1LjQzMSw2OS42OSw4Mi45MTcNCglDNTkuNTYyLDY2LjQ3MywzNi43NTIsNTQuMzQ1LDguMTc1LDUxLjc2NWMtMy41NTMtMC4zMTktNi44MjUsMS44OTUtNy44NTQsNS4zMDFjLTEuMDI5LDMuNDA3LDAuNDc4LDcuMDY3LDMuNjA2LDguNzYzDQoJYzE0LjY2MSw3Ljk0NCwyMy40MTQsMjEuNTY2LDIzLjQxNCwzNi40MzdjMCwxNC44NzEtOC43NTMsMjguNDkzLTIzLjQxNCwzNi40MzdjLTMuMTI5LDEuNjk2LTQuNjM1LDUuMzU2LTMuNjA2LDguNzYzDQoJYzAuOTYzLDMuMTg4LDMuODk3LDUuMzMyLDcuMTc1LDUuMzMyYzAuMjI1LDAsMC40NTEtMC4wMSwwLjY3OS0wLjAzMWMyOC41NzctMi41NzksNTEuMzg2LTE0LjcwOCw2MS41MTUtMzEuMTUyDQoJYzMuNzg0LDcuNDg2LDkuNzg2LDE0LjI5NywxNy43ODEsMTkuOTkzYzEzLjcyLDkuNzc0LDMxLjgzMiwxNS4xNTgsNTEsMTUuMTU4YzI1LjcxNywwLDQ5LjA5LTkuNjI2LDYyLjUyMy0yNS43NQ0KCWMxLjUyNi0xLjgzMiwyLjA5LTQuMjgsMS41Mi02LjU5NXMtMi4yMDgtNC4yMjEtNC40MS01LjEzNGMtNy45MTUtMy4yODEtMTIuODMyLTkuMjI5LTEyLjgzMi0xNS41MjENCglDMTg1LjI3Myw5Ny4wOTIsMTkwLjg3Niw5MC43ODMsMTk5LjU0OCw4Ny42OTR6IE0xNTYuNTY3LDkyLjMwMmMtNy4zMzQsMC0xMy4zMDEtNS45NjctMTMuMzAxLTEzLjMwMQ0KCWMwLTcuMzM0LDUuOTY3LTEzLjMwMSwxMy4zMDEtMTMuMzAxUzE2OS44NjgsNzEuNjY2LDE2OS44NjgsNzlDMTY5Ljg2OCw4Ni4zMzUsMTYzLjkwMSw5Mi4zMDIsMTU2LjU2Nyw5Mi4zMDJ6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==';
const img = new Image();
img.src = fishSvgData;

class Fish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialProps: { ...props },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { refreshRate, direction, ...rest } = nextProps;

    this.refs.image.to({
      ...rest,
      scaleX: nextProps.direction,
      duration: (refreshRate * 2 / 1000),
    });
  }

  render() {
    const { x, y, rotation, offsetX, offsetY, direction, width, height } = this.state.initialProps;
    return (
      <konva.Group>
        <konva.Image
          ref="image"
          width={width}
          height={height}
          scaleX={direction}
          x={x}
          y={y}
          image={img}
          offset= {{ x: offsetX, y: offsetY }}
        />
      </konva.Group>
    );
  }
};

export default connect(({ app: { refreshRate }}) => ({
  refreshRate,
}))(Fish);


