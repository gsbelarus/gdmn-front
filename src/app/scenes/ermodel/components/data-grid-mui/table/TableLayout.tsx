import React, { ReactType } from 'react';
import classNames from 'classnames';
import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { WithStyles } from '@material-ui/core/styles';

import {
  TableLayout as CoreTableLayout,
  ITableLayoutProps as ICoreTableLayoutProps
} from '@src/app/scenes/ermodel/components/data-grid-core';

type TTableLayoutClassKey = 'container' | 'headCell' | 'footCell';
const styles: StyleRulesCallback<TTableLayoutClassKey> = theme => ({
  container: {
    overflowX: 'auto'
    // WebkitOverflowScrolling: 'touch'
  },
  headCell: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    overflow: 'visible',
    background: theme.palette.background.paper,
    fallbacks: {
      position: '-webkit-sticky'
    }
  },
  footCell: {
    position: 'sticky',
    bottom: 0,
    zIndex: 1,
    overflow: 'visible',
    background: theme.palette.background.paper,
    fallbacks: {
      position: '-webkit-sticky'
    }
  }
});

type TBaseTableLayoutProps = ICoreTableLayoutProps;
interface ITableLayoutProps extends TBaseTableLayoutProps {
  renderContainer: ReactType; // FIXME ReactType; // TODO -> core
  maxTableHeight?: string;
  headSticky?: boolean;
  footSticky?: boolean;
}

class _TableLayout extends React.Component<ITableLayoutProps & WithStyles<TTableLayoutClassKey>, any> {
  public static defaultProps = {
    headSticky: true,
    footSticky: true,
    renderContainer: 'div',
    minColumnWidthPx: 120, // CoreTableLayout
    maxTableHeight: '60vh' // todo
  };

  public render(): JSX.Element {
    const {
      headSticky,
      footSticky,
      maxTableHeight,
      renderContainer: Container,
      classes,
      ...coreTableLayoutProps
    } = this.props;

    return (
      <Container className={classes.container} style={{ maxHeight: maxTableHeight }}>
        <CoreTableLayout
          className={classNames({
            [classes.headCell]: headSticky,
            [classes.footCell]: footSticky
          })}
          {...coreTableLayoutProps}
        />
      </Container>
    );
  }
}

// TODO maxTableHeight -> table, minWidth

const TableLayout = _TableLayout;
//const TableLayout = withStyles(styles, { name: 'TableLayout' })<ITableLayoutProps>(_TableLayout);

export { TableLayout, ITableLayoutProps };
