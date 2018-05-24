import * as React from 'react';

export interface EdgeProps {
  points: Array<{ x: number; y: number }>;
}

export class Edge extends React.Component<EdgeProps, {}> {
  public render() {
    const { points } = this.props;
    const d = points.reduce((prev, p, idx) => prev + (idx ? 'L ' : 'M ') + p.x + ' ' + p.y + ' ', '');
    return <path d={d} markerEnd="url(#arrow)" />;
  }
}
