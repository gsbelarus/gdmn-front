import React, { ComponentType, PureComponent, ReactChild, ReactType } from 'react';
import classNames from 'classnames';
import { compose, setDisplayName, wrapDisplayName } from 'recompose';
import { withStyles } from '@material-ui/core';
import { StyleRulesCallback } from '@material-ui/core/styles/withStyles';

import { Subtract } from '@src/app/utils';
import { Resizer } from '@src/app/scenes/ermodel/components/data-grid-mui/Resizer';
import { IWithStyles } from '@src/app/components/withStyles';
import { ITableCellProps } from '@src/app/scenes/ermodel/components/data-grid-mui';

/**
 * HEADER CELL
 * // tableHeaderCellBefore
 */

type TWithCellResizingClassKey = 'cell' | 'resizeHandleLine' | 'cellDimmed';
const styles: StyleRulesCallback<TWithCellResizingClassKey> = theme => ({
  cell: {
    outline: 'none',
    position: 'relative',
    // overflow: 'visible',
    // paddingRight: theme.spacing.unit,
    // paddingLeft: theme.spacing.unit,
    // '&:first-child': {
    //   paddingLeft: theme.spacing.unit * 3,
    // },
    '&:hover $resizeHandleLine': {
      opacity: 1
    }
  },
  resizeHandleLine: {
    opacity: 0
  },
  '@media (pointer: fine)': {
    resizeHandleLine: {
      opacity: 0
    },
    resizeHandleActive: {
      '& $resizeHandleLine': {
        opacity: 1
      }
    },
    resizeHandle: {
      '&:hover $resizeHandleLine': {
        opacity: 1
      }
    }
  },
  cellDimmed: {
    opacity: 0.3
  }
});

interface IWithCellResizingProps extends IWithStyles<TWithCellResizingClassKey> {
  // renderResizer: ReactType;
  resizingEnabled: boolean;
  onWidthChange: (args: { shift: number }) => void;
  onWidthDraft: (args: { shift: number }) => void;
  onWidthDraftCancel: () => void;
}

interface IInjectedCellResizingProps {
  className?: string;
  children?: ReactChild | ReactChild[];
}

function withCellResizing<P extends ITableCellProps>(WrappedTableCellComponent: ComponentType<P>) {
  // @withStyles(styles)
  class WithCellResizing extends PureComponent<Subtract<P, IInjectedCellResizingProps> & IWithCellResizingProps, any> {
    public render(): JSX.Element {
      const { classes, resizingEnabled, onWidthChange, onWidthDraft, onWidthDraftCancel, ...cellProps } = this
        .props as IWithCellResizingProps;
      const { column } = cellProps as ITableCellProps;
      const { className, children, ...otherCellProps } = cellProps as IInjectedCellResizingProps;

      const tableCellClasses = classNames(
        {
          [classes!.cell]: true,
          [classes!.cellDimmed]: column && column.previewed // TODO previewed
        },
        className
      );

      return (
        <WrappedTableCellComponent className={tableCellClasses} {...otherCellProps as any}>
          {children}
          {resizingEnabled && (
            <Resizer
              onWidthChange={onWidthChange}
              onWidthDraft={onWidthDraft}
              onWidthDraftCancel={onWidthDraftCancel}
              resizeHandleOpacityClass={classes!.resizeHandleLine}
            />
          )}
        </WrappedTableCellComponent>
      );
    }
  }

  // FIXME compose types
  const enhanced = compose(
    setDisplayName(wrapDisplayName(WrappedTableCellComponent, 'withCellResizing')),
    withStyles(styles)
  )(WithCellResizing as any);

  return enhanced; // hoistStatics(enhanced as any)(WrappedTableCellComponent);
}

export { withCellResizing, IWithCellResizingProps, IInjectedCellResizingProps };
