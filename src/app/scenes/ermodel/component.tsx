import React from 'react';
import Button from '@material-ui/core/Button';
import { ERModel } from 'gdmn-orm';
import CSSModules from 'react-css-modules';

export interface ERModelBoxProps extends CSSModules.InjectedCSSModuleProps {
  readonly erModel: ERModel;
  readonly err: string;
  readonly onLoad: () => any;
}

export class ERModelBox extends React.Component<ERModelBoxProps, {}> {
  public render() {
    const { erModel, err, onLoad } = this.props;

    return (
      <div>
        <div>{err}</div>
        <div>{`загружено сущностей: ${Object.entries(erModel.entities).length}`}</div>
        <Button onClick={onLoad}>Загрузить</Button>
      </div>
    );
  }
}
