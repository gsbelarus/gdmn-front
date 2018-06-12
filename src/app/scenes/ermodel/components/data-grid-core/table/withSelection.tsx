import React, { Component, ComponentType, MouseEvent } from 'react';
import { compose, defaultProps, hoistStatics, setDisplayName, setStatic, wrapDisplayName } from 'recompose';

import { Subtract } from '@src/app/utils';

interface IWithSelectionProps {
  selectable: boolean;
  onSelectionToggle: () => void;
}

interface IInjectedSelectionProps {
  // selected?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>)=>void;
}

function withSelection<P extends IInjectedSelectionProps>(WrappedComponent: ComponentType<P>) {

  class WithSelection extends Component<Subtract<P, IInjectedSelectionProps> & IWithSelectionProps, any> {

    public render(): JSX.Element {
      const { selectable, onSelectionToggle, ...componentProps } = this.props as IWithSelectionProps;

      return (
        <WrappedComponent {...componentProps} onClick={selectable ? onSelectionToggle : ()=>null} />
      );
    }
  }

  const enhanced = compose(
    setDisplayName(wrapDisplayName(WrappedComponent, 'withSelection')),
    setStatic('WrappedComponent', WrappedComponent),
    defaultProps({ selectable: true })
  )(WithSelection as any);

  return enhanced;// (FIXME IN selectorselection) // hoistStatics(enhanced as any)(WrappedComponent); // FIXME compose types
}

export { withSelection, IWithSelectionProps, IInjectedSelectionProps };
