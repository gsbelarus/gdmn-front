import * as React from 'react';

type DeaultErrorBoundaryComponentProps = {
  error: Error;
  stack: string;
};

// TODO isDevMode
const DeaultErrorBoundaryComponent = ({ error, stack }: DeaultErrorBoundaryComponentProps) => (
  <h1>
    Something went wrong!
    <br />
    <br />
    ERORR
    <br />
    {error.toString()}
    <br />
    <br />
    LOCATION
    <br />
    {stack}
  </h1>
);

type ErrorBoundaryProps = {
  children?: any;
  renderComponent?: any; // FIXME React.Component<any, any>
  onError?: (error: Error, info: React.ErrorInfo) => void;
};

type ErrorBoundaryState = {
  error: Error | null;
  info: React.ErrorInfo | null;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static defaultProps = {
    renderComponent: DeaultErrorBoundaryComponent
  };

  state: ErrorBoundaryState = {
    error: null,
    info: null
  };

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    const { onError } = this.props;

    if (onError) {
      try {
        onError(error, info);
      } catch (err) {
        /**/
      }
    }

    this.setState({ error, info });
  }

  render() {
    const { children, renderComponent: Component } = this.props;
    const { error, info } = this.state;

    return error ? <Component error={error} stack={info ? info.componentStack : ''} /> : children;
  }
}
