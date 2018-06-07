import React, { forwardRef } from 'react';
import hoistStatics from 'hoist-non-react-statics';

interface IForwardRef {
  (props: any, ref: any): React.ReactElement<any>;
  displayName?: string;
}

const forwardRefSymbol = '__forwardRef__';

function getDisplayName(Component: any) {
  return Component.displayName || Component.name || 'Component';
}

function withForwardRef(Component: any, options: { displayName?: string; hoistExclude?: object }) {
  const WrappedComponent: IForwardRef = (props: any, ref: any) => (
    <Component {...{ [forwardRefSymbol]: ref, ...props }} />
  );
  WrappedComponent.displayName = options.displayName || `withForwardRef(${getDisplayName(Component)})`;

  return hoistStatics(
    forwardRef(WrappedComponent),
    Component,
    options.hoistExclude || { $$typeof: true, render: true }
  );
}

// const hasForwardRef = Component => Component.$$typeof && typeof Component.render === 'function';

export { withForwardRef, forwardRefSymbol };
