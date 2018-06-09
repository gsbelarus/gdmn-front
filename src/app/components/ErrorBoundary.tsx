import React, { Fragment, ErrorInfo, ReactChild, SFC } from 'react';

interface IErrorBoundaryProps {
  children?: ReactChild | ReactChild[];
  onError?: (error: Error, info: ErrorInfo) => void;
  renderComponent?: any; // TODO ReactType
}

interface IErrorBoundaryState {
  error: Error | null;
  info: ErrorInfo | null;
}

interface IDefaultErrorBoundaryComponentProps {
  error: Error;
  stack: string;
}

// TODO test error state
class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  private static renderDefaultErrorBoundary: SFC<IDefaultErrorBoundaryComponentProps> = ({ error, stack }) => (
    <Fragment>
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
    </Fragment>
  );

  public static defaultProps = {
    renderComponent: ErrorBoundary.renderDefaultErrorBoundary
  };

  public state: IErrorBoundaryState = {
    error: null,
    info: null
  };

  public componentDidCatch(error: Error, info: ErrorInfo) {
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
      <Fragment>{children}</Fragment>
    );
  }
}

export { ErrorBoundary, IErrorBoundaryProps, IErrorBoundaryState };
