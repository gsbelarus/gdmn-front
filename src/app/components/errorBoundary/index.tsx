import * as React from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  componentDidCatch(error: Error | null, info: object) {
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.error}</h1>;
    }
    return this.props.children;
  }
}
