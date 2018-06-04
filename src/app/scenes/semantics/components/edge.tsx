import React from 'react';

interface IEdgeProps {
  points: Array<{ x: number; y: number }>;
}

class Edge extends React.Component<IEdgeProps, {}> {
  public render() {
    const { points } = this.props;
    const d = points.reduce((prev, p, idx) => prev + (idx ? 'L ' : 'M ') + p.x + ' ' + p.y + ' ', '');
    return <path d={d} markerEnd="url(#arrow)" />;
  }
}

export { Edge, IEdgeProps };
