import React, { ReactType } from 'react';
import classNames from 'classnames';
import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { WithStyles } from '@material-ui/core/styles';

import { TableLayout as CoreTableLayout, TableLayoutProps as CoreTableLayoutProps } from '../../data-grid-core';

type TableLayoutClassKey = 'container' | 'headCell' | 'footCell';
const styles: StyleRulesCallback<TableLayoutClassKey> = (theme: Theme) => ({
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

type BaseTableLayoutProps = CoreTableLayoutProps & WithStyles<TableLayoutClassKey>;
interface TableLayoutProps extends BaseTableLayoutProps {
  renderContainer: ReactType; // TODO -> core
  maxTableHeight?: string;
  headSticky?: boolean;
  footSticky?: boolean;
}

class _TableLayout extends React.Component<TableLayoutProps, any> {
  public static defaultProps = {
    headSticky: true,
    footSticky: true,
    renderContainer: 'div',
    minColumnWidthPx: 120, // CoreTableLayout
    maxTableHeight: '80vh' // todo
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

const TableLayout = withStyles(styles, { name: 'TableLayout' })(_TableLayout);

export { TableLayout, TableLayoutProps };
