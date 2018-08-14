import React, { Component, ReactChild, Fragment } from 'react';
import { Toolbar, Typography } from '@material-ui/core';
import CSSModules from 'react-css-modules';

import styles from './DataGridToolbar.css';

interface IDataGridToolbarProps {
  numRowsSelected?: number;
  title: string;
  children?: ReactChild | ReactChild[]; // todo
}

@CSSModules(styles)
class DataGridToolbar extends Component<IDataGridToolbarProps> {
  public render() {
    const { numRowsSelected, title, children } = this.props;

    const toolbarClasses = {
      root: 'toolbar-root',
      ...(numRowsSelected! > 0 ? { highlight: 'toolbar-highlight' } : {})
    };

    return (
      <Toolbar classes={toolbarClasses}>
        {!!numRowsSelected && numRowsSelected > 0 ? (
          <Fragment>
            <div styleName="toolbar-title">
              <Typography variant="subheading">Выбрано : {numRowsSelected}</Typography>
            </div>
            <div styleName="toolbar-actions">{children}</div>
          </Fragment>
        ) : (
          <Fragment>
            <div styleName="toolbar-title">
              <Typography variant="title">{title}</Typography>
            </div>
            <div styleName="toolbar-actions">{children}</div>
          </Fragment>
        )}
      </Toolbar>
    );
  }
}

export { DataGridToolbar, IDataGridToolbarProps };
