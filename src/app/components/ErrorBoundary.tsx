import React, { ReactChild, ReactType } from 'react';

interface IErrorBoundaryProps {
  children?: ReactChild | ReactChild[];
  onError?: (error: Error, info: React.ErrorInfo) => void;
  renderComponent?: any; // TODO ReactType
}

interface IErrorBoundaryState {
  error: Error | null;
  info: React.ErrorInfo | null;
}

interface IDefaultErrorBoundaryComponentProps {
  error: Error;
  stack: string;
}

// TODO test error state
class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  private static renderDefaultErrorBoundary: React.SFC<IDefaultErrorBoundaryComponentProps> = ({ error, stack }) => (
    <React.Fragment>
      <h1>Something went wrong!</h1>
      <br />
      <br />
      <h2>
        ERORR
        <br />
        {error.toString()}
        <br />
        <br />
        LOCATION
        <br />
        {stack}
      </h2>
    </React.Fragment>
  );

  public static defaultProps = {
    renderComponent: ErrorBoundary.renderDefaultErrorBoundary
  };

  public state: IErrorBoundaryState = {
    error: null,
    info: null
  };

  public componentDidCatch(error: Error, info: React.ErrorInfo) {
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

  public render(): JSX.Element {
    const { children, renderComponent: Component } = this.props;
    const { error, info } = this.state;

    return error ? (
      <Component error={error} stack={info ? info.componentStack : ''} />
    ) : (
      <React.Fragment>{children}</React.Fragment>
    );
  }
}

export { ErrorBoundary, IErrorBoundaryProps, IErrorBoundaryState, IDefaultErrorBoundaryComponentProps };
